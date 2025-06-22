"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Star, Sparkles, Mail } from "lucide-react"

const featuredPerfumes = [
  {
    id: 1,
    name: "Midnight Essence",
    brand: "Luxe Noir",
    price: "Rp. 120",
    originalPrice: "Rp. 150",
    rating: 4.8,
    reviews: 324,
    image: "/placeholder.svg?height=400&width=300",
    notes: ["Bergamot", "Rose", "Sandalwood"],
    description: "A mysterious blend that captures the essence of midnight elegance with deep, sensual notes",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: 2,
    name: "Ocean Breeze",
    brand: "Azure Dreams",
    price: "Rp. 95",
    originalPrice: "Rp. 120",
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg?height=400&width=300",
    notes: ["Sea Salt", "Jasmine", "Driftwood"],
    description: "Fresh aquatic fragrance inspired by ocean waves and coastal morning mist",
    badge: "New Arrival",
    inStock: true,
  },
  {
    id: 3,
    name: "Royal Velvet",
    brand: "Majestic Scents",
    price: "Rp. 180",
    originalPrice: "Rp. 220",
    rating: 4.9,
    reviews: 567,
    image: "/placeholder.svg?height=400&width=300",
    notes: ["Oud", "Vanilla", "Amber"],
    description: "Luxurious oriental fragrance fit for royalty with rich, opulent undertones",
    badge: "Premium",
    inStock: false,
  },
]

export default function FeaturedPerfumes() {
  const perfumesRef = useRef(null)
  const perfumesInView = useInView(perfumesRef, { once: true })

  return (
    <section ref={perfumesRef} className="py-32 px-4 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={perfumesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h3
            className="text-6xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={perfumesInView ? { opacity: 1, y: 0 } : {}}
          >
            FEATURED FRAGRANCES
          </motion.h3>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={perfumesInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Curated collection of the world's most exquisite perfumes, handpicked by our AI experts
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {featuredPerfumes.map((perfume, index) => (
            <motion.div
              key={perfume.id}
              initial={{ opacity: 0, y: 100 }}
              animate={perfumesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="group relative h-full"
            >
              <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 relative h-full flex flex-col">
                {/* Image Container with Badge */}
                <div className="relative overflow-hidden aspect-[3/4] mb-6">
                  <img
                    src={perfume.image || "/placeholder.svg"}
                    alt={perfume.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Badge positioned over image */}
                  {perfume.badge && (
                    <motion.div
                      className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-bold px-4 py-2 rounded-full z-10"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={perfumesInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.5 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {perfume.badge}
                    </motion.div>
                  )}

                  {/* Heart Icon */}
                  <motion.div
                    className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full p-3 z-10"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                  </motion.div>

                  {/* Out of Stock Overlay */}
                  {!perfume.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                      <span className="text-white font-bold bg-blue-600 px-6 py-3 rounded-full text-lg">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="px-8 pb-8 flex-1 flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={perfumesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 + 0.4 }}
                    className="flex-1"
                  >
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {perfume.name}
                    </h4>
                    <p className="text-blue-400 mb-4 text-lg font-medium">{perfume.brand}</p>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">{perfume.description}</p>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(perfume.rating) ? "text-blue-400 fill-current" : "text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="text-gray-300 ml-2 font-medium">{perfume.rating}</span>
                      </div>
                      <span className="text-gray-400 text-sm">({perfume.reviews} reviews)</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {perfume.notes.map((note, noteIndex) => (
                        <span
                          key={noteIndex}
                          className="text-xs bg-gradient-to-r from-blue-900/50 to-black/50 text-blue-300 px-3 py-2 rounded-full border border-blue-700/30 font-medium"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Price and Button Container */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-black bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                          {perfume.price}
                        </span>
                        {perfume.originalPrice && (
                          <span className="text-gray-500 line-through text-lg">{perfume.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-2xl py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!perfume.inStock}
                      >
                        {perfume.inStock ? (
                          <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Add to Cart
                          </>
                        ) : (
                          <>
                            <Mail className="mr-2 h-5 w-5" />
                            Notify Me
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
