/** Server-side catalog — amounts must match shop / cart. */
export const CATALOG: Record<
  string,
  { name: string; priceInr: number; imageSrc?: string }
> = {
  "rooherb-stevia-100g": {
    name: "Rooherb STEVIA SUN DRIED LEAVES (100g)",
    priceInr: 100,
    imageSrc: "/images/product-pouch.png",
  },
};

export type OrderItemInput = { id: string; quantity: number };

export function computeOrderTotalPaise(items: OrderItemInput[]): number {
  let paise = 0;
  for (const item of items) {
    const row = CATALOG[item.id];
    if (!row) throw new Error(`Unknown product: ${item.id}`);
    if (item.quantity < 1 || !Number.isInteger(item.quantity)) {
      throw new Error("Invalid quantity");
    }
    paise += row.priceInr * item.quantity * 100;
  }
  return paise;
}

export function enrichItemsForEmail(
  items: OrderItemInput[],
): { name: string; quantity: number; lineTotalInr: number }[] {
  return items.map((item) => {
    const row = CATALOG[item.id];
    if (!row) throw new Error(`Unknown product: ${item.id}`);
    return {
      name: row.name,
      quantity: item.quantity,
      lineTotalInr: row.priceInr * item.quantity,
    };
  });
}
