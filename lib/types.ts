export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  created_at?: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface User {
  id: string
  email: string
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  total: number
  status: "pending" | "paid" | "failed" | "cancelled"
  items: CartItem[]
  created_at: string
  midtrans_order_id?: string
}
