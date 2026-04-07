import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import type { OrderRow } from "@/lib/types/order";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[admin/orders GET]", error);
      return NextResponse.json(
        { error: error.message ?? "Could not load orders." },
        { status: 500 },
      );
    }

    return NextResponse.json({ orders: (data ?? []) as OrderRow[] });
  } catch (e) {
    console.error("[admin/orders GET]", e);
    const message = e instanceof Error ? e.message : "Server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
