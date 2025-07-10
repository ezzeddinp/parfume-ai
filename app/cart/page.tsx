"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/lib/store/cart"
import { useAuthStore } from "@/lib/store/auth"
import { AuthModal } from "@/components/auth/auth-modal"
import { toast } from "sonner"

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()
  const { user, showAuthModal, setShowAuthModal } = useAuthStore()
  const [showAuth, setShowAuth] = useState(false)

  const total = getTotalPrice()

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: number, productName: string) => {
    removeItem(productId)
    toast.success(`${productName} removed from cart`)
  }

  const handleCheckout = () => {
    if (!user) {
      setShowAuth(true)
      return
    }

    if (items.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-16">
              <ShoppingBag className="w-24 h-24 text-slate-600 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
              <p className="text-slate-300 mb-8">Discover our amazing collection of AI-curated fragrances</p>
              <Button
                onClick={() => router.push("/products")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>

        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onSuccess={() => router.push("/checkout")} />
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="bg-slate-800/50 border-purple-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={item.image_url || "/placeholder.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{item.name}</h3>
                        <p className="text-slate-400 text-sm">{item.brand_name}</p>
                        <p className="text-purple-400 font-bold">${item.price}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="border-purple-500/30 text-white hover:bg-purple-600/20"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>

                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                          className="w-16 text-center bg-slate-700/50 border-purple-500/30 text-white"
                          min="1"
                        />

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="border-purple-500/30 text-white hover:bg-purple-600/20"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-slate-800/50 border-purple-500/20 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal ({items.length} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>

                  <div className="border-t border-purple-500/20 pt-4">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {user ? "Proceed to Checkout" : "Login to Checkout"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => router.push("/products")}
                    className="w-full border-purple-500/30 text-white hover:bg-purple-600/20"
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onSuccess={() => router.push("/checkout")} />
    </>
  )
}
