import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface Product {
  id: number
  name: string
  description: string
  price_range: string
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
  quantity: number
}

export interface Order {
  id: string
  user_email: string
  total: number
  status: string
  items: CartItem[]
  created_at: string
}

export async function getProducts(): Promise<Product[]> {
  try {
    const result = await sql`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price_range,
        p.image_url,
        b.name as brand_name,
        p.gender,
        p.concentration,
        p.rating,
        p.is_featured
      FROM perfumes p
      LEFT JOIN brands b ON p.brand_id = b.id
      ORDER BY p.is_featured DESC, p.rating DESC
      LIMIT 50
    `

    return result.map((row) => ({
      ...row,
      rating: Number(row.rating) || 0,
    }))
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const result = await sql`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price_range,
        p.image_url,
        b.name as brand_name,
        p.gender,
        p.concentration,
        p.rating,
        p.is_featured
      FROM perfumes p
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE p.is_featured = true
      ORDER BY p.rating DESC
      LIMIT 12
    `

    return result.map((row) => ({
      ...row,
      rating: Number(row.rating) || 0,
    }))
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

export async function createOrder(order: Omit<Order, "created_at">): Promise<boolean> {
  try {
    await sql`
      INSERT INTO orders (id, user_email, total, status, items)
      VALUES (${order.id}, ${order.user_email}, ${order.total}, ${order.status}, ${JSON.stringify(order.items)})
    `
    return true
  } catch (error) {
    console.error("Error creating order:", error)
    return false
  }
}

export async function updateOrderStatus(orderId: string, status: string): Promise<boolean> {
  try {
    await sql`
      UPDATE orders 
      SET status = ${status}
      WHERE id = ${orderId}
    `
    return true
  } catch (error) {
    console.error("Error updating order status:", error)
    return false
  }
}
