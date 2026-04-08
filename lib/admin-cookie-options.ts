/** Cookie flags that work on Vercel (HTTPS) and local dev (HTTP). */
export function getAdminSessionCookieOptions(maxAgeSec: number) {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true as const,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSec,
  };
}
