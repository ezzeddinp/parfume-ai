import { type NextRequest, NextResponse } from "next/server"
import { updateOrderStatus } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { order_id, transaction_status, fraud_status } = body

    let orderStatus = "pending"

    if (transaction_status === "capture") {
      if (fraud_status === "challenge") {
        orderStatus = "challenge"
      } else if (fraud_status === "accept") {
        orderStatus = "success"
      }
    } else if (transaction_status === "settlement") {
      orderStatus = "success"
    } else if (transaction_status === "cancel" || transaction_status === "deny" || transaction_status === "expire") {
      orderStatus = "failed"
    } else if (transaction_status === "pending") {
      orderStatus = "pending"
    }

    // Update order status in database
    await updateOrderStatus(order_id, orderStatus)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Payment callback error:", error)
    return NextResponse.json({ success: false, error: "Callback processing failed" }, { status: 500 })
  }
}
