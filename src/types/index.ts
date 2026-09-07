export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string;
  category: string;
  is_new_release: boolean;
  is_buy1get2: boolean;
  stock: number;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderPayload {
  customer_name: string;
  email: string;
  cep: string;
  address: string;
  city: string;
  state: string;
  items: { product_id: string; name: string; price: number; quantity: number }[];
  total: number;
}
