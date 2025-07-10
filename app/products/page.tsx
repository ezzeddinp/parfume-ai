"use client"
import { getProducts } from "@/lib/database"
import { ProductGrid } from "@/components/products/product-grid"

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Our Perfume Collection</h1>

        <ProductGrid products={products} />
      </div>
    </div>
  )
}
