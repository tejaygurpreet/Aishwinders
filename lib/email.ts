import { Resend } from "resend";
import { contactMessageHtml, orderConfirmationHtml } from "@/lib/email-templates";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const notifyTo = process.env.ORDER_NOTIFY_EMAIL ?? "support@rooherb.com";

/** Resend "from" header: Rooherb <env> or Rooherb <support@rooherb.com>. */
function resendFrom(): string {
  const addr = process.env.RESEND_FROM_EMAIL?.trim();
  if (addr) return `Rooherb <${addr}>`;
  return "Rooherb <support@rooherb.com>";
}

function resendMailboxForFooter(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || "support@rooherb.com";
}

function formatPaidAt(ist: Date): string {
  return ist.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export async function sendOrderConfirmationEmail(params: {
  orderId: string;
  paymentId: string;
  paidAt?: Date;
  /** Checkout test flow — no real payment */
  simulated?: boolean;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pinCode: string;
  };
  items: { name: string; quantity: number; lineTotalInr: number }[];
  totalInr: number;
}) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — order email skipped");
    return { ok: false as const, error: "Email not configured" };
  }

  const paidAt = params.paidAt ?? new Date();
  const paidAtStr = formatPaidAt(paidAt);

  const html = orderConfirmationHtml({
    orderId: params.orderId,
    paymentId: params.paymentId,
    paidAt: paidAtStr,
    simulated: params.simulated,
    customer: params.customer,
    items: params.items,
    totalInr: params.totalInr,
  });

  const prefix = params.simulated ? "[TEST] " : "";
  const { error } = await resend.emails.send({
    from: resendFrom(),
    to: notifyTo,
    subject: `${prefix}Rooherb — New order — ₹${params.totalInr}`,
    html,
  });

  if (error) {
    console.error("[email] Resend error:", error);
    return { ok: false as const, error: error.message };
  }
  return { ok: true as const };
}

export async function sendManualUpiOrderEmail(params: {
  orderId: string;
  paidAt?: Date;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pinCode: string;
  };
  items: { name: string; quantity: number; lineTotalInr: number }[];
  totalInr: number;
  upiIdDisplayed: string;
}) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — manual UPI order email skipped");
    return { ok: false as const, error: "Email not configured" };
  }

  const paidAt = params.paidAt ?? new Date();
  const paidAtStr = formatPaidAt(paidAt);

  const html = orderConfirmationHtml({
    orderId: params.orderId,
    paymentId: `Manual UPI — customer confirmed (pay to ${params.upiIdDisplayed})`,
    paidAt: paidAtStr,
    manualUpi: true,
    customer: params.customer,
    items: params.items,
    totalInr: params.totalInr,
  });

  const { error } = await resend.emails.send({
    from: resendFrom(),
    to: notifyTo,
    subject: `Rooherb — New order (UPI) — ₹${params.totalInr}`,
    html,
  });

  if (error) {
    console.error("[email] Resend error:", error);
    return { ok: false as const, error: error.message };
  }
  return { ok: true as const };
}

export async function sendContactEmail(params: {
  name: string;
  email: string;
  message: string;
}) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — contact email skipped");
    return { ok: false as const, error: "Email not configured" };
  }

  const html = contactMessageHtml({
    ...params,
    senderMailbox: resendMailboxForFooter(),
  });

  const { error } = await resend.emails.send({
    from: resendFrom(),
    to: notifyTo,
    subject: `Rooherb — Support — ${params.name}`,
    replyTo: params.email,
    html,
  });

  if (error) {
    console.error("[email] Resend error:", error);
    return { ok: false as const, error: error.message };
  }
  return { ok: true as const };
}
