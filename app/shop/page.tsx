"use client";

import { Leaf, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { SHOP_PRODUCT_IMAGE } from "@/lib/assets";

const PRODUCT_ID = "rooherb-stevia-100g";
const PRODUCT_NAME = "Rooherb STEVIA SUN DRIED LEAVES (100g)";
const PRICE_INR = 100;

export default function ShopPage() {
  const addToCart = useCartStore((s) => s.addToCart);
  const [qty, setQty] = useState(1);

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => q + 1);

  return (
    <main className="flex flex-1 flex-col bg-[#f7f4ee]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#4A7043]">
          Shop
        </p>
        <h1 className="font-display mt-4 max-w-2xl text-[clamp(2rem,4vw,2.9rem)] font-medium leading-[1.12] tracking-[-0.028em] text-[#1c2419]">
          Our leaf. Your ritual.
        </h1>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-start">
          <div className="relative mx-auto w-full max-w-lg lg:mx-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[#faf8f4] shadow-[0_2px_4px_rgba(28,36,25,0.04),0_12px_32px_rgba(28,36,25,0.08),0_24px_56px_rgba(28,36,25,0.06)] ring-1 ring-[#e8e0d4]/90">
              <div className="absolute inset-6 sm:inset-8 md:inset-10">
                <div className="relative h-full w-full">
                  <Image
                    src={SHOP_PRODUCT_IMAGE}
                    alt={PRODUCT_NAME}
                    fill
                    className="object-contain object-center"
                    sizes="(min-width: 1024px) 480px, 92vw"
                    priority
                    quality={95}
                  />
                </div>
              </div>
            </div>
            <p className="mt-7 flex items-center gap-2 text-[0.88rem] text-[#3d463a]/78">
              <Leaf className="h-4 w-4 shrink-0 text-[#4A7043]" strokeWidth={1.5} />
              Whole leaves, sun-dried and sealed for freshness.
            </p>
          </div>

          <div className="flex flex-col">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#5c6658]">
              Single origin
            </p>
            <h2 className="font-display mt-3 text-2xl leading-snug tracking-[-0.015em] text-[#1c2419] sm:text-[1.65rem]">
              {PRODUCT_NAME}
            </h2>
            <p className="mt-7 text-[1.06rem] leading-[1.82] tracking-[0.01em] text-[#3d463a]/88">
              Sun-dried whole stevia leaves in a generous 100g pack—crafted for
              steeping, infusing, and creating with a sweetness that feels
              effortless and true.
            </p>

            <div className="mt-11 flex flex-wrap items-end gap-4 border-t border-[#ebe4d8] pt-11">
              <div>
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#5c6658]">
                  Price
                </p>
                <p className="font-display mt-2 text-3xl text-[#1c2419]">
                  ₹{PRICE_INR}
                  <span className="ml-2 text-base font-sans font-normal text-[#5c6658]">
                    INR
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-9">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#3d463a]/80">
                Quantity
              </p>
              <div className="mt-3 inline-flex items-center rounded-full border border-[#ebe4d8] bg-white/85 p-1 shadow-sm">
                <button
                  type="button"
                  onClick={dec}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[#2a3328] transition hover:bg-[#f2ede4]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <span className="min-w-[2.5rem] text-center text-[0.95rem] font-medium tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={inc}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[#2a3328] transition hover:bg-[#f2ede4]"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                addToCart({
                  id: PRODUCT_ID,
                  name: PRODUCT_NAME,
                  priceInr: PRICE_INR,
                  quantity: qty,
                  imageSrc: SHOP_PRODUCT_IMAGE,
                })
              }
              className="mt-11 inline-flex min-h-[3.25rem] w-full max-w-sm items-center justify-center rounded-full bg-[#4A7043] text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-white shadow-soft transition hover:bg-[#3a5a35] active:scale-[0.99]"
            >
              Add to Cart
            </button>

            <ul className="mt-11 space-y-4 text-[0.93rem] leading-relaxed text-[#3d463a]/85">
              <li className="flex gap-3">
                <Truck
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#4A7043]"
                  strokeWidth={1.5}
                />
                Complimentary shipping on eligible orders
              </li>
              <li className="flex gap-3">
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#4A7043]"
                  strokeWidth={1.5}
                />
                Whole-leaf purity—no fillers, no shortcuts
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
