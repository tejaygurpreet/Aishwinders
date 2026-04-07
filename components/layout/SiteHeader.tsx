"use client";

import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LOGO_IMAGE } from "@/lib/assets";
import { selectCartItemCount, useCartStore } from "@/store/cartStore";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/discover", label: "Discover" },
  { href: "/our-story", label: "Our Story" },
  { href: "/journal", label: "Journal" },
  { href: "/support", label: "Support" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const itemCount = useCartStore(selectCartItemCount);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 glass-header">
        <div className="mx-auto flex h-[4.25rem] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="header-brand-logo flex h-11 shrink-0 items-center lg:h-[52px]"
            aria-label="Rooherb home"
          >
            <Image
              src={LOGO_IMAGE}
              alt=""
              width={1888}
              height={544}
              priority
              placeholder="empty"
              className="header-brand-logo__img block h-11 w-auto max-w-[min(100%,12rem)] object-contain object-left lg:h-[52px] lg:max-w-[15rem]"
              sizes="(max-width: 1023px) 200px, 240px"
              style={{ backgroundColor: "transparent" }}
            />
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[0.8rem] font-medium uppercase tracking-[0.2em] transition ${
                    active
                      ? "text-[#4A7043]"
                      : "text-[#3d463a]/85 hover:text-[#2a3328]"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#4A7043]/70" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#3d463a]/80 transition hover:bg-white/60 hover:text-[#2a3328]"
              aria-label="Search"
            >
              <Search className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="hidden h-11 w-11 items-center justify-center rounded-full text-[#3d463a]/80 transition hover:bg-white/60 hover:text-[#2a3328] sm:flex"
              aria-label="Account"
            >
              <User className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
            </button>
            <Link
              href="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-[#3d463a]/80 transition hover:bg-white/60 hover:text-[#2a3328]"
              aria-label={`Cart${itemCount ? `, ${itemCount} items` : ""}`}
            >
              <ShoppingBag
                className="h-[1.15rem] w-[1.15rem]"
                strokeWidth={1.5}
              />
              {itemCount > 0 ? (
                <span className="absolute right-1 top-1 flex h-[1.1rem] min-w-[1.1rem] items-center justify-center rounded-full bg-[#4A7043] px-1 text-[0.6rem] font-semibold text-white">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#3d463a] lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? (
                <X className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — CSS transitions only (no Framer; avoids hydration issues) */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-[#1c2419]/35 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
        />
        <nav
          className={`absolute right-0 top-0 flex h-full w-[min(100%,22rem)] flex-col bg-[#faf8f4] px-6 pb-10 pt-20 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile"
        >
          <Link
            href="/"
            className="header-brand-logo mb-8 flex h-11 shrink-0 items-center"
            onClick={() => setOpen(false)}
          >
            <Image
              src={LOGO_IMAGE}
              alt=""
              width={1888}
              height={544}
              placeholder="empty"
              className="header-brand-logo__img block h-11 w-auto max-w-[12rem] object-contain object-left"
              sizes="200px"
              style={{ backgroundColor: "transparent" }}
            />
          </Link>
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-3.5 text-[0.85rem] font-medium uppercase tracking-[0.22em] text-[#2a3328] transition hover:bg-white/80"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex gap-3 border-t border-[#ebe4d8] pt-8">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#ebe4d8] bg-white/70 py-3 text-sm font-medium text-[#3d463a]"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#ebe4d8] bg-white/70 py-3 text-sm font-medium text-[#3d463a]"
            >
              <User className="h-4 w-4" />
              Account
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
