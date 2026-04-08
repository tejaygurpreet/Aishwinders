"use client";

import { Leaf, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  CATALOG,
  SHIPPING_INR,
  SHOP_PRODUCT_IDS,
  type CatalogEntry,
} from "@/lib/catalog";
import { useCartStore } from "@/store/cartStore";

function ProductCard({
  productId,
  entry,
  imagePriority,
}: {
  productId: string;
  entry: CatalogEntry;
  imagePriority?: boolean;
}) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [qty, setQty] = useState(1);
  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => q + 1);

  const imageBlock = (
    <div className="relative h-full w-full">
      <Image
        src={entry.imageSrc}
        alt={entry.name}
        fill
        priority={imagePriority}
        className="object-contain object-center"
        sizes="(min-width: 1024px) 480px, 92vw"
        quality={95}
      />
    </div>
  );

  return (
    <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-start">
      <div className="relative mx-auto w-full max-w-lg lg:mx-0">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[#faf8f4] shadow-[0_2px_4px_rgba(28,36,25,0.04),0_12px_32px_rgba(28,36,25,0.08),0_24px_56px_rgba(28,36,25,0.06)] ring-1 ring-[#e8e0d4]/90">
          <div
            className={
              entry.imageEdgeToEdge
                ? "absolute inset-0"
                : "absolute inset-6 sm:inset-8"
            }
          >
            {imageBlock}
          </div>
        </div>
        <p className="mt-7 flex items-center gap-2 text-[0.88rem] text-[#3d463a]/78">
          <Leaf className="h-4 w-4 shrink-0 text-[#4A7043]" strokeWidth={1.5} />
          {productId === "rooherb-stevia-leaves-80g"
            ? "Whole leaves, sun-dried and sealed for freshness."
            : "Liquid stevia extract in a convenient dropper bottle."}
        </p>
      </div>

      <div className="flex flex-col">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#5c6658]">
          {productId === "rooherb-stevia-leaves-80g"
            ? "Single origin"
            : "Liquid extract"}
        </p>
        <h2 className="font-display mt-3 text-2xl leading-snug tracking-[-0.015em] text-[#1c2419] sm:text-[1.65rem]">
          {entry.name}
        </h2>
        <p className="mt-2 text-[0.85rem] font-medium tracking-[0.06em] text-[#5c6658]">
          Net: {entry.weightLabel}
        </p>

        {entry.longDescription ? (
          <div className="mt-7 space-y-5 text-[1.02rem] leading-[1.82] tracking-[0.01em] text-[#3d463a]/90 whitespace-pre-line">
            {entry.longDescription}
          </div>
        ) : (
          <p className="mt-7 text-[1.06rem] leading-[1.82] tracking-[0.01em] text-[#3d463a]/88">
            {entry.shortDescription}
          </p>
        )}

        <div className="mt-11 flex flex-wrap items-end gap-4 border-t border-[#ebe4d8] pt-11">
          <div>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#5c6658]">
              MRP
            </p>
            <p className="font-display mt-2 text-3xl text-[#1c2419]">
              ₹{entry.priceInr}
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
              id: productId,
              name: entry.name,
              priceInr: entry.priceInr,
              quantity: qty,
              imageSrc: entry.imageSrc,
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
            Shipping: ₹{SHIPPING_INR} per order (added at checkout)
          </li>
          <li className="flex gap-3">
            <ShieldCheck
              className="mt-0.5 h-4 w-4 shrink-0 text-[#4A7043]"
              strokeWidth={1.5}
            />
            {productId === "rooherb-stevia-leaves-80g"
              ? "Whole-leaf purity—no fillers, no shortcuts"
              : "100% natural stevia extract — no artificial sweeteners"}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <main className="flex flex-1 flex-col bg-[#f7f4ee]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#4A7043]">
          Shop
        </p>
        <h1 className="font-display mt-4 max-w-2xl text-[clamp(2rem,4vw,2.9rem)] font-medium leading-[1.12] tracking-[-0.028em] text-[#1c2419]">
          Our leaf. Your ritual.
        </h1>

        <div className="mt-20 flex flex-col gap-28">
          {SHOP_PRODUCT_IDS.map((id, i) => {
            const entry = CATALOG[id];
            return (
              <ProductCard
                key={id}
                productId={id}
                entry={entry}
                imagePriority={i === 0}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
