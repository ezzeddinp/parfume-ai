"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCartStore } from "@/lib/store/cart"
import { useAuthStore } from "@/lib/store/auth"
import { toast } from "sonner"

declare global {
  interface Window {
    snap: any
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { user, setShowAuthModal } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      setShowAuthModal(true)
      return
    }

    if (items.length === 0) {
      router.push("/cart")
      return
    }

    // Load Midtrans Snap script
    const script = document.createElement("script")
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"
    script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [user, items, router, setShowAuthModal])

  const handlePayment = async () => {
    if (!user) {
      setShowAuthModal(true)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          userEmail: user.email,
          total: getTotalPrice(),
        }),
      })

      const data = await response.json()

      if (data.success && data.snapToken) {
        window.snap.pay(data.snapToken, {
          onSuccess: (result: any) => {
            toast.success("Payment successful!")
            clearCart()
            router.push(`/order-success?order_id=${data.orderId}`)
          },
          onPending: (result: any) => {
            toast.info("Payment pending. Please complete your payment.")
          },
          onError: (result: any) => {
            toast.error("Payment failed. Please try again.")
          },
          onClose: () => {
            toast.info("Payment cancelled.")
          },
        })
      } else {
        toast.error("Failed to create payment. Please try again.")
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Please Login</h2>
          <p className="text-slate-300">You need to login to checkout</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Checkout</h1>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-800/50 border-purple-500/20 mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-slate-300">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-slate-400 ml-2">x{item.quantity}</span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-600 pt-4">
                <div className="flex justify-between items-center text-white font-bold text-lg">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Payment</h2>

              <div className="mb-6">
                <p className="text-slate-300 mb-2">Customer: {user.email}</p>
                <p className="text-sm text-slate-400">You will be redirected to Midtrans secure payment page</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3"
                >
                  {isLoading ? "Processing..." : `Pay $${getTotalPrice().toFixed(2)}`}
                </Button>

                <div className="text-center text-sm text-slate-400">
                  <p>Secure payment powered by Midtrans</p>
                  <p>Supports Credit Card, Bank Transfer, E-Wallet & more</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
