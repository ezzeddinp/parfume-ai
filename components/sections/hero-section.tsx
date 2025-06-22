"use client"

import { useRef } from "react"
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Crown, Zap, ChevronRight, Play, Shield, Truck, RefreshCw, Award, ArrowDown } from "lucide-react"

interface HeroSectionProps {
  onChatOpen?: () => void
}

export default function HeroSection({ onChatOpen }: HeroSectionProps) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const heroInView = useInView(heroRef, { once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative pt-20">
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container mx-auto px-4 text-center relative z-10"
      >
        <AnimatePresence>
          {heroInView && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
              {/* Power Badge */}
              <motion.div variants={itemVariants} className="flex justify-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-blue-900/30 to-black/30 backdrop-blur-xl border border-blue-500/20 rounded-full px-6 py-3 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Crown className="h-5 w-5 text-blue-400" />
                  <span className="text-blue-300 font-semibold">AI-Powered Fragrance Discovery</span>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.h2
                  className="text-6xl md:text-6xl lg:text-6xl font-black mb-8 leading-none"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent block">
                    TEMUKAN
                  </span>
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent block">
                    PERFECTION
                  </span>
                </motion.h2>
              </motion.div>

              <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light leading-relaxed">
                  Rasakan <span className="text-blue-400 font-semibold">masa depan fragrance</span> dengan teknologi AI
                  revolusioner kami
                </p>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  Dapatkan rekomendasi personal dari koleksi 1000+ premium fragrances, dikurasi oleh AI experts
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              >
                <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={onChatOpen}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-10 py-6 text-xl font-semibold rounded-full shadow-xl border border-blue-500/20"
                  >
                    <Zap className="mr-3 h-6 w-6" />
                    Mulai AI Consultation
                    <ChevronRight className="ml-3 h-6 w-6" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-1 border-blue-500/50 bg-black text-white hover:bg-white hover:text-black px-10 py-6 text-xl font-semibold rounded-full backdrop-blur-sm"
                  >
                    <Play className="mr-3 h-6 w-6" />
                    Explore Collection
                  </Button>
                </motion.div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: Shield, text: "100% Authentic", color: "text-blue-400" },
                  { icon: Truck, text: "Gratis Ongkir", color: "text-blue-400" },
                  { icon: RefreshCw, text: "30-Hari Return", color: "text-blue-400" },
                  { icon: Award, text: "Award Winning", color: "text-blue-400" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-transparent rounded-2xl p-4 text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                  >
                    <item.icon className={`h-8 w-8 ${item.color} mx-auto mb-2`} />
                    <span className="text-gray-300 font-medium text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="mt-20">
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="inline-block cursor-pointer"
                >
                  <ArrowDown className="h-10 w-10 text-blue-400 mx-auto" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
