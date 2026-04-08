"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { OrderRow, OrderStatus } from "@/lib/types/order";

type SortMode = "newest" | "oldest" | "status";

const STATUS_ORDER: Record<OrderStatus, number> = {
  pending: 0,
  shipped: 1,
  delivered: 2,
};

/** Legacy DB value before migration 002. */
function normalizeStatus(raw: string): OrderStatus {
  if (raw === "paid") return "shipped";
  if (raw === "pending" || raw === "shipped" || raw === "delivered") return raw;
  return "pending";
}

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

function shortId(id: string): string {
  return id.slice(0, 8);
}

function shortAddress(o: OrderRow): string {
  const line = [o.address, o.city, o.pincode].filter(Boolean).join(", ");
  if (line.length <= 56) return line;
  return `${line.slice(0, 54)}…`;
}

function itemsSummary(items: OrderRow["items"]): string {
  if (!Array.isArray(items)) return "—";
  return items.map((i) => `${i.name} ×${i.quantity}`).join(" · ");
}

function sortOrders(rows: OrderRow[], mode: SortMode): OrderRow[] {
  const copy = [...rows];
  if (mode === "newest") {
    return copy.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }
  if (mode === "oldest") {
    return copy.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
  }
  return copy.sort((a, b) => {
    const sa = normalizeStatus(a.status);
    const sb = normalizeStatus(b.status);
    const rank = STATUS_ORDER[sa] - STATUS_ORDER[sb];
    if (rank !== 0) return rank;
    return (
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  });
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/admin/orders", {
      cache: "no-store",
      credentials: "same-origin",
    });
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

  const sorted = useMemo(
    () => sortOrders(orders, sortMode),
    [orders, sortMode],
  );

  async function setStatus(id: string, status: OrderStatus) {
    setUpdatingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "same-origin",
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Update failed.");
        return;
      }
      await load();
    } catch {
      setError("Network error.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    window.location.href = "/admin";
  }

  return (
    <main className="flex-1 pb-24">
      <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-8 border-b border-[#e5ddd4] pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#4A7043]">
              Rooherb
            </p>
            <h1 className="font-display mt-3 text-[clamp(1.65rem,2.8vw,2.25rem)] font-medium tracking-[-0.03em] text-[#222222]">
              Order management
            </h1>
            <p className="mt-2 max-w-lg text-[0.92rem] leading-relaxed text-[#5c6658]">
              Review UPI orders, update fulfillment, and keep shipping on track.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#5c6658]">
                Sort
              </span>
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                className="min-h-[2.75rem] min-w-[220px] cursor-pointer rounded-full border border-[#dcd4c8] bg-white px-5 py-2.5 text-[0.8rem] font-medium text-[#222222] shadow-sm outline-none ring-[#4A7043]/0 transition hover:border-[#4A7043]/35 focus:border-[#4A7043]/45 focus:ring-2 focus:ring-[#4A7043]/15"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="status">By status (Pending → Shipped → Delivered)</option>
              </select>
            </label>
            <Link
              href="/admin"
              className="inline-flex min-h-[2.75rem] items-center justify-center self-start rounded-full border border-[#dcd4c8] bg-white px-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#3d463a] shadow-sm hover:bg-[#faf8f4] sm:self-center"
            >
              Overview
            </Link>
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex min-h-[2.75rem] items-center justify-center self-start rounded-full bg-[#222222] px-6 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#333] sm:self-center"
            >
              Sign out
            </button>
          </div>
        </header>

        {error ? (
          <p
            className="mt-8 rounded-xl border border-[#e8c4c4] bg-[#fff8f8] px-4 py-3 text-[0.9rem] text-[#7a2a2a]"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#ebe4d8] bg-white shadow-[0_2px_24px_rgba(28,36,25,0.06)]">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <p className="text-[0.95rem] text-[#5c6658]">Loading orders…</p>
            </div>
          ) : sorted.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[0.95rem] text-[#5c6658]">No orders yet.</p>
              <p className="mt-2 text-[0.85rem] text-[#8a9286]">
                New checkouts will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#ebe4d8] bg-[#faf8f4]">
                    <th className="whitespace-nowrap px-4 py-4 pl-5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5c6658] sm:px-5">
                      Order / date
                    </th>
                    <th className="px-4 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5c6658] sm:px-5">
                      Customer
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5c6658] sm:px-5">
                      Phone
                    </th>
                    <th className="min-w-[160px] px-4 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5c6658] sm:px-5">
                      Email
                    </th>
                    <th className="min-w-[180px] px-4 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5c6658] sm:px-5">
                      Address
                    </th>
                    <th className="min-w-[200px] px-4 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5c6658] sm:px-5">
                      Items
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5c6658] sm:px-5">
                      Total
                    </th>
                    <th className="min-w-[168px] px-4 py-4 pr-5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5c6658] sm:px-5">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((o) => {
                    const st = normalizeStatus(String(o.status));
                    const busy = updatingId === o.id;
                    return (
                      <tr
                        key={o.id}
                        className="border-b border-[#f2ede6] align-top transition hover:bg-[#faf9f7]"
                      >
                        <td className="px-4 py-4 pl-5 sm:px-5">
                          <p className="font-mono text-[0.78rem] font-medium text-[#4A7043]">
                            {shortId(o.id)}…
                          </p>
                          <p className="mt-1 text-[0.8rem] text-[#5c6658]">
                            {formatDate(o.created_at)}
                          </p>
                        </td>
                        <td className="max-w-[140px] px-4 py-4 text-[0.88rem] font-medium text-[#222222] sm:px-5">
                          {o.customer_name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-[0.85rem] tabular-nums text-[#3d463a] sm:px-5">
                          {o.phone}
                        </td>
                        <td className="max-w-[200px] px-4 py-4 sm:px-5">
                          <a
                            href={`mailto:${encodeURIComponent(o.email)}`}
                            className="break-all text-[0.84rem] text-[#4A7043] hover:underline"
                          >
                            {o.email}
                          </a>
                        </td>
                        <td className="max-w-[220px] px-4 py-4 text-[0.82rem] leading-snug text-[#3d463a] sm:px-5">
                          {shortAddress(o)}
                        </td>
                        <td className="max-w-[260px] px-4 py-4 text-[0.8rem] leading-snug text-[#3d463a] sm:px-5">
                          {itemsSummary(o.items)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 font-display text-[1.05rem] tabular-nums text-[#222222] sm:px-5">
                          ₹{Number(o.total_inr)}
                        </td>
                        <td className="px-4 py-4 pr-5 sm:px-5">
                          <div className="flex flex-col gap-1.5">
                            <select
                              aria-label={`Status for order ${shortId(o.id)}`}
                              value={st}
                              disabled={busy}
                              onChange={(e) => {
                                const next = e.target.value as OrderStatus;
                                if (next !== st) void setStatus(o.id, next);
                              }}
                              className="w-full min-w-[140px] cursor-pointer appearance-none rounded-xl border border-[#d4cdc4] py-2.5 pl-3.5 pr-9 text-[0.82rem] font-medium text-[#222222] shadow-sm outline-none transition hover:border-[#4A7043]/45 focus:border-[#4A7043] focus:ring-2 focus:ring-[#4A7043]/20 disabled:cursor-wait disabled:opacity-55"
                              style={{
                                backgroundColor: "#faf8f4",
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234A7043'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 0.75rem center",
                                backgroundSize: "0.7rem",
                              }}
                            >
                              <option value="pending">Pending</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>
                            {busy ? (
                              <span className="text-[0.65rem] text-[#4A7043]/90">
                                Saving…
                              </span>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
