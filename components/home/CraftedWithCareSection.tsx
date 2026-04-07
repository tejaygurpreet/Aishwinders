import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CRAFTED_SECTION_IMAGE } from "@/lib/assets";

export function CraftedWithCareSection() {
  return (
    <section className="relative overflow-hidden bg-[#1a2218] py-28 text-[#f7f4ee] sm:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 70% at 15% 0%, rgba(74,112,67,0.42) 0%, transparent 52%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(235,228,216,0.1) 0%, transparent 48%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <RevealOnScroll>
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#b8c9b3]">
              Crafted with care
            </p>
            <h2 className="font-display mt-5 text-[clamp(2.1rem,4.2vw,3.15rem)] font-medium leading-[1.12] tracking-[-0.028em]">
              Patient hands.
              <br />
              <span className="text-[#d8e6d3]">Sunlit patience.</span>
            </h2>
            <p className="mt-9 text-[1.05rem] leading-[1.88] tracking-[0.01em] text-[#e8e3d9]/88">
              From careful picking to slow drying on raised beds, we treat each
              batch as a small ceremony—observing color, scent, and crumble until
              the leaf tells us it&apos;s ready. Nothing added. Nothing rushed.
              Just the plant, the sun, and time.
            </p>
            <ul className="mt-11 space-y-5 text-[0.96rem] leading-[1.65] tracking-[0.01em] text-[#e8e3d9]/78">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6b8f63]" />
                Small-batch handling with traceable sourcing
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6b8f63]" />
                Sun drying to preserve delicate aromatics
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6b8f63]" />
                Whole-leaf presentation you can see and trust
              </li>
            </ul>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={120} className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="absolute inset-0 -m-3 rounded-[2.25rem] bg-gradient-to-tr from-[#4A7043]/25 to-transparent opacity-70 blur-3xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-white/12">
            <Image
              src={CRAFTED_SECTION_IMAGE}
              alt="Sun-dried stevia leaves and tea"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 44vw, 90vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2218]/85 via-transparent to-[#1a2218]/10" />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
