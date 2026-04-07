import type { Metadata } from "next";
import { OurStoryView } from "@/components/our-story/OurStoryView";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Hand-picked stevia from Punjab, sun-dried whole leaves, and a quiet promise of purity—from our fields to your table.",
};

export default function OurStoryPage() {
  return <OurStoryView />;
}
