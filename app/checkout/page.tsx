"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/lib/store/cart"
import { useAuthStore } from "@/lib/store/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CreditCard, Shield } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

declare global {
  interface Window {
    snap: any
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [snapLoaded, setSnapLoaded] = useState(false)

  const total = getTotalPrice()

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      router.push("/cart")
      return
    }

    // Redirect if cart is empty
    if (items.length === 0) {
      router.push("/products")
      return
    }

    // Load Midtrans Snap
    const script = document.createElement("script")
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"
    script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!)
    script.onload = () => setSnapLoaded(true)
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [user, items.length, router])

  const handlePayment = async () => {
    if (!snapLoaded) {
      toast.error("Payment system is loading, please wait...")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          total,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed")
      }

      // Open Midtrans Snap
      window.snap.pay(data.snapToken, {
        onSuccess: (result: any) => {
          console.log("Payment success:", result)
          toast.success("Payment successful!")
          clearCart()
          router.push(`/order-success?order_id=${data.orderId}`)
        },
        onPending: (result: any) => {
          console.log("Payment pending:", result)
          toast.info("Payment is being processed...")
          router.push(`/order-success?order_id=${data.orderId}`)
        },
        onError: (result: any) => {
          console.log("Payment error:", result)
          toast.error("Payment failed. Please try again.")
        },
        onClose: () => {
          console.log("Payment popup closed")
          toast.info("Payment cancelled")
        },
      })
    } catch (error: any) {
      console.error("Checkout error:", error)
      toast.error(error.message || "Checkout failed")
    } finally {
      setLoading(false)
    }
  }

  if (!user || items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Items */}
          <div>
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image src={item.image_url || "/placeholder.jpg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-slate-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Payment */}
          <div>
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  Secure Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-purple-500/20 pt-2">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Payment Methods Available:</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Credit/Debit Cards (Visa, Mastercard)</li>
                    <li>• Bank Transfer</li>
                    <li>• QRIS (Indonesia)</li>
                    <li>• E-Wallets (GoPay, OVO, DANA)</li>
                  </ul>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={loading || !snapLoaded}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : !snapLoaded ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay ${total.toFixed(2)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-slate-400 text-center">
                  Your payment is secured by Midtrans. We don't store your payment information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
