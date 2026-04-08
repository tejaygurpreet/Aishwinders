import { redirect } from "next/navigation";

/** Legacy URL — same sign-in screen as `/admin`. */
export default function AdminLoginRedirectPage() {
  redirect("/admin");
}
