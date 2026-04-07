"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  selectSubtotalInr,
  useCartStore,
} from "@/store/cartStore";

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const setLineQuantity = useCartStore((s) => s.setLineQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const subtotalInr = useCartStore(selectSubtotalInr);

  const shippingInr = 0;
  const grandTotal = subtotalInr + shippingInr;

  return (
    <main className="flex flex-1 flex-col bg-[#f7f4ee]">
      <div className="mx-auto w-full max-w-[1100px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#4A7043]">
          Cart
        </p>
        <h1 className="font-display mt-3 text-[clamp(1.75rem,3.5vw,2.35rem)] font-medium tracking-[-0.02em] text-[#222222]">
          Your selection
        </h1>

        {lines.length === 0 ? (
          <div className="mt-16 flex flex-col items-center rounded-[1.75rem] border border-[#ebe4d8] bg-[#faf8f4]/90 px-8 py-20 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4A7043]/10">
              <ShoppingBag
                className="h-7 w-7 text-[#4A7043]"
                strokeWidth={1.5}
              />
            </div>
            <p className="mt-8 max-w-sm text-[1.05rem] leading-relaxed text-[#3d463a]/88">
              Your cart is empty. Add our sun-dried stevia leaves to begin your
              ritual.
            </p>
            <Link
              href="/shop"
              className="mt-10 inline-flex min-h-[3rem] min-w-[12rem] items-center justify-center rounded-full bg-[#4A7043] px-10 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white shadow-soft transition hover:bg-[#3a5a35]"
            >
              Browse shop
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_min(22rem,100%)] lg:gap-16">
            <ul className="flex flex-col gap-6">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex gap-5 rounded-2xl border border-[#ebe4d8] bg-white/70 p-4 shadow-sm sm:gap-7 sm:p-6"
                >
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#faf8f4] sm:h-32 sm:w-32">
                    {line.imageSrc ? (
                      <Image
                        src={line.imageSrc}
                        alt=""
                        fill
                        className="object-contain p-2"
                        sizes="128px"
                      />
                    ) : null}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                    <div>
                      <h2 className="font-display text-lg leading-snug text-[#222222] sm:text-xl">
                        {line.name}
                      </h2>
                      <p className="mt-2 text-[0.95rem] tabular-nums text-[#3d463a]/85">
                        ₹{line.priceInr}{" "}
                        <span className="text-[0.8rem]">each</span>
                      </p>
                    </div>
                    <p className="font-display text-lg tabular-nums text-[#222222] sm:hidden">
                      ₹{line.priceInr * line.quantity}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="inline-flex items-center rounded-full border border-[#ebe4d8] bg-[#f7f4ee] p-1">
                        <button
                          type="button"
                          onClick={() =>
                            setLineQuantity(line.id, line.quantity - 1)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full text-[#2a3328] transition hover:bg-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-medium tabular-nums text-[#222222]">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setLineQuantity(line.id, line.quantity + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full text-[#2a3328] transition hover:bg-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-[#5c6658] transition hover:text-[#8b3a3a]"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#5c6658]">
                      Line total
                    </p>
                    <p className="mt-1 font-display text-xl tabular-nums text-[#222222]">
                      ₹{line.priceInr * line.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-2xl border border-[#ebe4d8] bg-[#faf8f4] p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#5c6658]">
                Order summary
              </h2>
              <dl className="mt-6 space-y-4 text-[0.95rem] text-[#222222]">
                <div className="flex justify-between gap-4">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">₹{subtotalInr}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Shipping</dt>
                  <dd className="text-[#4A7043]">Free</dd>
                </div>
                <div className="border-t border-[#e0d8ce] pt-4">
                  <div className="flex justify-between gap-4 font-display text-xl text-[#222222]">
                    <dt>Total</dt>
                    <dd className="tabular-nums">₹{grandTotal}</dd>
                  </div>
                </div>
              </dl>
              <Link
                href="/checkout"
                className="mt-8 flex w-full min-h-[3.15rem] items-center justify-center rounded-full bg-[#4A7043] text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white shadow-soft transition hover:bg-[#3a5a35]"
              >
                Proceed to checkout
              </Link>
              <Link
                href="/shop"
                className="mt-4 block text-center text-[0.78rem] font-medium uppercase tracking-[0.16em] text-[#4A7043] transition hover:underline"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
