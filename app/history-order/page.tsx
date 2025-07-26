"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { motion } from "framer-motion"

type OrderItem = {
  name: string
  quantity: number
}

type Order = {
  id: string
  total_amount: number
  status: string
  created_at: string
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

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-b from-black to-zinc-900">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-blue-400 animate-pulse">Loading order history...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-b from-black to-zinc-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Order History
          </h1>
          <p className="text-zinc-400 mt-2">
            List of your transactions and order status
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[40vh] text-center">
            <div className="text-zinc-400 mb-4">🛍️</div>
            <p className="text-zinc-400">No orders yet.</p>
            <motion.a
              href="/products"
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping
            </motion.a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm hover:border-zinc-700 transition-colors"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                          order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-blue-500/10 text-blue-400'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <span className="text-sm text-zinc-500">Order ID: {order.id}</span>
                      </div>
                      <p className="text-sm text-zinc-400">
                        {new Date(order.created_at).toLocaleDateString("en-GB", {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Rp{order.total_amount.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  {order.order_items && order.order_items.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-zinc-800">
                      <p className="text-sm font-medium text-zinc-300 mb-3">Items:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {order.order_items.map((item, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50"
                          >
                            <span className="text-sm text-zinc-300">{item.name}</span>
                            <span className="text-sm font-medium text-zinc-400">×{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}