/*
# Create products and orders tables for retro geek store

1. New Tables
- `products`: Stores all shirts and geek accessories for sale.
  - id (uuid, primary key)
  - name (text, not null) - product name
  - description (text) - product description
  - price (numeric, not null) - price in BRL
  - image_url (text, not null) - product image URL
  - category (text, not null) - 'camisetas' | 'acessorios' | 'bones'
  - is_new_release (boolean, default false) - flags new release products
  - is_buy1get2 (boolean, default false) - flags products in Compre 1 Leve 2 promo
  - stock (integer, default 100) - available stock
  - created_at (timestamptz, default now())
- `orders`: Stores customer checkout orders.
  - id (uuid, primary key)
  - customer_name (text, not null)
  - email (text, not null)
  - cep (text, not null)
  - address (text, not null)
  - city (text, not null)
  - state (text, not null)
  - items (jsonb, not null) - array of {product_id, name, price, quantity}
  - total (numeric, not null)
  - status (text, default 'pendente')
  - created_at (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- Products: public read (anon + authenticated), no public write — data is catalog only.
- Orders: public insert (anon + authenticated can place orders), no public read/update/delete for security.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  is_new_release boolean NOT NULL DEFAULT false,
  is_buy1get2 boolean NOT NULL DEFAULT false,
  stock integer NOT NULL DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  email text NOT NULL,
  cep text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  items jsonb NOT NULL,
  total numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pendente',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Products: public read only
DROP POLICY IF EXISTS "anon_read_products" ON products;
CREATE POLICY "anon_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Orders: public insert only (customers can place orders)
DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);
