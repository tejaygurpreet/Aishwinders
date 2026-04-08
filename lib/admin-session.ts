import { createHash, createHmac, timingSafeEqual } from "crypto";

const VERSION = "v1";
const MAX_AGE_SEC = 60 * 60 * 24 * 7;

function getSigningSecret(): string {
  const pw = process.env.ADMIN_PASSWORD?.trim();
  if (!pw) {
    throw new Error("ADMIN_PASSWORD is not configured");
  }
  const pepper =
    process.env.ADMIN_SESSION_SECRET?.trim() ?? "rooherb-admin-session-v1";
  return createHmac("sha256", pepper).update(pw).digest("hex");
}

/** Create a signed, expiring session token (stored in httpOnly cookie). */
export function createAdminSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  const payload = `${VERSION}.${exp}`;
  const secret = getSigningSecret();
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(`${payload}|${sig}`).toString("base64url");
}

export function verifyAdminSessionToken(token: string): boolean {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const lastPipe = raw.lastIndexOf("|");
    if (lastPipe === -1) return false;
    const payload = raw.slice(0, lastPipe);
    const sig = raw.slice(lastPipe + 1);
    const parts = payload.split(".");
    if (parts[0] !== VERSION || parts.length !== 2) return false;
    const exp = parseInt(parts[1], 10);
    if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) {
      return false;
    }
    const secret = getSigningSecret();
    const expected = createHmac("sha256", secret).update(payload).digest("hex");
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Constant-time comparison of password to ADMIN_PASSWORD (hashed). */
export function verifyAdminPasswordPlain(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected) return false;
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isAdminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD?.trim());
}
