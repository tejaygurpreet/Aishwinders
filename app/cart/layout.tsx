import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your Rooherb cart",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
