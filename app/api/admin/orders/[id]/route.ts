import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import type { OrderStatus } from "@/lib/types/order";

export const runtime = "nodejs";

const ALLOWED: OrderStatus[] = ["pending", "shipped", "delivered"];

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ error: "Missing order id." }, { status: 400 });
  }

  let body: { status?: string };
  try {
    body = (await req.json()) as { status?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const status = body.status as OrderStatus | undefined;
  if (!status || !ALLOWED.includes(status)) {
    return NextResponse.json(
      { error: "status must be pending, shipped, or delivered." },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select("id, status")
      .single();

    if (error) {
      console.error("[admin/orders PATCH]", error);
      return NextResponse.json(
        { error: error.message ?? "Update failed." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, order: data });
  } catch (e) {
    console.error("[admin/orders PATCH]", e);
    const message = e instanceof Error ? e.message : "Server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
