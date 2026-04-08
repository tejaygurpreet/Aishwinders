import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SHIPPING_INR } from "@/lib/catalog";

export type CartLine = {
  id: string;
  name: string;
  priceInr: number;
  quantity: number;
  imageSrc?: string;
};

type CartState = {
  lines: CartLine[];
  addToCart: (
    line: Omit<CartLine, "quantity"> & { quantity?: number },
  ) => void;
  setLineQuantity: (id: string, quantity: number) => void;
  removeLine: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      addToCart: (line) => {
        const qty = Math.max(1, line.quantity ?? 1);
        set((state) => {
          const prev = state.lines;
          const i = prev.findIndex((l) => l.id === line.id);
          if (i === -1) {
            return { lines: [...prev, { ...line, quantity: qty }] };
          }
          const next = [...prev];
          next[i] = {
            ...next[i],
            quantity: next[i].quantity + qty,
            name: line.name,
            priceInr: line.priceInr,
            imageSrc: line.imageSrc ?? next[i].imageSrc,
          };
          return { lines: next };
        });
      },
      setLineQuantity: (id, quantity) => {
        const q = Math.max(0, Math.floor(quantity));
        set((state) => {
          if (q === 0) {
            return { lines: state.lines.filter((l) => l.id !== id) };
          }
          return {
            lines: state.lines.map((l) =>
              l.id === id ? { ...l, quantity: q } : l,
            ),
          };
        });
      },
      removeLine: (id) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.id !== id),
        })),
      clearCart: () => set({ lines: [] }),
    }),
    {
      name: "rooherb-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function selectCartItemCount(state: CartState): number {
  return state.lines.reduce((acc, l) => acc + l.quantity, 0);
}

export function selectSubtotalInr(state: CartState): number {
  return state.lines.reduce((acc, l) => acc + l.priceInr * l.quantity, 0);
}

export function selectShippingInr(state: CartState): number {
  return state.lines.length > 0 ? SHIPPING_INR : 0;
}

export function selectGrandTotalInr(state: CartState): number {
  return selectSubtotalInr(state) + selectShippingInr(state);
}
