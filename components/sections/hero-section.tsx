"use client"

import { useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Crown, Eye, ArrowUpRight } from "lucide-react"

interface HeroSectionProps {
  onChatOpen?: () => void
}

export default function HeroSection({ onChatOpen }: HeroSectionProps) {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <section ref={heroRef} className="h-screen relative overflow-hidden bg-black">
      {/* Dark Atmospheric Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-black" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(37,99,235,0.1),transparent_50%)]" />
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-900/5 to-transparent"
        />
      </div>

      <div className="relative z-10 h-full flex">
        {/* Left Side - Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16">
          <AnimatePresence>
            {heroInView && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                {/* Crown Icon */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 1 }}
                  className="mb-8"
                >
                  <Crown className="w-16 h-16 text-blue-400 mb-4" />
                  <div className="w-24 h-px bg-gradient-to-r from-blue-400 to-transparent" />
                </motion.div>

                {/* Main Title */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1.2 }}
                  className="mb-8"
                >
                  <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight">
                    <span className="block text-white mb-2">DARK</span>
                    <span className="block bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600 bg-clip-text text-transparent">ELEGANCE</span>
                  </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="mb-12 max-w-lg"
                >
                  <p className="text-xl text-gray-300 font-light leading-relaxed">
                    Kuasai <span className="text-blue-400 font-medium">aura misterius</span> Anda.
                  </p>
                  <p className="text-lg text-gray-500 mt-2">
                    AI mengungkap fragrance tersembunyi dalam jiwa Anda.
                  </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="mb-16"
                >
                  <Button
                    onClick={onChatOpen}
                    className="group bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-bold rounded-none shadow-2xl border-l-4 border-blue-400 transition-all duration-500 hover:scale-105 hover:shadow-blue-500/30"
                  >
                    AWAKEN YOUR SCENT
                    <ArrowUpRight className="ml-3 h-6 w-6 group-hover:rotate-45 transition-transform duration-300" />
                  </Button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="flex gap-12"
                >
                  <div>
                    <div className="text-3xl font-black text-blue-400">1000+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">Rare Fragrances</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-blue-400">AI</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">Precision Match</div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side - Visual Element */}
        <div className="hidden lg:flex w-1/2 items-center justify-center relative">
          <AnimatePresence>
            {heroInView && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="relative"
              >
                {/* Central Orb */}
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity }
                  }}
                  className="w-80 h-80 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-blue-500/10 to-blue-600/20 rounded-full blur-xl" />
                  <div className="absolute inset-4 bg-gradient-to-tr from-blue-500/30 to-blue-600/30 rounded-full" />
                  <div className="absolute inset-8 bg-gradient-to-bl from-blue-400/40 to-transparent rounded-full" />
                  
                  {/* Center Eye */}
                  <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Eye className="w-12 h-12 text-blue-300" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                    className={`absolute w-4 h-4 bg-blue-400/60 rounded-full blur-sm ${
                      i === 0 ? 'top-10 right-20' : i === 1 ? 'bottom-16 left-16' : 'top-32 left-8'
                    }`}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1.5 }}
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
      />
    </section>
  )
}