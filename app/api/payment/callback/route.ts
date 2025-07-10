import { type NextRequest, NextResponse } from "next/server"
import { updateOrderStatus } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { order_id, transaction_status, fraud_status } = body

    let orderStatus = "pending"

    if (transaction_status === "capture") {
      if (fraud_status === "challenge") {
        orderStatus = "pending"
      } else if (fraud_status === "accept") {
        orderStatus = "completed"
      }
    } else if (transaction_status === "settlement") {
      orderStatus = "completed"
    } else if (transaction_status === "cancel" || transaction_status === "deny" || transaction_status === "expire") {
      orderStatus = "failed"
    } else if (transaction_status === "pending") {
      orderStatus = "pending"
    }

    // Update order status in database
    const updated = await updateOrderStatus(order_id, orderStatus)

    if (!updated) {
      throw new Error("Failed to update order status")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Payment callback error:", error)
    return NextResponse.json({ success: false, error: "Callback processing failed" }, { status: 500 })
  }
}
