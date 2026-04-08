import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-constants";
import { getAdminSessionCookieOptions } from "@/lib/admin-cookie-options";
import {
  createAdminSessionToken,
  isAdminPasswordConfigured,
  verifyAdminPasswordPlain,
} from "@/lib/admin-session";

export const runtime = "nodejs";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export async function POST(req: Request) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured on the server." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const password = body.password ?? "";
  if (!verifyAdminPasswordPlain(password)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  let token: string;
  try {
    token = createAdminSessionToken();
  } catch (e) {
    console.error("[admin/login] session token", e);
    return NextResponse.json(
      { error: "Could not create session." },
      { status: 500 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(
    ADMIN_COOKIE,
    token,
    getAdminSessionCookieOptions(SESSION_MAX_AGE),
  );
  return res;
}
