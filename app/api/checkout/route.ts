import { type NextRequest, NextResponse } from "next/server"
import { createOrder } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, userEmail, total } = body

    // Generate order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create Midtrans Snap token
    const snapToken = await createSnapToken({
      orderId,
      amount: total,
      items,
      customerEmail: userEmail,
    })

    // Save order to database
    await createOrder({
      id: orderId,
      user_email: userEmail,
      total,
      status: "pending",
      items,
    })

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
