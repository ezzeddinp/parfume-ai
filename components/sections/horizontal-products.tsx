"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { useAutoSlide } from "@/hooks/use-auto-slide"
import { supabase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export default function HorizontalProducts() {
  const [horizontalProducts, setHorizontalProducts] = useState<any[]>([])
  const horizontalRef = useRef(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const horizontalInView = useInView(horizontalRef, { once: true })
  const router = useRouter()

  const { isAutoSliding, pauseAutoSlide, resumeAutoSlide } = useAutoSlide({
    containerRef: scrollContainerRef,
    itemWidth: 320 + 24,
    interval: 3000,
    enabled: horizontalInView,
  })

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...")
      const { data, error } = await supabase
        .from("parfume-product")
        .select("*")
        .order("id", { ascending: true })
      console.log("Supabase response:", { data, error })
      if (data) setHorizontalProducts(data)
      else console.error("Supabase error:", error)
    }

    fetchData()
  }, [])

  const handleCheckout = (product: any) => {
    // Store the selected product in localStorage
    localStorage.setItem("checkoutItems", JSON.stringify([{
      id: product.id,
      name: product.name,
      price: parseInt(product.price.toString().replace(/\D/g, "")),
      quantity: 1,
      image: product.image || "/placeholder.svg",
    }]))
    router.push("/checkout")
  }

  return (
    <section ref={horizontalRef} className="py-24 px-4 relative z-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={horizontalInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h3
            className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={horizontalInView ? { opacity: 1, y: 0 } : {}}
          >
            DIPILIH UNTUK ANDA
          </motion.h3>
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={horizontalInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Temukan fragrances yang disesuaikan dengan berbagai kepribadian dan gaya hidup
          </motion.p>
        </motion.div>

        <motion.div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 pb-6 scrollbar-track-transparent"
          initial={{ opacity: 0, x: -100 }}
          animate={horizontalInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseEnter={pauseAutoSlide}
          onMouseLeave={resumeAutoSlide}
          onTouchStart={pauseAutoSlide}
          onTouchEnd={resumeAutoSlide}
        >
          <div className="flex space-x-6 w-max">
            {horizontalProducts.length > 0 ? (
              horizontalProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="w-80 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 50 }}
                  animate={horizontalInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <motion.div
                      className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full p-2"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className="h-4 w-4 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-blue-400 text-sm font-medium">{product.brand}</p>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{product.description}</p>

                    <div className="bg-gradient-to-r from-blue-900/30 to-black/30 rounded-2xl p-4 mb-4 border border-blue-700/20">
                      <div className="flex items-center mb-2">
                        <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
                        <span className="text-blue-300 text-xs font-semibold uppercase tracking-wide">
                          {product.customerType}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm italic">"{product.recommendation}"</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                        Rp. {product.price}
                      </span>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={() => handleCheckout(product)}
                          className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-full px-6 py-2 text-sm font-semibold"
                        >
                          Checkout
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400">No products available</p>
            )}
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={horizontalInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <ChevronLeft className="h-4 w-4" />
            <span>{isAutoSliding ? "Auto-sliding..." : "Hover to pause"}</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}