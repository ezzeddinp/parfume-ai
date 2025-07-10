-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100),
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(100) PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  items JSONB NOT NULL,
  midtrans_order_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enable RLS on tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

-- Insert sample products
INSERT INTO products (name, description, price, image, category, stock) VALUES
('Midnight Essence', 'A mysterious and captivating fragrance with notes of bergamot, jasmine, and sandalwood', 89.99, '/placeholder.jpg', 'Unisex', 50),
('Rose Garden', 'Elegant floral perfume with fresh rose petals and subtle vanilla undertones', 79.99, '/placeholder.jpg', 'Women', 30),
('Ocean Breeze', 'Fresh and invigorating scent reminiscent of sea salt and coastal winds', 69.99, '/placeholder.jpg', 'Men', 40),
('Vanilla Dreams', 'Warm and comforting fragrance with rich vanilla and amber notes', 84.99, '/placeholder.jpg', 'Women', 25),
('Citrus Burst', 'Energizing blend of lemon, orange, and grapefruit with mint accents', 74.99, '/placeholder.jpg', 'Unisex', 35),
('Mystic Woods', 'Deep and earthy fragrance with cedar, pine, and moss undertones', 94.99, '/placeholder.jpg', 'Men', 20);
