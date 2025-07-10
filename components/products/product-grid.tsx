"use client"

import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCartStore } from "@/lib/store/cart"
import { useAuthStore } from "@/lib/store/auth"
import { toast } from "sonner"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCartStore()
  const { user, setShowAuthModal } = useAuthStore()

  const getPriceFromRange = (priceRange: string): number => {
    switch (priceRange) {
      case "Budget":
        return 29.99
      case "Mid-range":
        return 79.99
      case "Luxury":
        return 149.99
      case "Niche":
        return 249.99
      default:
        return 99.99
    }
  }

  const handleAddToCart = (product: Product) => {
    if (!user) {
      setShowAuthModal(true)
      return
    }

    const price = product.price || getPriceFromRange(product.price_range)

    addItem({
      id: product.id,
      name: product.name,
      price,
      image_url: product.image_url || "/placeholder.jpg",
      brand_name: product.brand_name,
    })

    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
        >
          <CardContent className="p-4">
            <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
              <Image
                src={product.image_url || "/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.is_featured && (
                <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                  Featured
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white line-clamp-2">{product.name}</h3>
              <p className="text-sm text-purple-300">{product.brand_name}</p>

              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-slate-300 ml-1">{product.rating?.toFixed(1) || "N/A"}</span>
                </div>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-400">{product.gender}</span>
              </div>

              <p className="text-sm text-slate-400 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-lg font-bold text-white">
                    ${product.price || getPriceFromRange(product.price_range)}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">({product.price_range})</span>
                </div>

                <Button
                  onClick={() => handleAddToCart(product)}
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
