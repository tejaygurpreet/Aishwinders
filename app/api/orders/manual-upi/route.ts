import { NextResponse } from "next/server";
import {
  computeOrderTotalPaise,
  enrichItemsForEmail,
  type OrderItemInput,
} from "@/lib/catalog";
import { CHECKOUT_UPI_ID } from "@/lib/constants/upi";
import { sendManualUpiOrderEmail } from "@/lib/email";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import type { OrderItemStored } from "@/lib/types/order";

export const runtime = "nodejs";

type Body = {
  items?: OrderItemInput[];
  customer?: {
    fullName?: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    pinCode?: string;
  };
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const items = body.items;
    const c = body.customer;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or invalid." },
        { status: 400 },
      );
    }

    const fullName = c?.fullName?.trim() ?? "";
    const phoneRaw = c?.phone?.replace(/\D/g, "") ?? "";
    const email = c?.email?.trim() ?? "";
    const address = c?.address?.trim() ?? "";
    const city = c?.city?.trim() ?? "";
    const pinCode = c?.pinCode?.trim() ?? "";

    if (!fullName || !email || !address || !city) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }
    if (phoneRaw.length < 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 },
      );
    }
    if (!/^\d{6}$/.test(pinCode)) {
      return NextResponse.json(
        { error: "Please enter a valid 6-digit PIN code." },
        { status: 400 },
      );
    }

    const amountPaise = computeOrderTotalPaise(items);
    if (amountPaise < 100) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    const enriched = enrichItemsForEmail(items);
    const totalInr = Math.round(amountPaise / 100);
    const phoneDisplay = `+91 ${phoneRaw.slice(-10)}`;

    const lineItemsJson: OrderItemStored[] = items.map((item, idx) => {
      const row = enriched[idx];
      return {
        id: item.id,
        name: row.name,
        quantity: row.quantity,
        line_total_inr: row.lineTotalInr,
      };
    });

    const supabase = getSupabaseAdmin();
    const { data: inserted, error: insertError } = await supabase
      .from("orders")
      .insert({
        customer_name: fullName,
        phone: phoneDisplay,
        email,
        address,
        city,
        pincode: pinCode,
        items: lineItemsJson,
        total_inr: totalInr,
        status: "pending",
        payment_method: "manual_upi",
        upi_id_displayed: CHECKOUT_UPI_ID,
      })
      .select("id")
      .single();

    if (insertError || !inserted?.id) {
      console.error("[manual-upi]", insertError);
      return NextResponse.json(
        { error: insertError?.message ?? "Could not save order." },
        { status: 500 },
      );
    }

    const orderId = inserted.id;

    const emailResult = await sendManualUpiOrderEmail({
      orderId,
      customer: {
        fullName,
        phone: phoneDisplay,
        email,
        address,
        city,
        pinCode,
      },
      items: enriched,
      totalInr,
      upiIdDisplayed: CHECKOUT_UPI_ID,
    });

    return NextResponse.json({
      ok: true,
      orderId,
      emailSent: emailResult.ok,
    });
  } catch (e) {
    console.error("[manual-upi]", e);
    const message =
      e instanceof Error ? e.message : "Could not complete checkout.";
    const status = message.includes("required") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
