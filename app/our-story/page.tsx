import type { Metadata } from "next";
import { OurStoryView } from "@/components/our-story/OurStoryView";
import { STORY_HERO_BACKGROUND_IMAGE } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Hand-picked stevia from Punjab, sun-dried whole leaves, and a quiet promise of purity—from our fields to your table.",
  openGraph: {
    images: [STORY_HERO_BACKGROUND_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [STORY_HERO_BACKGROUND_IMAGE],
  },
};

export default function OurStoryPage() {
  return <OurStoryView />;
}
