import Image from "next/image";
import Link from "next/link";
import { LEAF_DECOR_IMAGE, LOGO_IMAGE } from "@/lib/assets";

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
        placeholder="empty"
        className={`footer-leaf-img object-contain ${rotation} ${opacityClass}`}
        sizes="(max-width: 768px) 80px, 160px"
      />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer-premium relative mt-0 overflow-hidden border-t border-[#e8e2d8]/80">
      {/* All decorative leaves + background — clipped to footer only (no bleed into main) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f4] via-[#faf8f4]/95 to-[#f3eee6]" />
        <FooterLeafDecor
          className="absolute left-[4%] top-[6%] w-[2.85rem] sm:left-[6%] sm:top-[8%] sm:w-[3.35rem]"
          rotation="-rotate-[14deg]"
          opacityClass="opacity-[0.44]"
        />
        <FooterLeafDecor
          className="absolute right-[7%] top-[10%] w-[4.25rem] sm:right-[10%] sm:top-[12%] sm:w-[5.25rem]"
          rotation="rotate-[19deg]"
          opacityClass="opacity-[0.62]"
        />
        <FooterLeafDecor
          className="absolute left-[12%] top-[38%] hidden w-[3rem] sm:block md:top-[40%] md:w-[3.5rem]"
          rotation="rotate-[165deg]"
          opacityClass="opacity-[0.4]"
        />
        <FooterLeafDecor
          className="absolute right-[4%] top-[36%] w-[3.25rem] sm:right-[6%] sm:top-[38%] sm:w-[3.75rem]"
          rotation="-rotate-[150deg]"
          opacityClass="opacity-[0.48]"
        />
        <FooterLeafDecor
          className="absolute bottom-[18%] left-[3%] w-[5rem] sm:bottom-[20%] sm:left-[5%] sm:w-[6rem]"
          rotation="rotate-[168deg]"
          opacityClass="opacity-[0.52]"
        />
        <FooterLeafDecor
          className="absolute bottom-[12%] right-[12%] w-[4.5rem] sm:bottom-[14%] sm:right-[14%] sm:w-[5.25rem]"
          rotation="-rotate-[22deg]"
          opacityClass="opacity-[0.58]"
        />
        <FooterLeafDecor
          className="absolute bottom-[28%] left-[22%] hidden w-[2.75rem] md:block lg:bottom-[30%] lg:left-[26%] lg:w-[3.1rem]"
          rotation="rotate-[11deg]"
          opacityClass="opacity-[0.36]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-8 sm:px-10 sm:py-9 lg:px-14 lg:py-10">
        <div className="grid gap-8 md:grid-cols-3 md:items-start md:gap-9 lg:gap-12">
          {/* Left — brand */}
          <div className="flex flex-col items-start md:max-w-sm">
            <Link
              href="/"
              className="footer-brand-logo flex h-9 shrink-0 items-center sm:h-10"
              aria-label="Rooherb home"
            >
              <Image
                src={LOGO_IMAGE}
                alt=""
                width={1888}
                height={544}
                placeholder="empty"
                className="footer-brand-logo__img block h-9 w-auto max-w-[11rem] object-contain object-left sm:h-10 sm:max-w-[12.5rem]"
                sizes="(max-width: 640px) 180px, 200px"
                style={{ backgroundColor: "transparent" }}
              />
            </Link>
            <p className="mt-5 max-w-[17rem] text-[1.05rem] font-light leading-[1.65] tracking-[0.03em] text-[#222222]">
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

            <div className="mt-7 w-full max-w-[20rem] md:ml-auto">
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

        <div className="mt-8 border-t border-[#e0d8ce]/95 pt-6">
          <p className="text-center text-[0.8rem] font-light tracking-[0.12em] text-[#222222]/65">
            © 2026 Rooherb. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
