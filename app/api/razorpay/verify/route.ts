import crypto from "crypto";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import {
  computeOrderTotalPaise,
  enrichItemsForEmail,
  type OrderItemInput,
} from "@/lib/catalog";
import { sendOrderConfirmationEmail } from "@/lib/email";

export const runtime = "nodejs";

function getRazorpay() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error("Razorpay keys not configured");
  }
  return new Razorpay({ key_id, key_secret });
}

type CustomerPayload = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pinCode: string;
};

export async function POST(req: Request) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Payment not configured." },
        { status: 500 },
      );
    }

    const body = (await req.json()) as {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
      customer?: CustomerPayload;
      items?: OrderItemInput[];
    };

    const orderId = body.razorpay_order_id;
    const paymentId = body.razorpay_payment_id;
    const signature = body.razorpay_signature;
    const customer = body.customer;
    const items = body.items;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ error: "Missing payment fields." }, { status: 400 });
    }
    if (
      !customer?.fullName ||
      !customer?.phone ||
      !customer?.email ||
      !customer?.address ||
      !customer?.city ||
      !customer?.pinCode
    ) {
      return NextResponse.json({ error: "Missing customer details." }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Missing order items." }, { status: 400 });
    }

    const expectedPaise = computeOrderTotalPaise(items);
    const razorpay = getRazorpay();
    const order = await razorpay.orders.fetch(orderId);
    if (Number(order.amount) !== expectedPaise) {
      return NextResponse.json({ error: "Order amount mismatch." }, { status: 400 });
    }

    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (expectedSig !== signature) {
      return NextResponse.json({ error: "Invalid payment signature." }, { status: 400 });
    }

    const enriched = enrichItemsForEmail(items);
    const totalInr = expectedPaise / 100;

    let emailSent = true;
    try {
      const emailResult = await sendOrderConfirmationEmail({
        orderId,
        paymentId,
        paidAt: new Date(),
        customer: {
          fullName: customer.fullName.trim(),
          phone: customer.phone.trim(),
          email: customer.email.trim(),
          address: customer.address.trim(),
          city: customer.city.trim(),
          pinCode: customer.pinCode.trim(),
        },
        items: enriched,
        totalInr,
      });
      if (!emailResult.ok) {
        emailSent = false;
        console.error("[verify] Order email not sent:", emailResult.error);
      }
    } catch (emailErr) {
      emailSent = false;
      console.error("[verify] Order email failed:", emailErr);
    }

    return NextResponse.json({ ok: true, emailSent });
  } catch (e) {
    console.error("[verify]", e);
    const message = e instanceof Error ? e.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
