export type OrderStatus = "pending" | "shipped" | "delivered";

export type OrderItemStored = {
  id: string;
  name: string;
  quantity: number;
  line_total_inr: number;
};

export type OrderRow = {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  items: OrderItemStored[];
  total_inr: number;
  /** Legacy `paid` may appear until migration `002_order_status_shipped` is applied. */
  status: OrderStatus | "paid";
  payment_method: string;
  upi_id_displayed: string | null;
};
