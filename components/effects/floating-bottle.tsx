"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function FloatingBottle() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()

  // Different positions for different sections
  const bottleY = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [100, 200, 300, 400, 500, 600])
  const bottleX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [20, 80, 20, 80, 20])
  const bottleRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const bottleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      className="fixed right-8 z-20 pointer-events-none hidden lg:block"
      style={{
        y: bottleY,
        x: bottleX,
        rotate: bottleRotate,
        scale: bottleScale,
      }}
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {/* Perfume Bottle SVG */}
        <motion.svg
          width="80"
          height="120"
          viewBox="0 0 80 120"
          className="drop-shadow-2xl"
          whileHover={{ scale: 1.1 }}
        >
          {/* Bottle Body */}
          <motion.rect
            x="20"
            y="40"
            width="40"
            height="70"
            rx="8"
            fill="url(#bottleGradient)"
            stroke="rgba(59, 130, 246, 0.5)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />

          {/* Bottle Neck */}
          <motion.rect
            x="30"
            y="20"
            width="20"
            height="25"
            rx="4"
            fill="url(#neckGradient)"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          />

          {/* Bottle Cap */}
          <motion.rect
            x="28"
            y="15"
            width="24"
            height="10"
            rx="5"
            fill="url(#capGradient)"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          />

          {/* Liquid */}
          <motion.rect
            x="25"
            y="50"
            width="30"
            height="55"
            rx="6"
            fill="url(#liquidGradient)"
            initial={{ height: 0, y: 105 }}
            animate={{ height: 55, y: 50 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
          />

          {/* Sparkle Effects */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={i}
              cx={25 + Math.random() * 30}
              cy={50 + Math.random() * 60}
              r="1"
              fill="rgba(255, 255, 255, 0.8)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Gradients */}
          <defs>
            <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 0, 0, 0.8)" />
              <stop offset="50%" stopColor="rgba(30, 64, 175, 0.3)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0.9)" />
            </linearGradient>

            <linearGradient id="neckGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 0, 0, 0.9)" />
              <stop offset="100%" stopColor="rgba(30, 64, 175, 0.4)" />
            </linearGradient>

            <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
              <stop offset="100%" stopColor="rgba(30, 64, 175, 1)" />
            </linearGradient>

            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
              <stop offset="50%" stopColor="rgba(30, 64, 175, 0.8)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.4)" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Floating Aura */}
        <motion.div
          className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  )
}
