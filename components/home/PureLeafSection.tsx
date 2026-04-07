import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function PureLeafSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf8f4] py-28 sm:py-36">
      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[#4A7043]/[0.055] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 h-[320px] w-[320px] rounded-full bg-[#ebe4d8]/80 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[880px] px-5 text-center sm:px-8">
        <RevealOnScroll>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#4A7043]">
            The Rooherb difference
          </p>
          <h2 className="font-display mt-6 text-[clamp(2.1rem,4.8vw,3.15rem)] font-medium leading-[1.12] tracking-[-0.028em] text-[#1c2419]">
            The Pure Leaf
          </h2>
          <div className="mx-auto mt-10 max-w-lg">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#4A7043]/40 to-transparent" />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={140} className="mt-12">
          <p className="mx-auto max-w-2xl text-[1.06rem] leading-[1.9] tracking-[0.01em] text-[#3d463a]/88">
            We harvest at peak sweetness, then slow sun-dry whole leaves to lock
            in nature&apos;s balance—never rushed, never stripped. The result is
            a gentle, honest sweetness that feels like sunlight held in your
            hands: refined enough for ritual, humble enough for every day.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
