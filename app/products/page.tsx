import { getProducts } from "@/lib/database"
import { ProductGrid } from "@/components/products/product-grid"

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Our Premium Collection</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Discover AI-curated fragrances that match your unique personality and style
          </p>
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  )
}
