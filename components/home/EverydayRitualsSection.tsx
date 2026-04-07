import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CupSoda, Droplets, UtensilsCrossed } from "lucide-react";

const rituals = [
  {
    title: "Steep",
    body: "Morning tisanes and evening wind-downs—let the leaf unfurl slowly in hot water.",
    icon: CupSoda,
  },
  {
    title: "Infuse",
    body: "Cold bottles and carafes that carry a hint of sweetness without syrup or sugar.",
    icon: Droplets,
  },
  {
    title: "Create",
    body: "Bakes and blends where you want nuance: gentle, botanical, never cloying.",
    icon: UtensilsCrossed,
  },
] as const;

export function EverydayRitualsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f4ee] py-28 sm:py-36">
      <div
        className="pointer-events-none absolute right-0 top-0 h-[460px] w-[460px] translate-x-[28%] -translate-y-[22%] rounded-full bg-[#ebe4d8]/95 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[280px] w-[280px] -translate-x-1/3 translate-y-1/4 rounded-full bg-[#4A7043]/[0.05] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <RevealOnScroll className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-xl">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#4A7043]">
              Everyday rituals
            </p>
            <h2 className="font-display mt-4 text-[clamp(1.95rem,4.2vw,2.85rem)] font-medium leading-[1.15] tracking-[-0.028em] text-[#1c2419]">
              Steep. Infuse. Create.
            </h2>
          </div>
          <p className="max-w-md text-[1.02rem] leading-[1.8] tracking-[0.01em] text-[#3d463a]/85 md:text-right">
            Three gentle invitations—each one a way to bring plant-born sweetness
            into the rhythm of your day.
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid gap-7 md:grid-cols-3 md:gap-8">
          {rituals.map((item, i) => (
            <RevealOnScroll key={item.title} delayMs={i * 100}>
              <div className="relative flex h-full flex-col rounded-[1.85rem] border border-[#e8e0d4]/95 bg-gradient-to-br from-white/95 to-[#faf8f4]/90 p-9 shadow-soft transition duration-500 hover:border-[#4A7043]/22 hover:shadow-[0_18px_44px_rgba(28,36,25,0.07)]">
                <div className="mb-7 flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-2xl bg-[#4A7043]/[0.08] text-[#4A7043] ring-1 ring-[#4A7043]/12">
                  <item.icon className="h-7 w-7" strokeWidth={1.35} />
                </div>
                <h3 className="font-display text-[1.5rem] tracking-[-0.02em] text-[#1c2419]">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-[0.98rem] leading-[1.75] tracking-[0.01em] text-[#3d463a]/87">
                  {item.body}
                </p>
                <div className="mt-9 h-px w-full bg-gradient-to-r from-[#4A7043]/28 via-[#ebe4d8] to-transparent" />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
