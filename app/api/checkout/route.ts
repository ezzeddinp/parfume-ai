import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createOrder } from "@/lib/database"

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

    // Generate order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create Midtrans Snap token
    const snapToken = await createSnapToken({
      orderId,
      amount: total,
      items,
      customerEmail: user.email!,
    })

    // Save order to database
    const orderSaved = await createOrder({
      id: orderId,
      user_email: user.email!,
      total,
      status: "pending",
      items,
      midtrans_order_id: orderId,
    })

    if (!orderSaved) {
      throw new Error("Failed to save order")
    }

    return NextResponse.json({
      success: true,
      snapToken,
      orderId,
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ success: false, error: "Checkout failed" }, { status: 500 })
  }
}

async function createSnapToken(params: {
  orderId: string
  amount: number
  items: any[]
  customerEmail: string
}) {
  const { orderId, amount, items, customerEmail } = params

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: Math.round(amount),
    },
    credit_card: {
      secure: true,
    },
    item_details: items.map((item) => ({
      id: item.id.toString(),
      price: Math.round(item.price),
      quantity: item.quantity,
      name: item.name,
    })),
    customer_details: {
      email: customerEmail,
      first_name: customerEmail.split("@")[0],
    },
  }

  const authString = Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString("base64")

  const response = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${authString}`,
    },
    body: JSON.stringify(parameter),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(`Midtrans error: ${result.error_messages?.join(", ") || "Unknown error"}`)
  }

  return result.token
}
