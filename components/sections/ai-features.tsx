"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MessageCircle, Sparkles, Heart, Star } from "lucide-react"

export default function AIFeatures() {
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true })

  return (
    <section ref={featuresRef} className="py-32 px-4 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h3
            className="text-6xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          >
            AI-POWERED DISCOVERY
          </motion.h3>
          <motion.p
            className="text-md text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={featuresInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Experience the future of perfume discovery with our advanced AI technology that understands your unique
            preferences
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              icon: MessageCircle,
              title: "Expert AI Consultation",
              description:
                "Chat with our AI perfume expert trained on thousands of fragrances. Get personalized recommendations based on your unique preferences, lifestyle, and occasions.",
              features: ["24/7 Availability", "Instant Responses", "Personalized Advice"],
            },
            {
              icon: Sparkles,
              title: "Smart Scent Matching",
              description:
                "Our AI analyzes your preferences, mood, and occasion to find the perfect fragrance match. Discover scents that complement your personality and style.",
              features: ["Mood Analysis", "Occasion Matching", "Style Profiling"],
            },
            {
              icon: Heart,
              title: "Personal Fragrance Journey",
              description:
                "Build your unique fragrance profile and track your scent journey. Get intelligent recommendations for expanding your collection based on your history.",
              features: ["Collection Tracking", "Smart Recommendations", "Preference Learning"],
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="group relative h-full"
            >
              <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-8 text-center relative overflow-hidden h-full flex flex-col">
                <motion.div
                  className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-8"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="h-12 w-12 text-white" />
                </motion.div>

                <h4 className="text-xl font-bold text-white mb-6 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h4>

                <p className="text-gray-300 leading-relaxed mb-8 flex-1">{feature.description}</p>

                <ul className="space-y-3">
                  {feature.features.map((item, i) => (
                    <li key={i} className="text-blue-400 text-sm flex items-center justify-center font-medium">
                      <Star className="h-4 w-4 mr-2 fill-current" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
