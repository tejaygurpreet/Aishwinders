import { Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LEAF_DECOR_IMAGE } from "@/lib/assets";

const footerNav = [
  { href: "/shop", label: "Shop" },
  { href: "/discover", label: "Discover" },
  { href: "/our-story", label: "Our Story" },
  { href: "/journal", label: "Journal" },
  { href: "/support", label: "Support" },
] as const;

function FooterLeafDecor({
  className,
  rotation,
  opacityClass,
}: {
  className?: string;
  rotation: string;
  opacityClass: string;
}) {
  return (
    <div
      className={`footer-leaf-wrap pointer-events-none relative aspect-square select-none overflow-hidden ${className ?? ""}`}
      aria-hidden
    >
      <Image
        src={LEAF_DECOR_IMAGE}
        alt=""
        fill
        className={`footer-leaf-img object-contain ${rotation} ${opacityClass}`}
        sizes="(max-width: 768px) 80px, 160px"
      />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer-premium border-t border-[#e8e2d8]/90">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#faf8f4]/72 via-[#faf8f4]/48 to-[#f6f1ea]/65"
        aria-hidden
      />

      {/* Decorative leaves — positioned in lower/mid footer only (avoids seam with main content) */}
      <FooterLeafDecor
        className="absolute bottom-7 left-[3%] z-0 w-[3.25rem] sm:bottom-8 sm:left-[5%] sm:w-[3.75rem]"
        rotation="-rotate-[17deg]"
        opacityClass="opacity-[0.5]"
      />
      <FooterLeafDecor
        className="absolute bottom-10 right-[6%] z-0 w-[5rem] sm:bottom-11 sm:right-[9%] sm:w-[6rem] lg:w-[6.75rem]"
        rotation="rotate-[22deg]"
        opacityClass="opacity-[0.72]"
      />
      <FooterLeafDecor
        className="absolute bottom-14 left-[10%] z-0 w-[5.5rem] sm:bottom-16 sm:left-[12%] sm:w-[6.25rem]"
        rotation="rotate-[168deg]"
        opacityClass="opacity-[0.55]"
      />
      <FooterLeafDecor
        className="absolute bottom-8 right-[14%] z-0 w-[4.25rem] sm:bottom-9 sm:right-[16%] sm:w-[5rem]"
        rotation="-rotate-[158deg]"
        opacityClass="opacity-[0.48]"
      />
      <FooterLeafDecor
        className="absolute bottom-[26%] right-[3%] z-0 hidden w-[3.75rem] md:block lg:bottom-[28%] lg:right-[5%] lg:w-[4.5rem]"
        rotation="rotate-[11deg]"
        opacityClass="opacity-[0.45]"
      />
      <FooterLeafDecor
        className="absolute bottom-[22%] left-[18%] z-0 hidden w-[2.85rem] md:block lg:bottom-[24%] lg:left-[22%] lg:w-[3.25rem]"
        rotation="rotate-[192deg]"
        opacityClass="opacity-[0.38]"
      />
      <FooterLeafDecor
        className="absolute bottom-[34%] left-[6%] z-0 w-[2.75rem] sm:bottom-[36%] sm:left-[8%] sm:w-[3.25rem]"
        rotation="-rotate-[24deg]"
        opacityClass="opacity-[0.42]"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-11 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div className="grid gap-11 md:grid-cols-3 md:items-start md:gap-10 lg:gap-16">
          {/* Left — brand */}
          <div className="flex flex-col items-start md:max-w-sm">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 transition-opacity hover:opacity-90"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4a7043]/10 ring-1 ring-[#4a7043]/18 transition group-hover:bg-[#4a7043]/14">
                <Leaf
                  className="h-[1.3rem] w-[1.3rem] text-[#4a7043]"
                  strokeWidth={1.6}
                />
              </span>
              <span className="font-display text-[1.45rem] tracking-[0.2em] text-[#4a7043]">
                Rooherb
              </span>
            </Link>
            <p className="mt-6 max-w-[17rem] text-[1.05rem] font-light leading-[1.65] tracking-[0.03em] text-[#222222]">
              Naturally Sweet. Pure Simplicity.
            </p>
          </div>

          {/* Center — navigation */}
          <nav
            className="flex flex-col md:items-center md:pt-0.5"
            aria-label="Footer"
          >
            <ul className="flex flex-col gap-3.5 md:gap-4">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.88rem] font-medium uppercase tracking-[0.26em] text-[#4a7043] transition hover:text-[#3a5a35]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right — contact + newsletter */}
          <div className="flex flex-col md:items-end md:pt-0.5 md:text-right">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#222222]/55">
                Contact
              </p>
              <a
                href="mailto:hello@rooherb.com"
                className="mt-3 inline-block text-[1.02rem] font-light tracking-[0.03em] text-[#222222] transition hover:text-[#4a7043]"
              >
                hello@rooherb.com
              </a>
            </div>

            <div className="mt-9 w-full max-w-[20rem] md:ml-auto">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#222222]/55">
                Newsletter
              </p>
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-stretch md:flex-col md:items-stretch lg:flex-row">
                <label htmlFor="footer-email" className="sr-only">
                  Email for newsletter
                </label>
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  autoComplete="email"
                  className="min-h-10 flex-1 border border-[#dcd4c8] bg-white/55 px-3.5 py-2 text-[0.93rem] font-light tracking-[0.02em] text-[#222222] placeholder:text-[#222222]/35 outline-none transition focus:border-[#4a7043]/45 focus:ring-1 focus:ring-[#4a7043]/25"
                />
                <button
                  type="button"
                  className="min-h-10 shrink-0 border border-[#4a7043]/35 bg-[#4a7043]/10 px-5 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[#4a7043] transition hover:bg-[#4a7043]/16"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#e0d8ce]/95 pt-8">
          <p className="text-center text-[0.8rem] font-light tracking-[0.12em] text-[#222222]/65">
            © 2026 Rooherb. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
