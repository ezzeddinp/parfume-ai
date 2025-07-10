import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { order_id, transaction_status, fraud_status } = body

    const supabase = await createClient()

    let status = "pending"

    if (transaction_status === "capture") {
      if (fraud_status === "challenge") {
        status = "pending"
      } else if (fraud_status === "accept") {
        status = "paid"
      }
    } else if (transaction_status === "settlement") {
      status = "paid"
    } else if (transaction_status === "cancel" || transaction_status === "deny" || transaction_status === "expire") {
      status = "failed"
    } else if (transaction_status === "pending") {
      status = "pending"
    }

    // Update order status
    const { error } = await supabase.from("orders").update({ status }).eq("midtrans_order_id", order_id)

    if (error) {
      console.error("Order update error:", error)
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }

    return NextResponse.json({ message: "OK" })
  } catch (error) {
    console.error("Payment callback error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
