"use client";

import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";
import { STORY_HERO_BACKGROUND_IMAGE } from "@/lib/assets";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const easeLux = [0.22, 1, 0.36, 1] as const;

const heroBodyStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.65 },
  },
};

const heroParagraph = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeLux },
  },
};

const sectionTitle = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeLux },
  },
};

const valuesRoot = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const valueCard = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeLux },
  },
};

const VALUES = [
  "Purity First",
  "Transparency Always",
  "Sustainability in Every Choice",
  "Simplicity as the Ultimate Luxury",
] as const;

const STORY_PARAGRAPHS = [
  "Rooherb began where the best things often do: in stillness, soil, and sunshine. We set out to offer sweetness the way nature intended—without noise, without shortcuts, and without the distance that industrial food puts between you and what you eat.",
  "In the fields of Punjab, our stevia is tended the old way. Leaves are chosen by hand at the right moment, when the plant’s gift is at its gentlest. That work is slow by design; we believe patience is part of purity.",
  "After the pick, there is only the sun—wide skies and days of drying that preserve leaf and character together. What reaches your kitchen is the whole leaf, not a shadow of it: honest sweetness you can see, touch, and trust.",
  "Rooherb is our quiet promise to live lightly on the earth and richly in small moments. Every pouch carries that intention—from our hands to yours, as simple as it should be.",
] as const;

export function OurStoryView() {
  return (
    <main className="flex min-h-0 flex-1 flex-col bg-[#fdfcfa] text-[#2a2d26]">
      {/* —— Hero (full narrative) —— */}
      <section className="relative min-h-[min(92vh,1040px)] w-full overflow-hidden bg-[#e6eae7]">
        <div className="absolute inset-0 z-0">
          <Image
            src={STORY_HERO_BACKGROUND_IMAGE}
            alt=""
            fill
            priority
            className="object-cover object-center opacity-[0.65]"
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-b from-white/35 via-white/12 to-[rgba(0,0,0,0.16)]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[52rem] flex-col px-7 pb-28 pt-28 sm:max-w-[56rem] sm:px-10 sm:pb-36 sm:pt-32 lg:max-w-[58rem] lg:px-12 lg:pb-40 lg:pt-36">
          {/* Titles — centered */}
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: easeLux }}
              className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-[#2a4a28] drop-shadow-[0_1px_20px_rgba(255,255,255,0.65)]"
            >
              Rooherb
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.05, delay: 0.12, ease: easeLux }}
              className={`${playfair.className} mx-auto mt-8 max-w-[14ch] text-[clamp(3.25rem,11vw,6.25rem)] font-medium leading-[0.97] tracking-[-0.03em] text-[#101210] drop-shadow-[0_4px_36px_rgba(255,255,255,0.55)]`}
            >
              Our Story
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.28, ease: easeLux }}
              className={`${playfair.className} mx-auto mt-10 max-w-2xl text-[clamp(1.35rem,3.8vw,2.35rem)] font-normal italic leading-[1.35] tracking-[-0.02em] text-[#1a1f18] drop-shadow-[0_2px_24px_rgba(255,255,255,0.5)]`}
            >
              Rooted in Simplicity
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.48, ease: easeLux }}
              className="mx-auto mt-14 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[#3d5c38]/50 to-transparent"
              aria-hidden
            />
          </div>

          {/* Story body — readable measure, generous type */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroBodyStagger}
            className="mx-auto mt-16 max-w-[42rem] space-y-9 text-left sm:mt-20 sm:max-w-[44rem] sm:space-y-10 lg:mt-24"
          >
            {STORY_PARAGRAPHS.map((text, i) => (
              <motion.p
                key={i}
                variants={heroParagraph}
                className="text-[1.08rem] font-normal leading-[1.92] tracking-[0.02em] text-[#252822] sm:text-[1.2rem] sm:leading-[1.95] lg:text-[1.22rem] lg:leading-[2]"
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* —— Values —— */}
      <section className="border-t border-[#ebe8e2] bg-white px-8 py-28 sm:px-12 sm:py-36">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionTitle}
          className="font-display text-center text-[clamp(1.4rem,3.2vw,1.85rem)] font-medium tracking-[-0.035em] text-[#1c1f1a]"
        >
          Our Values
        </motion.h2>
        <p className="mx-auto mt-5 max-w-md text-center text-[0.88rem] leading-relaxed tracking-[0.04em] text-[#6b7268]">
          The principles that guide every leaf we harvest and every pouch we seal.
        </p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={valuesRoot}
          className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8"
        >
          {VALUES.map((title) => (
            <motion.li
              key={title}
              variants={valueCard}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 380, damping: 30 },
              }}
              className="group relative rounded-2xl border border-[#e6e2db] bg-[#fdfcfa] p-9 shadow-[0_2px_20px_rgba(28,31,26,0.04)] transition-[box-shadow,border-color] duration-500 hover:border-[#4A7043]/22 hover:shadow-[0_24px_56px_rgba(74,112,67,0.1)] sm:p-10"
            >
              <div
                className="absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-[#4A7043]/50 transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden
              />
              <p className="font-display text-[1.2rem] font-medium leading-snug tracking-[-0.025em] text-[#1c1f1a] sm:text-[1.28rem]">
                {title}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </main>
  );
}
