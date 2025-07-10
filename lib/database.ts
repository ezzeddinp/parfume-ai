import { createClient } from "./supabase/client"
import type { Product, Order } from "./types"

export async function getProducts(): Promise<Product[]> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("perfumes")
      .select(`
        *,
        brands!inner(name)
      `)
      .order("is_featured", { ascending: false })
      .order("rating", { ascending: false })
      .limit(50)

    if (error) throw error

    return (
      data?.map((item) => ({
        ...item,
        brand_name: item.brands?.name || "Unknown Brand",
        price: item.price || getPriceFromRange(item.price_range),
        rating: Number(item.rating) || 0,
      })) || []
    )
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("perfumes")
      .select(`
        *,
        brands!inner(name)
      `)
      .eq("is_featured", true)
      .order("rating", { ascending: false })
      .limit(8)

    if (error) throw error

    return (
      data?.map((item) => ({
        ...item,
        brand_name: item.brands?.name || "Unknown Brand",
        price: item.price || getPriceFromRange(item.price_range),
        rating: Number(item.rating) || 0,
      })) || []
    )
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("perfumes")
      .select(`
        *,
        brands!inner(name)
      `)
      .eq("id", id)
      .single()

    if (error) throw error

    return {
      ...data,
      brand_name: data.brands?.name || "Unknown Brand",
      price: data.price || getPriceFromRange(data.price_range),
      rating: Number(data.rating) || 0,
    }
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function createOrder(order: Omit<Order, "created_at">): Promise<boolean> {
  const supabase = createClient()

  try {
    const { error } = await supabase.from("orders").insert({
      id: order.id,
      user_email: order.user_email,
      total: order.total,
      status: order.status,
      items: order.items,
      midtrans_order_id: order.midtrans_order_id,
    })

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error creating order:", error)
    return false
  }
}

export async function updateOrderStatus(orderId: string, status: string): Promise<boolean> {
  const supabase = createClient()

  try {
    const { error } = await supabase.from("orders").update({ status }).eq("id", orderId)

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error updating order status:", error)
    return false
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching order:", error)
    return null
  }
}

function getPriceFromRange(priceRange: string): number {
  switch (priceRange) {
    case "Budget":
      return 29.99
    case "Mid-range":
      return 79.99
    case "Luxury":
      return 149.99
    case "Niche":
      return 249.99
    default:
      return 99.99
  }
}
