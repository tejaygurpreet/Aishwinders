import Image from "next/image";
import Link from "next/link";
import { HERO_BACKGROUND_IMAGE } from "@/lib/assets";

export function HeroSection() {
  return (
    <section className="relative h-[calc(100svh-4.25rem)] min-h-0 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_BACKGROUND_IMAGE}
          alt=""
          fill
          priority
          className="scale-[1.03] object-cover object-center blur-[4.37px]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.2)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full min-h-0 max-w-[1400px] items-center px-5 sm:px-8 lg:px-12">
        <div className="flex w-full flex-col items-start justify-center pb-6 pt-5 text-left sm:pb-8 sm:pt-6 md:pb-10">
          <div className="w-full max-w-[min(36rem,100%)] space-y-6 sm:space-y-8 md:ml-[min(6vw,5.5rem)] md:max-w-[min(38rem,52%)] md:space-y-9 lg:ml-[min(10vw,7.5rem)] lg:pr-8">
            <p
              className="hero-enter hero-enter-1 text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-[#222222]"
            >
              Whole leaf stevia
            </p>
            <h1 className="hero-enter hero-enter-2 font-display w-full text-[clamp(2.85rem,7.6vw,5.1rem)] font-bold leading-[1.04] tracking-[-0.03em] text-[#222222]">
              Naturally Sweet.
              <br />
              Pure Simplicity.
            </h1>
            <p className="hero-enter hero-enter-3 font-display w-full max-w-4xl text-[clamp(1.45rem,3.65vw,2.2rem)] font-semibold leading-[1.2] tracking-[-0.015em] text-[#222222]">
              Zero Calories. 100% Sun-Dried Stevia Leaves.
            </p>
            <p className="hero-enter hero-enter-4 w-full max-w-5xl text-[1.02rem] leading-[1.85] tracking-[0.01em] text-[#222222] sm:text-[1.08rem]">
              Whole leaves—never powdered—so you taste the plant in its truest
              form: clean sweetness, sun-warmed depth, and a whisper of herbaceous
              calm in every cup.
            </p>
            <div className="hero-enter hero-enter-5 mt-6 flex flex-wrap items-center justify-start gap-8 pt-2 sm:mt-8 sm:gap-10 sm:pt-4 md:mt-10 md:gap-12">
              <Link
                href="/shop"
                className="inline-flex min-h-[3.15rem] min-w-[10.5rem] items-center justify-center rounded-full bg-[#4A7043] px-10 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white shadow-soft transition hover:bg-[#3a5a35] active:scale-[0.98]"
              >
                Shop Now
              </Link>
              <Link
                href="/our-story"
                className="inline-flex min-h-[3.15rem] min-w-[10.5rem] items-center justify-center rounded-full border-2 border-white bg-white/10 px-10 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white transition hover:bg-white/20 active:scale-[0.98]"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
