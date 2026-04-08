import Link from "next/link";
import { SUPPORT_EMAIL } from "@/lib/site";
import { BrandLogoLink } from "@/components/layout/BrandLogoLink";

const footerNav = [
  { href: "/shop", label: "Shop" },
  { href: "/blogs", label: "Blogs" },
  { href: "/our-story", label: "Our Story" },
  { href: "/support", label: "Support" },
] as const;

export function SiteFooter() {
  return (
    <footer className="footer-premium relative mt-0 overflow-hidden border-t border-[#e8e2d8]/80">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#faf8f4] via-[#faf8f4]/95 to-[#f3eee6]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-8 sm:px-10 sm:py-9 lg:px-14 lg:py-10">
        <div className="grid gap-8 md:grid-cols-3 md:items-start md:gap-9 lg:gap-12">
          <div className="flex flex-col items-start md:max-w-sm">
            <BrandLogoLink variant="footer" />
            <p className="mt-5 max-w-[17rem] text-[1.05rem] font-light leading-[1.65] tracking-[0.03em] text-[#222222]">
              Naturally Sweet. Pure Simplicity.
            </p>
          </div>

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

          <div className="flex flex-col md:items-end md:pt-0.5 md:text-right">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#222222]/55">
                Contact
              </p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="mt-3 inline-block text-[1.02rem] font-light tracking-[0.03em] text-[#222222] transition hover:text-[#4a7043]"
              >
                {SUPPORT_EMAIL}
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
