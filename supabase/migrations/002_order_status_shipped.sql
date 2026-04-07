-- Migrate legacy "paid" → "shipped" and allow pending / shipped / delivered.

alter table public.orders drop constraint if exists orders_status_check;

update public.orders set status = 'shipped' where status = 'paid';

alter table public.orders add constraint orders_status_check
  check (status in ('pending', 'shipped', 'delivered'));
