import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminGate } from "./AdminGate";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthenticated();
  return <AdminGate authed={authed}>{children}</AdminGate>;
}
