"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CHECKOUT_UPI_ID } from "@/lib/constants/upi";
import { SUPPORT_EMAIL } from "@/lib/site";
import type { OrderItemInput } from "@/lib/catalog";
import {
  selectGrandTotalInr,
  selectShippingInr,
  selectSubtotalInr,
  useCartStore,
} from "@/store/cartStore";

export default function CheckoutPage() {
  const lines = useCartStore((s) => s.lines);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotalInr = useCartStore(selectSubtotalInr);
  const shippingInr = useCartStore(selectShippingInr);
  const grandTotal = useCartStore(selectGrandTotalInr);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);

  const itemsPayload: OrderItemInput[] = useMemo(
    () => lines.map((l) => ({ id: l.id, quantity: l.quantity })),
    [lines],
  );

  async function handleUpiPaymentConfirmed() {
    setError(null);
    if (lines.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!fullName.trim() || !email.trim() || !address.trim() || !city.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!/^\d{6}$/.test(pinCode.trim())) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

    const customer = {
      fullName: fullName.trim(),
      phone: `+91 ${digits.slice(-10)}`,
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      pinCode: pinCode.trim(),
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders/manual-upi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsPayload, customer }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        orderId?: string;
        emailSent?: boolean;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error ?? "Could not place order.");
      }
      if (data.emailSent === false) {
        setEmailWarning(true);
      }
      clearCart();
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (lines.length === 0 && !done) {
    return (
      <main className="flex flex-1 flex-col bg-[#f7f4ee]">
        <div className="mx-auto max-w-lg px-5 py-24 text-center">
          <p className="text-[0.95rem] text-[#3d463a]/88">
            Your cart is empty. Add items before checkout.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[#4A7043] hover:underline"
          >
            Go to shop
          </Link>
        </div>
      </main>
    );
  }

  if (done) {
    return (
      <main className="flex flex-1 flex-col bg-[#f7f4ee]">
        <div className="mx-auto max-w-lg px-5 py-24 text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#4A7043]">
            Order confirmed
          </p>
          <h1 className="font-display mt-4 text-3xl text-[#222222]">
            Thank you — we received your order
          </h1>
          <p className="mt-4 text-[1rem] leading-relaxed text-[#3d463a]/88">
            Your order is saved
            {emailWarning
              ? "."
              : ` and we’ve emailed full details to our team at ${SUPPORT_EMAIL}. We’ll verify your UPI payment and arrange shipping.`}
          </p>
          {emailWarning ? (
            <p className="mt-4 max-w-md text-[0.9rem] leading-relaxed text-[#7a5a2e]">
              Your order was recorded. The confirmation email could not be sent—please save your order details or contact support if needed.
            </p>
          ) : null}
          <Link
            href="/shop"
            className="mt-10 inline-flex min-h-[3rem] items-center justify-center rounded-full bg-[#4A7043] px-10 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white shadow-soft hover:bg-[#3a5a35]"
          >
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-[#f7f4ee]">
      <div className="mx-auto w-full max-w-[1100px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#4A7043]">
          Checkout
        </p>
        <h1 className="font-display mt-3 text-[clamp(1.75rem,3.5vw,2.35rem)] font-medium tracking-[-0.02em] text-[#222222]">
          Delivery &amp; pay via UPI
        </h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_min(22rem,100%)] lg:gap-16">
          <div className="rounded-2xl border border-[#ebe4d8] bg-white/75 p-6 shadow-sm sm:p-8">
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#5c6658]">
              Shipping details
            </h2>
            <div className="mt-8 grid gap-6">
              <label className="block">
                <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[#5c6658]">
                  Full name
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-[#dcd4c8] bg-[#faf8f4] px-4 py-3 text-[0.95rem] text-[#222222] outline-none ring-[#4A7043]/0 transition focus:border-[#4A7043]/45 focus:ring-2 focus:ring-[#4A7043]/20"
                  required
                />
              </label>
              <label className="block">
                <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[#5c6658]">
                  Phone (+91)
                </span>
                <div className="mt-2 flex rounded-xl border border-[#dcd4c8] bg-[#faf8f4] focus-within:border-[#4A7043]/45 focus-within:ring-2 focus-within:ring-[#4A7043]/20">
                  <span className="flex shrink-0 items-center border-r border-[#ebe4d8] px-4 text-[0.9rem] text-[#5c6658]">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 10))
                    }
                    autoComplete="tel-national"
                    placeholder="98XXXXXXXX"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[0.95rem] text-[#222222] outline-none"
                    required
                  />
                </div>
              </label>
              <label className="block">
                <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[#5c6658]">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-[#dcd4c8] bg-[#faf8f4] px-4 py-3 text-[0.95rem] text-[#222222] outline-none transition focus:border-[#4A7043]/45 focus:ring-2 focus:ring-[#4A7043]/20"
                  required
                />
              </label>
              <label className="block">
                <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[#5c6658]">
                  Full address
                </span>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  autoComplete="street-address"
                  className="mt-2 w-full resize-y rounded-xl border border-[#dcd4c8] bg-[#faf8f4] px-4 py-3 text-[0.95rem] text-[#222222] outline-none transition focus:border-[#4A7043]/45 focus:ring-2 focus:ring-[#4A7043]/20"
                  required
                />
              </label>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[#5c6658]">
                    City
                  </span>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    autoComplete="address-level2"
                    className="mt-2 w-full rounded-xl border border-[#dcd4c8] bg-[#faf8f4] px-4 py-3 text-[0.95rem] text-[#222222] outline-none transition focus:border-[#4A7043]/45 focus:ring-2 focus:ring-[#4A7043]/20"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[#5c6658]">
                    PIN code
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={pinCode}
                    onChange={(e) =>
                      setPinCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    autoComplete="postal-code"
                    className="mt-2 w-full rounded-xl border border-[#dcd4c8] bg-[#faf8f4] px-4 py-3 text-[0.95rem] text-[#222222] outline-none transition focus:border-[#4A7043]/45 focus:ring-2 focus:ring-[#4A7043]/20"
                    required
                  />
                </label>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border-2 border-[#4A7043]/30 bg-gradient-to-b from-[#f4faf3] to-white p-6 shadow-sm">
              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#2d4a28]">
                Pay via UPI
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-[#3d463a]">
                Open PhonePe, Google Pay, Paytm, or your bank app and send{" "}
                <strong className="text-[#222222]">₹{grandTotal}</strong> to the
                UPI ID below. When the payment succeeds, tap the button at the bottom
                to submit your order.
              </p>
              <div className="mt-5 rounded-xl border border-[#4A7043]/35 bg-white px-4 py-4 shadow-inner">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#5c6658]">
                  UPI ID (copy &amp; pay)
                </p>
                <p className="mt-2 select-all font-mono text-[1.08rem] font-semibold tracking-wide text-[#222222] break-all">
                  {CHECKOUT_UPI_ID}
                </p>
              </div>
              <p className="mt-4 text-[0.8rem] leading-relaxed text-[#5c6658]">
                Add your name in the payment note if the app allows it — it helps us match your payment to this order.
              </p>
            </div>

            {error ? (
              <p className="mt-6 text-[0.9rem] text-[#8b3a3a]" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="button"
              onClick={() => void handleUpiPaymentConfirmed()}
              disabled={submitting}
              className="mt-8 w-full min-h-[3.25rem] rounded-full bg-[#4A7043] text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white shadow-soft transition hover:bg-[#3a5a35] disabled:opacity-60"
            >
              {submitting ? "Saving your order…" : "I have made the UPI payment"}
            </button>
            <p className="mt-4 text-center text-[0.72rem] text-[#5c6658]/90">
              We save your order to our system, email {SUPPORT_EMAIL} with full
              details, then clear your cart.
            </p>
          </div>

          <aside className="h-fit rounded-2xl border border-[#ebe4d8] bg-[#faf8f4] p-6 shadow-sm lg:sticky lg:top-28">
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#5c6658]">
              Order summary
            </h2>
            <ul className="mt-6 space-y-4 border-b border-[#e0d8ce] pb-6">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
                    {line.imageSrc ? (
                      <Image
                        src={line.imageSrc}
                        alt=""
                        fill
                        className="object-contain object-center"
                        sizes="56px"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.88rem] leading-snug text-[#222222]">
                      {line.name}{" "}
                      <span className="text-[#5c6658]">×{line.quantity}</span>
                    </p>
                    <p className="mt-1 text-[0.9rem] tabular-nums text-[#3d463a]">
                      ₹{line.priceInr * line.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-3 text-[0.95rem] text-[#222222]">
              <div className="flex justify-between gap-4">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">₹{subtotalInr}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Shipping</dt>
                <dd className="tabular-nums text-[#222222]">
                  ₹{shippingInr}
                </dd>
              </div>
              <div className="border-t border-[#e0d8ce] pt-4 font-display text-xl">
                <div className="flex justify-between gap-4">
                  <dt>Total</dt>
                  <dd className="tabular-nums">₹{grandTotal}</dd>
                </div>
              </div>
            </dl>
            <Link
              href="/cart"
              className="mt-6 block text-center text-[0.78rem] font-medium uppercase tracking-[0.14em] text-[#4A7043] hover:underline"
            >
              Edit cart
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
