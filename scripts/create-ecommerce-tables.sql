-- Create orders table for e-commerce functionality
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(100) PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  items JSONB NOT NULL,
  midtrans_order_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_orders_user_email ON orders(user_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Add price column to perfumes table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'perfumes' AND column_name = 'price') THEN
        ALTER TABLE perfumes ADD COLUMN price DECIMAL(10,2);
    END IF;
END $$;

-- Update perfumes with prices based on price_range
UPDATE perfumes SET price = 
  CASE 
    WHEN price_range = 'Budget' THEN 29.99
    WHEN price_range = 'Mid-range' THEN 79.99
    WHEN price_range = 'Luxury' THEN 149.99
    WHEN price_range = 'Niche' THEN 249.99
    ELSE 99.99
  END
WHERE price IS NULL;

-- Make sure some perfumes are featured for testing
UPDATE perfumes SET is_featured = true WHERE rating >= 4.5 LIMIT 8;
