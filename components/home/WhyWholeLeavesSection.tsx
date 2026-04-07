import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Gem, Leaf, Sparkles, Sun } from "lucide-react";

const cards = [
  {
    title: "Purity",
    body: "Whole leaves preserve the plant’s integrity—nothing hidden, nothing over-processed.",
    icon: Gem,
  },
  {
    title: "Natural Sweetness",
    body: "A soft, clean profile that sweetens without masking what you brew or bake.",
    icon: Sparkles,
  },
  {
    title: "Zero Calories",
    body: "Plant-based sweetness that aligns with mindful routines and everyday balance.",
    icon: Leaf,
  },
  {
    title: "Timeless Tradition",
    body: "Honoring sun-drying as a quiet craft—patient, deliberate, deeply human.",
    icon: Sun,
  },
] as const;

export function WhyWholeLeavesSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#f0ebe3] via-[#f7f4ee] to-[#faf8f4] py-28 sm:py-36">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#4A7043]">
            Why it matters
          </p>
          <h2 className="font-display mt-5 text-[clamp(1.95rem,4.2vw,2.85rem)] font-medium leading-[1.15] tracking-[-0.028em] text-[#1c2419]">
            Why Whole Leaves Matter
          </h2>
          <p className="mt-6 text-[1.02rem] leading-relaxed tracking-[0.01em] text-[#3d463a]/84">
            Four quiet promises—each one rooted in how we grow, dry, and share
            the leaf.
          </p>
        </RevealOnScroll>

        <div className="mt-20 grid gap-7 sm:grid-cols-2 lg:gap-9">
          {cards.map((card, i) => (
            <RevealOnScroll key={card.title} delayMs={i * 95}>
              <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/75 p-9 shadow-lift backdrop-blur-[10px] transition duration-500 hover:border-[#4A7043]/28 hover:shadow-[0_20px_50px_rgba(74,112,67,0.1)]">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#4A7043]/[0.06] blur-2xl transition duration-500 group-hover:bg-[#4A7043]/[0.1]" />
                <div className="relative flex flex-col gap-5">
                  <span className="inline-flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl bg-[#4A7043]/[0.09] text-[#4A7043] ring-1 ring-[#4A7043]/14">
                    <card.icon className="h-[1.35rem] w-[1.35rem]" strokeWidth={1.45} />
                  </span>
                  <h3 className="font-display text-[1.35rem] tracking-[-0.015em] text-[#1c2419]">
                    {card.title}
                  </h3>
                  <p className="text-[0.97rem] leading-[1.75] tracking-[0.01em] text-[#3d463a]/87">
                    {card.body}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
