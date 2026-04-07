import { CraftedWithCareSection } from "@/components/home/CraftedWithCareSection";
import { EverydayRitualsSection } from "@/components/home/EverydayRitualsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PureLeafSection } from "@/components/home/PureLeafSection";
import { WhyWholeLeavesSection } from "@/components/home/WhyWholeLeavesSection";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <PureLeafSection />
      <WhyWholeLeavesSection />
      <EverydayRitualsSection />
      <CraftedWithCareSection />
    </main>
  );
}
