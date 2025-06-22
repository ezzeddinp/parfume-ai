"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star } from "lucide-react"
import { useAutoSlide } from "@/hooks/use-auto-slide"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    content: "The AI recommendations were spot-on! Found my perfect signature scent in minutes.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Executive",
    content: "Incredible selection and the AI chatbot knows more about perfumes than most experts.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Perfume Enthusiast",
    content: "Finally, a platform that understands my fragrance preferences. Absolutely love it!",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Luxury Collector",
    content: "The curation is exceptional. Every recommendation has been a perfect match for my taste.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Beauty Influencer",
    content: "This AI understands fragrance better than most human experts I've worked with.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function TestimonialsSection() {
  const testimonialsRef = useRef(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const testimonialsInView = useInView(testimonialsRef, { once: true })

  const { isAutoSliding, pauseAutoSlide, resumeAutoSlide } = useAutoSlide({
    containerRef: scrollContainerRef,
    itemWidth: 384 + 32, // card width + gap
    interval: 4000,
    enabled: testimonialsInView,
  })

  return (
    <section ref={testimonialsRef} className="py-32 px-4 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h3
            className="text-6xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          >
            CUSTOMER STORIES
          </motion.h3>
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={testimonialsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Join thousands of satisfied customers who found their perfect scent with PerfumeAI
          </motion.p>
        </motion.div>

        {/* Auto-sliding Testimonials */}
        <motion.div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 pb-6 scrollbar-track-transparent"
          initial={{ opacity: 0, x: 100 }}
          animate={testimonialsInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseEnter={pauseAutoSlide}
          onMouseLeave={resumeAutoSlide}
          onTouchStart={pauseAutoSlide}
          onTouchEnd={resumeAutoSlide}
        >
          <div className="flex space-x-8 w-max">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="w-96 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 h-full flex flex-col hover:border-blue-500/50 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-blue-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-300 mb-8 leading-relaxed italic text-lg flex-1">"{testimonial.content}"</p>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-blue-500/30"
                  />
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-blue-400 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Auto-slide Status */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={testimonialsInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="text-gray-400 text-sm text-center">
            <span>{isAutoSliding ? "Stories auto-rotating..." : "Hover to pause rotation"}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
