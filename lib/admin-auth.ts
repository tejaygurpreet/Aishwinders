import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "@/lib/admin-constants";
import { verifyAdminSessionToken } from "@/lib/admin-session";

export { ADMIN_COOKIE };

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const raw = store.get(ADMIN_COOKIE)?.value;
  if (!raw) return false;
  return verifyAdminSessionToken(raw);
}
