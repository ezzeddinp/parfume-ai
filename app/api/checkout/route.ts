import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { items, total } = body

    // Generate unique order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Midtrans Snap parameters
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: total,
      },
      credit_card: {
        secure: true,
      },
      item_details: items.map((item: any) => ({
        id: item.product.id,
        price: item.product.price,
        quantity: item.quantity,
        name: item.product.name,
      })),
      customer_details: {
        email: user.email,
        first_name: user.email?.split("@")[0] || "Customer",
      },
    }

    // Call Midtrans Snap API
    const response = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString("base64")}`,
      },
      body: JSON.stringify(parameter),
    })

    const snapResponse = await response.json()

    if (!response.ok) {
      throw new Error(snapResponse.error_messages?.[0] || "Payment initialization failed")
    }

    // Save order to database
    const { error: orderError } = await supabase.from("orders").insert({
      id: orderId,
      user_id: user.id,
      total,
      status: "pending",
      items,
      midtrans_order_id: orderId,
    })

    if (orderError) {
      console.error("Order save error:", orderError)
    }

    return NextResponse.json({
      token: snapResponse.token,
      redirect_url: snapResponse.redirect_url,
      order_id: orderId,
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
