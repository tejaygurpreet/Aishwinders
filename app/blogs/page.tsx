import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Stories, rituals, and reflections from Rooherb — sweetness that feels natural.",
};

export default function BlogsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5] text-[#2c2419]">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-[#e8e0d4] bg-[#f5f0e8] py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#8b7355]">
              Rooherb
            </p>
            <h1 className="mt-4 font-serif text-4xl text-[#2c2419] md:text-5xl">
              Blogs
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#5c5346]">
              We&apos;re curating stories on mindful sweetness, rituals, and the
              craft behind Rooherb. Check back soon — new posts are on the way.
            </p>
            <div className="mt-10">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full border border-[#2c2419] bg-[#2c2419] px-8 py-3 text-sm font-medium text-[#faf8f5] transition hover:bg-[#3d3428]"
              >
                Shop Rooherb
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
