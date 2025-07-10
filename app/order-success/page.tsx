"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, ArrowRight } from "lucide-react"

export default function OrderSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <CardTitle className="text-2xl text-white">Payment Successful!</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-slate-300">
                <p className="mb-2">Thank you for your purchase!</p>
                {orderId && (
                  <p className="text-sm">
                    Order ID: <span className="text-purple-400 font-mono">{orderId}</span>
                  </p>
                )}
              </div>

              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 text-purple-400 mb-2">
                  <Package className="w-5 h-5" />
                  <span className="font-medium">What's Next?</span>
                </div>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• You'll receive an email confirmation shortly</li>
                  <li>• Your order will be processed within 1-2 business days</li>
                  <li>• Shipping typically takes 3-5 business days</li>
                  <li>• You'll receive tracking information once shipped</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => router.push("/products")}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="flex-1 border-purple-500/30 text-white hover:bg-purple-600/20"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
