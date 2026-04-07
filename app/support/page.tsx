import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { ContactForm } from "@/components/support/ContactForm";

export const metadata: Metadata = {
  title: "Support",
  description: "Contact Rooherb — we’re here to help.",
};

export default function SupportPage() {
  return (
    <main className="flex flex-1 flex-col bg-[#f7f4ee]">
      <div className="mx-auto w-full max-w-[720px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#4A7043]">
          Support
        </p>
        <h1 className="font-display mt-4 text-[clamp(1.85rem,3.5vw,2.5rem)] font-medium tracking-[-0.02em] text-[#222222]">
          We&apos;re here for you
        </h1>
        <p className="mt-5 max-w-xl text-[1.02rem] leading-[1.75] text-[#3d463a]/88">
          Questions about your order, shipping, or our leaves? Send a message
          and we&apos;ll reply as soon as we can.
        </p>

        <div className="mt-10 rounded-2xl border border-[#ebe4d8] bg-[#faf8f4] px-6 py-6 shadow-sm sm:px-8 sm:py-7">
          <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#5c6658]">
            Call us
          </p>
          <a
            href="tel:+919855634100"
            className="mt-3 flex items-center justify-center gap-3 text-[#222222] transition hover:text-[#4A7043]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4A7043]/10">
              <Phone className="h-6 w-6 text-[#4A7043]" strokeWidth={1.5} />
            </span>
            <span className="font-display text-2xl tracking-[0.04em] sm:text-[1.65rem]">
              +91 98556 34100
            </span>
          </a>
          <p className="mt-4 text-center text-[0.85rem] text-[#3d463a]/75">
            Mon–Sat · 10:00 – 18:00 IST
          </p>
        </div>

        <h2 className="mt-14 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#5c6658]">
          Write to us
        </h2>
        <ContactForm />
      </div>
    </main>
  );
}
