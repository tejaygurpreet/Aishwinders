/** Inline styles for email client compatibility */

import { SHIPPING_INR } from "@/lib/catalog";

const brand = {
  sage: "#4A7043",
  charcoal: "#222222",
  muted: "#5c6658",
  cream: "#faf8f4",
  border: "#e8e2d8",
};

export function orderConfirmationHtml(params: {
  orderId: string;
  paymentId: string;
  paidAt: string;
  simulated?: boolean;
  /** Manual UPI checkout — customer tapped “I have paid via UPI” */
  manualUpi?: boolean;
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
}): string {
  const subtotalInr = params.items.reduce((s, l) => s + l.lineTotalInr, 0);
  const shippingInr = params.items.length > 0 ? SHIPPING_INR : 0;

  const rows = params.items
    .map(
      (l) => `
    <tr>
      <td style="padding:14px 16px;border-bottom:1px solid ${brand.border};font-size:14px;color:${brand.charcoal};">${escapeHtml(l.name)}</td>
      <td style="padding:14px 16px;border-bottom:1px solid ${brand.border};font-size:14px;color:${brand.muted};text-align:center;">${l.quantity}</td>
      <td style="padding:14px 16px;border-bottom:1px solid ${brand.border};font-size:14px;color:${brand.charcoal};text-align:right;white-space:nowrap;">₹${l.lineTotalInr}</td>
    </tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background-color:#f7f4ee;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7f4ee;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(28,36,25,0.08);border:1px solid ${brand.border};">
          <tr>
            <td style="padding:28px 32px 20px;background:linear-gradient(180deg,${brand.cream} 0%,#ffffff 100%);border-bottom:1px solid ${brand.border};">
              <p style="margin:0;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:${brand.sage};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-weight:600;">Rooherb</p>
              ${
                params.simulated
                  ? `<p style="margin:10px 0 0;padding:10px 14px;border-radius:10px;background:#fff8e6;border:1px solid #e8d9a8;font-size:12px;color:#5c4a1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;"><strong>Test checkout</strong> — No payment was processed. Order details below are for testing.</p>`
                  : ""
              }
              ${
                params.manualUpi
                  ? `<p style="margin:10px 0 0;padding:10px 14px;border-radius:10px;background:#e8f4ea;border:1px solid #c5dcc4;font-size:12px;color:#1e3d22;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;"><strong>Manual UPI</strong> — The customer stated they completed payment via UPI. Please verify the payment in your account before shipping.</p>`
                  : ""
              }
              <h1 style="margin:12px 0 0;font-size:22px;font-weight:600;color:${brand.charcoal};letter-spacing:-0.02em;">New order received</h1>
              <p style="margin:10px 0 0;font-size:13px;color:${brand.muted};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Recorded on <strong style="color:${brand.charcoal};">${escapeHtml(params.paidAt)}</strong></p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:8px 0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${brand.muted};">Order ID</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:${brand.charcoal};word-break:break-all;">${escapeHtml(params.orderId)}</td>
                </tr>
                <tr><td style="height:16px;"></td></tr>
                <tr>
                  <td style="padding:8px 0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${brand.muted};">${params.manualUpi ? "Payment" : "Payment ID"}</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:${brand.charcoal};word-break:break-all;">${escapeHtml(params.paymentId)}</td>
                </tr>
              </table>
              <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${brand.muted};">Ship to</p>
              <p style="margin:0;font-size:15px;line-height:1.65;color:${brand.charcoal};">
                <strong>${escapeHtml(params.customer.fullName)}</strong><br/>
                ${escapeHtml(params.customer.phone)}<br/>
                <a href="mailto:${escapeHtml(params.customer.email)}" style="color:${brand.sage};text-decoration:none;">${escapeHtml(params.customer.email)}</a><br/>
                ${escapeHtml(params.customer.address)}<br/>
                ${escapeHtml(params.customer.city)} — ${escapeHtml(params.customer.pinCode)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
              <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${brand.muted};">Order items</p>
              <table role="presentation" width="100%" cellspacing="0" style="border:1px solid ${brand.border};border-radius:12px;overflow:hidden;background:${brand.cream};">
                <thead>
                  <tr style="background:${brand.cream};">
                    <th align="left" style="padding:12px 16px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${brand.muted};">Product</th>
                    <th style="padding:12px 16px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${brand.muted};">Qty</th>
                    <th align="right" style="padding:12px 16px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${brand.muted};">Amount</th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>
              <table role="presentation" width="100%" style="margin-top:20px;">
                <tr>
                  <td style="font-size:14px;color:${brand.muted};">Subtotal</td>
                  <td align="right" style="font-size:14px;color:${brand.charcoal};">₹${subtotalInr}</td>
                </tr>
                <tr><td colspan="2" style="height:8px;"></td></tr>
                <tr>
                  <td style="font-size:14px;color:${brand.muted};">Shipping</td>
                  <td align="right" style="font-size:14px;color:${brand.charcoal};">₹${shippingInr}</td>
                </tr>
                <tr><td colspan="2" style="height:12px;"></td></tr>
                <tr>
                  <td style="font-size:18px;font-weight:600;color:${brand.charcoal};font-family:Georgia,serif;">Total</td>
                  <td align="right" style="font-size:20px;font-weight:600;color:${brand.sage};font-family:Georgia,serif;">₹${params.totalInr}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid ${brand.border};background:${brand.cream};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:12px;color:${brand.muted};line-height:1.55;">
              ${
                params.manualUpi
                  ? `Sent when a customer confirmed a manual UPI payment on <a href="https://rooherb.com" style="color:${brand.sage};text-decoration:none;">rooherb.com</a>.`
                  : `Sent automatically when a customer completed checkout on <a href="https://rooherb.com" style="color:${brand.sage};text-decoration:none;">rooherb.com</a>.`
              }
              <br/><br/>
              <span style="color:#8a9286;">This address is not monitored. For customer support, use the email and phone shown above.</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function contactMessageHtml(params: {
  name: string;
  email: string;
  message: string;
  /** Same mailbox as RESEND_FROM_EMAIL (for footer line). */
  senderMailbox?: string;
}): string {
  const mailbox = params.senderMailbox ?? "support@rooherb.com";
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background-color:#f7f4ee;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7f4ee;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(28,36,25,0.08);border:1px solid ${brand.border};">
          <tr>
            <td style="padding:28px 32px 22px;background:linear-gradient(180deg,${brand.cream} 0%,#ffffff 100%);border-bottom:1px solid ${brand.border};">
              <p style="margin:0;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:${brand.sage};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-weight:600;">Rooherb</p>
              <h1 style="margin:12px 0 0;font-size:22px;font-weight:600;color:${brand.charcoal};letter-spacing:-0.02em;">Support inquiry</h1>
              <p style="margin:8px 0 0;font-size:13px;color:${brand.muted};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">From the contact form on <a href="https://rooherb.com/support" style="color:${brand.sage};text-decoration:none;">rooherb.com</a></p>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${brand.muted};">Contact</p>
              <p style="margin:0;font-size:16px;line-height:1.5;color:${brand.charcoal};">
                <strong>${escapeHtml(params.name)}</strong><br/>
                <a href="mailto:${escapeHtml(params.email)}" style="color:${brand.sage};text-decoration:none;">${escapeHtml(params.email)}</a>
              </p>
              <p style="margin:22px 0 10px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${brand.muted};">Message</p>
              <div style="padding:16px 18px;border-radius:12px;border:1px solid ${brand.border};background:${brand.cream};font-size:15px;line-height:1.65;color:${brand.charcoal};white-space:pre-wrap;">${escapeHtml(params.message)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid ${brand.border};background:${brand.cream};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:12px;color:${brand.muted};line-height:1.55;">
              Reply to this email to respond directly to the customer — their address is set as the reply-to.
              <br/><br/>
              <span style="color:#8a9286;">Sent from Rooherb &lt;${escapeHtml(mailbox)}&gt;. This sending address is not monitored — reply to reach the customer.</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
