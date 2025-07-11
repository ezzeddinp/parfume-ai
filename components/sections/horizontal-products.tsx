"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { useAutoSlide } from "@/hooks/use-auto-slide"
import { useSession } from "@supabase/auth-helpers-react"
import { supabase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"



const horizontalProducts = [
  {
    id: 1,
    name: "Urban Legend",
    brand: "Metropolitan",
    price: "Rp 1.000",
    image: "/placeholder.svg?height=200&width=150",
    description: "Bold and contemporary scent for the modern urbanite",
    recommendation: "Perfect untuk young professionals dan city dwellers",
    customerType: "Urban Professionals",
  },
  {
    id: 2,
    name: "Sunset Dreams",
    brand: "Golden Hour",
    price: "Rp 1.100.000",
    image: "/placeholder.svg?height=200&width=150",
    description: "Warm and inviting fragrance that captures golden moments",
    recommendation: "Ideal untuk romantic evenings dan special occasions",
    customerType: "Romantic Souls",
  },
  {
    id: 3,
    name: "Forest Whisper",
    brand: "Nature's Call",
    price: "Rp 950.000",
    image: "/placeholder.svg?height=200&width=150",
    description: "Fresh woody scent inspired by morning forest walks",
    recommendation: "Great untuk nature lovers dan outdoor enthusiasts",
    customerType: "Nature Enthusiasts",
  },
  {
    id: 4,
    name: "Velvet Night",
    brand: "Midnight Collection",
    price: "Rp 1.400.000",
    image: "/placeholder.svg?height=200&width=150",
    description: "Sophisticated evening fragrance with mysterious allure",
    recommendation: "Perfect untuk elegant dinners dan formal events",
    customerType: "Sophisticated Elite",
  },
  {
    id: 5,
    name: "Crystal Clear",
    brand: "Pure Essence",
    price: "Rp 750.000",
    image: "/placeholder.svg?height=200&width=150",
    description: "Clean and refreshing scent for everyday confidence",
    recommendation: "Excellent untuk minimalists dan clean scent lovers",
    customerType: "Minimalist Lifestyle",
  },
  {
    id: 6,
    name: "Spice Route",
    brand: "Oriental Treasures",
    price: "Rp 1.250.000",
    image: "/placeholder.svg?height=200&width=150",
    description: "Exotic spicy blend with warm oriental notes",
    recommendation: "Ideal untuk adventurous spirits dan spice enthusiasts",
    customerType: "Adventure Seekers",
  },
]

export default function HorizontalProducts() {
  const horizontalRef = useRef(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const horizontalInView = useInView(horizontalRef, { once: true })

  const { isAutoSliding, pauseAutoSlide, resumeAutoSlide } = useAutoSlide({
    containerRef: scrollContainerRef,
    itemWidth: 320 + 24, // card width + gap
    interval: 3000,
    enabled: horizontalInView,
  })
const router = useRouter()

const handleCheckout = async (product: any) => {
  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    router.push("/login")
    return
  }

  try {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([{
        id: product.id,
        name: product.name,
        price: parseInt(product.price.replace(/\D/g, "")),
        quantity: 1,
      }]),
    })

    const { token } = await res.json()

    if (window.snap && token) {
      window.snap.pay(token, {
        onSuccess: (result) => console.log("SUCCESS", result),
        onPending: (result) => console.log("PENDING", result),
        onError: (result) => console.log("ERROR", result),
        onClose: () => console.log("CLOSED BY USER"),
      })
      
    } else {
      alert("Snap not loaded or token missing")
    }
  } catch (err) {
    console.error("Checkout failed:", err)
  }
}



  return (
    <section ref={horizontalRef} className="py-24 px-4 relative z-10">
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

        {/* Auto-sliding Container */}
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
            {horizontalProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="w-80 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 group"
                initial={{ opacity: 0, y: 50 }}
                animate={horizontalInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.4 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Heart Icon */}
                  <motion.div
                    className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="h-4 w-4 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-blue-400 text-sm font-medium">{product.brand}</p>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{product.description}</p>

                  {/* Recommendation Section */}
                  <div className="bg-gradient-to-r from-blue-900/30 to-black/30 rounded-2xl p-4 mb-4 border border-blue-700/20">
                    <div className="flex items-center mb-2">
                      <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
                      <span className="text-blue-300 text-xs font-semibold uppercase tracking-wide">
                        {product.customerType}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm italic">"{product.recommendation}"</p>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                      {product.price}
                    </span>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={() => handleCheckout(product)} className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-full px-6 py-2 text-sm font-semibold">
                        Checkout
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Auto-slide Indicator */}
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
