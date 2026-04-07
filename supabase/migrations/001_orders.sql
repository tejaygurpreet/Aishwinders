-- Run in Supabase SQL Editor or via CLI. Creates `orders` for manual UPI + admin.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  phone text not null,
  email text not null,
  address text not null,
  city text not null,
  pincode text not null,
  items jsonb not null,
  total_inr numeric(12, 2) not null,
  status text not null default 'pending'
    check (status in ('pending', 'shipped', 'delivered')),
  payment_method text not null default 'manual_upi',
  upi_id_displayed text
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);

alter table public.orders enable row level security;

-- No policies for anon/authenticated users: all access via service role from your Next.js API.

comment on table public.orders is 'Rooherb orders; inserts/updates from server with service role only.';
