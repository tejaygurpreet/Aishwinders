import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { computeOrderTotalPaise, type OrderItemInput } from "@/lib/catalog";

export const runtime = "nodejs";

function getRazorpay() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error("Razorpay keys not configured");
  }
  return new Razorpay({ key_id, key_secret });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { items?: OrderItemInput[] };
    const items = body.items;
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or invalid." },
        { status: 400 },
      );
    }

    const amountPaise = computeOrderTotalPaise(items);
    if (amountPaise < 100) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `rh_${Date.now().toString(36)}`,
      payment_capture: true,
      notes: {
        source: "rooherb-checkout",
        env:
          process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test_") ? "test" : "live",
      },
    });

    /** Must be the same Key ID used above — Razorpay test keys (rzp_test_…) open Test checkout. */
    const keyId = process.env.RAZORPAY_KEY_ID;
    if (!keyId) {
      return NextResponse.json(
        { error: "RAZORPAY_KEY_ID not configured." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      keyMode: keyId.startsWith("rzp_test_") ? ("test" as const) : ("live" as const),
    });
  } catch (e) {
    console.error("[create-order]", e);
    const message = e instanceof Error ? e.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
