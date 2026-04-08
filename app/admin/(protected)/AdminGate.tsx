"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandLogoLink } from "@/components/layout/BrandLogoLink";

export function AdminGate({
  authed,
  children,
}: {
  authed: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
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
        credentials: "same-origin",
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not sign in.");
        return;
      }
      setPassword("");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen flex-1 flex-col items-center justify-center px-5 py-16">
        <div className="w-full max-w-md rounded-2xl border border-[#ebe4d8] bg-white/95 p-9 shadow-[0_8px_40px_rgba(28,36,25,0.06)]">
          <BrandLogoLink variant="admin" />
          <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#4A7043]">
            Rooherb · Admin
          </p>
          <h1 className="font-display mt-3 text-2xl tracking-[-0.02em] text-[#222222]">
            Sign in
          </h1>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-[#5c6658]">
            Enter the admin password to view orders and manage fulfillment.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[#5c6658]">
                Password
              </span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#dcd4c8] bg-[#faf8f4] px-4 py-3 text-[0.95rem] text-[#222222] outline-none transition focus:border-[#4A7043]/45 focus:ring-2 focus:ring-[#4A7043]/20"
                required
                disabled={loading}
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

  return <>{children}</>;
}
