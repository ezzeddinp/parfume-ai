"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import MobileSidebar from "@/components/ui/mobile-sidebar"

interface HeaderProps {
  onChatOpen?: () => void
}

export default function Header({ onChatOpen }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-40 border-b border-gray-800/30 backdrop-blur-xl bg-black/20">
      <div className="container mx-auto px-4 py-4">
        <motion.div
          className="flex items-center justify-between"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Sparkles className="h-8 w-8 text-blue-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              PerfumeAI
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["Home", "Fragrances", "Brands", "About", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group font-medium"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -2 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Mobile Sidebar */}
          <MobileSidebar onChatOpen={onChatOpen} />
        </motion.div>
      </div>
    </header>
  )
}
