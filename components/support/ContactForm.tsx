"use client";

import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "Could not send");
      }
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch (e) {
      setStatus("err");
      setErrMsg(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 max-w-xl space-y-6 rounded-2xl border border-[#ebe4d8] bg-white/75 p-6 shadow-sm sm:p-8"
    >
      <label className="block">
        <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[#5c6658]">
          Name
        </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-2 w-full rounded-xl border border-[#dcd4c8] bg-[#faf8f4] px-4 py-3 text-[0.95rem] text-[#222222] outline-none transition focus:border-[#4A7043]/45 focus:ring-2 focus:ring-[#4A7043]/20"
        />
      </label>
      <label className="block">
        <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[#5c6658]">
          Email
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-2 w-full rounded-xl border border-[#dcd4c8] bg-[#faf8f4] px-4 py-3 text-[0.95rem] text-[#222222] outline-none transition focus:border-[#4A7043]/45 focus:ring-2 focus:ring-[#4A7043]/20"
        />
      </label>
      <label className="block">
        <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[#5c6658]">
          Message
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="mt-2 w-full resize-y rounded-xl border border-[#dcd4c8] bg-[#faf8f4] px-4 py-3 text-[0.95rem] text-[#222222] outline-none transition focus:border-[#4A7043]/45 focus:ring-2 focus:ring-[#4A7043]/20"
        />
      </label>
      {errMsg ? (
        <p className="text-[0.9rem] text-[#8b3a3a]" role="alert">
          {errMsg}
        </p>
      ) : null}
      {status === "ok" ? (
        <p className="text-[0.95rem] text-[#4A7043]" role="status">
          Thank you — we&apos;ll get back to you shortly.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full min-h-[3rem] rounded-full bg-[#4A7043] text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white shadow-soft transition hover:bg-[#3a5a35] disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
