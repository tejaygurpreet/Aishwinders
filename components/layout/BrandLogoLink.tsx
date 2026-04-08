"use client";

import Image from "next/image";
import Link from "next/link";
import { LOGO_MARK_IMAGE } from "@/lib/assets";

const MARK_W = 488;
const MARK_H = 511;

type Variant = "header" | "mobile" | "footer" | "admin";

const styles: Record<
  Variant,
  { wrap: string; img: string; text: string; sizes: string; priority?: boolean }
> = {
  header: {
    wrap: "header-brand-logo flex items-center gap-3 lg:gap-[0.85rem]",
    img: "block h-11 w-11 shrink-0 object-contain lg:h-[52px] lg:w-[52px]",
    text: "font-display text-xl tracking-[0.08em] text-[#4A7043] sm:text-[1.35rem]",
    sizes: "52px",
    priority: true,
  },
  mobile: {
    wrap: "header-brand-logo mb-8 flex items-center gap-3",
    img: "block h-11 w-11 shrink-0 object-contain",
    text: "font-display text-lg tracking-[0.08em] text-[#4A7043]",
    sizes: "44px",
  },
  footer: {
    wrap: "footer-brand-logo flex items-center gap-3 sm:gap-[0.8rem]",
    img: "block h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10",
    text: "font-display text-[1.45rem] tracking-[0.12em] text-[#4a7043]",
    sizes: "40px",
  },
  admin: {
    wrap: "header-brand-logo flex items-center gap-2.5 sm:gap-3",
    img: "block h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9",
    text: "font-display text-sm tracking-[0.08em] text-[#4A7043] sm:text-base",
    sizes: "36px",
  },
};

export function BrandLogoLink({
  variant,
  onNavigate,
}: {
  variant: Variant;
  onNavigate?: () => void;
}) {
  const s = styles[variant];
  return (
    <Link
      href="/"
      className={s.wrap}
      aria-label="Rooherb home"
      onClick={onNavigate}
    >
      <Image
        src={LOGO_MARK_IMAGE}
        alt=""
        width={MARK_W}
        height={MARK_H}
        placeholder="empty"
        priority={s.priority ?? false}
        sizes={s.sizes}
        className={`header-brand-logo__img ${s.img}`}
        style={{ backgroundColor: "transparent" }}
      />
      <span className={`${s.text} leading-none`}>Rooherb</span>
    </Link>
  );
}
