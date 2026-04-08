/** Server-side catalog — amounts must match shop / cart / checkout. */

export const SHIPPING_INR = 100;

export type CatalogEntry = {
  name: string;
  priceInr: number;
  imageSrc: string;
  weightLabel: string;
  shortDescription: string;
  /** Long-form copy (e.g. second product) — plain text with newlines */
  longDescription?: string;
  /** Pouch-style: image fills card with no inner padding */
  imageEdgeToEdge?: boolean;
};

export const CATALOG: Record<string, CatalogEntry> = {
  "rooherb-stevia-leaves-80g": {
    name: "Rooherb Sun Dried Stevia Leaves",
    priceInr: 120,
    imageSrc: "/images/pouch1.png",
    weightLabel: "80 g",
    shortDescription:
      "Sun-dried whole stevia leaves in an 80 g pack—crafted for steeping, infusing, and creating with a sweetness that feels effortless and true.",
    imageEdgeToEdge: true,
  },
  "rooherb-stevia-drops-10ml": {
    name: "Stevia Natural Drops (10ml)",
    priceInr: 180,
    imageSrc: "/images/liquid-bottle.png",
    weightLabel: "10 ml",
    shortDescription:
      "Pure liquid sweetness from nature’s own stevia plant—clean, smooth, and easy to dose with the included dropper.",
    longDescription: `Pure liquid sweetness from nature’s own stevia plant.
Our Stevia Natural Drops are carefully extracted from sun-dried stevia leaves, offering a clean, smooth sweetness without any bitter aftertaste. Just a few drops are enough to naturally sweeten your tea, coffee, smoothies, water, or any recipe — with zero calories and zero sugar.

Why choose Rooherb Stevia Drops?
• 100% natural stevia extract
• No artificial sweeteners or fillers
• Extremely concentrated – a little goes a long way
• Convenient dropper bottle for easy use
• Perfect for daily rituals and mindful living

Suggested Use:
Add 2–4 drops per cup of tea or beverage. Adjust according to your taste.

Net Quantity: 10ml
MRP: ₹180`,
  },
};

export const SHOP_PRODUCT_IDS = [
  "rooherb-stevia-leaves-80g",
  "rooherb-stevia-drops-10ml",
] as const;

export type OrderItemInput = { id: string; quantity: number };

export function computeOrderSubtotalPaise(items: OrderItemInput[]): number {
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

/** Subtotal + flat shipping (one fee per order when there is at least one line). */
export function computeOrderTotalPaise(items: OrderItemInput[]): number {
  if (items.length === 0) return 0;
  return computeOrderSubtotalPaise(items) + SHIPPING_INR * 100;
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
