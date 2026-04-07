import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] flex-1 items-center justify-center bg-[#f7f4ee] px-5 py-16">
          <p className="text-[0.95rem] text-[#5c6658]">Loading…</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
