"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BrandLogoLink } from "@/components/layout/BrandLogoLink";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not sign in.");
        return;
      }
      router.push(from.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] flex-1 flex-col items-center justify-center bg-[#f7f4ee] px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[#ebe4d8] bg-white/90 p-8 shadow-sm">
        <BrandLogoLink variant="admin" />
        <h1 className="font-display mt-4 text-2xl text-[#222222]">Admin sign in</h1>
        <p className="mt-2 text-[0.9rem] text-[#5c6658]">
          Enter the dashboard password to view orders.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[#5c6658]">
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#dcd4c8] bg-[#faf8f4] px-4 py-3 text-[0.95rem] text-[#222222] outline-none transition focus:border-[#4A7043]/45 focus:ring-2 focus:ring-[#4A7043]/20"
              required
            />
          </label>
          {error ? (
            <p className="text-[0.9rem] text-[#8b3a3a]" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[3rem] rounded-full bg-[#4A7043] text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white shadow-soft transition hover:bg-[#3a5a35] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
