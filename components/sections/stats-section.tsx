"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Sparkles, Award, MessageCircle } from "lucide-react"

const stats = [
  { number: "50K+", label: "Happy Customers", icon: Users },
  { number: "1000+", label: "Premium Fragrances", icon: Sparkles },
  { number: "98%", label: "Satisfaction Rate", icon: Award },
  { number: "24/7", label: "AI Support", icon: MessageCircle },
]

export default function StatsSection() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })

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
    <section ref={statsRef} className="py-24 px-4 relative z-10">
      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="h-10 w-10 text-white" />
              </motion.div>
              <motion.h3
                className="text-3xl md:text-5xl font-black text-white mb-3"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
