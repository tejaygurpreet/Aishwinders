"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { OrderRow } from "@/lib/types/order";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAddress(o: OrderRow): string {
  const parts = [o.address, o.city, o.pincode].filter(Boolean);
  return parts.join(", ");
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/admin/orders", { credentials: "same-origin" });
    const data = (await res.json()) as { orders?: OrderRow[]; error?: string };
    if (!res.ok) {
      setError(data.error ?? "Could not load orders.");
      setOrders([]);
      return;
    }
    setOrders(data.orders ?? []);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      await load();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    window.location.href = "/admin";
  }

  return (
    <main className="flex-1 pb-24">
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <header className="flex flex-col gap-6 border-b border-[#e8e2d8] pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#4A7043]">
              Rooherb · Admin
            </p>
            <h1 className="font-display mt-2 text-[clamp(1.65rem,3vw,2.1rem)] text-[#222222]">
              Orders
            </h1>
            <p className="mt-2 max-w-md text-[0.92rem] leading-relaxed text-[#5c6658]">
              Every UPI checkout appears here with customer details and line items, newest first.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/orders"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[#dcd4c8] bg-white px-5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#3d463a] hover:bg-[#faf8f4]"
            >
              Status &amp; actions
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[#dcd4c8] bg-white px-5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#3d463a] hover:bg-[#faf8f4]"
            >
              Store
            </Link>
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[#222222] px-5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#333]"
            >
              Sign out
            </button>
          </div>
        </header>

        {error ? (
          <p
            className="mt-8 rounded-xl border border-[#e8c4c4] bg-[#fff5f5] px-4 py-3 text-[0.9rem] text-[#7a2a2a]"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-10 space-y-6">
          {loading ? (
            <p className="text-[0.95rem] text-[#5c6658]">Loading orders…</p>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-[#ebe4d8] bg-white/80 px-8 py-16 text-center shadow-sm">
              <p className="text-[0.95rem] text-[#5c6658]">No orders yet.</p>
              <p className="mt-2 text-[0.85rem] text-[#5c6658]/80">
                Completed checkouts will show up here automatically.
              </p>
            </div>
          ) : (
            orders.map((o) => (
              <article
                key={o.id}
                className="overflow-hidden rounded-2xl border border-[#ebe4d8] bg-white shadow-sm"
              >
                <div className="flex flex-col gap-3 border-b border-[#f0ebe3] bg-[#faf8f4] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#5c6658]">
                      Placed
                    </p>
                    <p className="mt-1 text-[0.95rem] font-medium text-[#222222]">
                      {formatDate(o.created_at)}
                    </p>
                  </div>
                  <p className="font-display text-2xl tabular-nums text-[#4A7043]">
                    ₹{Number(o.total_inr)}
                  </p>
                </div>

                <div className="grid gap-6 px-5 py-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5c6658]">
                      Customer
                    </p>
                    <p className="mt-2 text-[1.05rem] font-medium text-[#222222]">
                      {o.customer_name}
                    </p>
                    <p className="mt-1 text-[0.9rem] tabular-nums text-[#3d463a]">{o.phone}</p>
                    <a
                      href={`mailto:${encodeURIComponent(o.email)}`}
                      className="mt-1 inline-block text-[0.88rem] text-[#4A7043] hover:underline"
                    >
                      {o.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5c6658]">
                      Ship to
                    </p>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-[#222222]">
                      {formatAddress(o)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#f0ebe3] px-5 py-5">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5c6658]">
                    Items
                  </p>
                  <ul className="mt-3 space-y-2">
                    {Array.isArray(o.items) ? (
                      o.items.map((item, i) => (
                        <li
                          key={`${o.id}-${i}`}
                          className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#f5f0ea] pb-2 text-[0.9rem] last:border-0 last:pb-0"
                        >
                          <span className="text-[#222222]">
                            {item.name}{" "}
                            <span className="text-[#5c6658]">×{item.quantity}</span>
                          </span>
                          <span className="tabular-nums text-[#3d463a]">
                            ₹{item.line_total_inr}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="text-[0.9rem] text-[#5c6658]">—</li>
                    )}
                  </ul>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
