import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { LOGO_MARK_IMAGE } from "@/lib/assets";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Rooherb — Naturally Sweet Stevia Leaves",
    template: "%s · Rooherb",
  },
  description:
    "Premium sun-dried stevia leaves. Zero calories, whole-leaf purity, crafted for mindful sweetness.",
  icons: {
    icon: LOGO_MARK_IMAGE,
    apple: LOGO_MARK_IMAGE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f7f4ee] text-[#1c2419]">
        <MotionProvider>
          <SiteHeader />
          <div className="flex flex-1 flex-col pt-[4.25rem]">{children}</div>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
