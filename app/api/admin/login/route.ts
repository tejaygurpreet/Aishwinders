import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-constants";

export const runtime = "nodejs";

const DEFAULT_ADMIN_PASSWORD = "admin123";

export async function POST(req: Request) {
  const expected =
    process.env.ADMIN_DASHBOARD_PASSWORD?.trim() || DEFAULT_ADMIN_PASSWORD;

  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (body.password !== expected) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}
