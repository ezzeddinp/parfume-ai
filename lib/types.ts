export interface Product {
  id: number
  name: string
  description: string
  price_range: string
  price?: number
  image_url: string
  brand_name: string
  gender: string
  concentration: string
  rating: number
  is_featured: boolean
}

export interface CartItem {
  id: number
  name: string
  price: number
  image_url: string
  brand_name: string
  quantity: number
}

export interface Order {
  id: string
  user_email: string
  total: number
  status: string
  items: CartItem[]
  created_at?: string
}

export interface User {
  email: string
  name?: string
}
