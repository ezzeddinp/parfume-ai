export interface Product {
  id: number
  name: string
  description: string
  price: number
  price_range: string
  image_url: string
  brand_id: number
  brand_name?: string
  concentration: string
  gender: string
  rating: number
  is_featured: boolean
  launch_year: number
  best_season: string
  best_occasion: string
  perfumer: string
  longevity: number
  sillage: number
  created_at?: string
}

export interface CartItem {
  id: number
  name: string
  price: number
  image_url: string
  brand_name?: string
  quantity: number
}

export interface Order {
  id: string
  user_email: string
  total: number
  status: "pending" | "completed" | "failed" | "cancelled"
  items: CartItem[]
  midtrans_order_id?: string
  created_at: string
}

export interface User {
  id: string
  email: string
  created_at: string
}
