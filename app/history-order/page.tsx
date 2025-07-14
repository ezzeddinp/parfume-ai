"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

type OrderItem = {
  name: string
  quantity: number
}

type Order = {
  id: string
  total_amount: number
  status: string
  order_date: string
  order_items: OrderItem[] | null
}

export default function HistoryOrderPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        window.location.href = "/login"
        return
      }

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Failed to fetch orders:", error.message)
      } else if (data) {
        setOrders(data as Order[])
      }

      setLoading(false)
    }

    fetchOrders()
  }, [])

  if (loading) return <div className="text-center py-10 text-white">Loading order history...</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Riwayat Pemesanan</h1>

      {orders.length === 0 ? (
        <p className="text-zinc-400">Belum ada pesanan.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border border-zinc-700 p-4 rounded-lg bg-zinc-900"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-zinc-400">Order ID: {order.id}</p>
                  <p className="font-semibold">
                    Status: <span className="capitalize">{order.status}</span>
                  </p>
                  <p className="text-sm text-zinc-500">
                    Tanggal: {new Date(order.order_date).toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-400">
                    Rp{order.total_amount.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {order.order_items && order.order_items.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium text-zinc-300 mb-2">Items:</p>
                  <ul className="list-disc list-inside text-sm text-zinc-400">
                    {order.order_items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
