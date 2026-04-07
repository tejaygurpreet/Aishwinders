import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "@/lib/admin-constants";

const ADMIN_SESSION = "1" as const;

export { ADMIN_COOKIE };

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === ADMIN_SESSION;
}
