"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Home,
  Sparkles,
  Crown,
  Heart,
  ShoppingBag,
  User,
  Settings,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  Zap,
  Gift,
  Bell,
  Search,
} from "lucide-react"

interface MobileSidebarProps {
  onChatOpen?: () => void
}

export default function MobileSidebar({ onChatOpen }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile && isOpen) {
        setIsOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [isOpen])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navigationItems = [
    { icon: Home, label: "Home", href: "#", badge: null },
    { icon: Sparkles, label: "Fragrances", href: "#", badge: "New" },
    { icon: Crown, label: "Premium", href: "#", badge: "VIP" },
    { icon: Gift, label: "Brands", href: "#", badge: null },
    { icon: Star, label: "Best Sellers", href: "#", badge: "Hot" },
    { icon: Heart, label: "Wishlist", href: "#", badge: "3" },
    { icon: ShoppingBag, label: "Cart", href: "#", badge: "2" },
  ]

  const accountItems = [
    { icon: User, label: "My Profile", href: "#" },
    { icon: Bell, label: "Notifications", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { icon: HelpCircle, label: "Help & Support", href: "#" },
  ]

  const contactInfo = [
    { icon: Phone, label: "+1 (555) 123-4567", type: "phone" },
    { icon: Mail, label: "hello@perfumeai.com", type: "email" },
    { icon: MapPin, label: "Perfume City, PC 12345", type: "address" },
  ]

  if (!isMobile) return null

  return (
    <>
      {/* Hamburger Menu Button */}
      <motion.div className="md:hidden" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-full p-2"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm mobile-sidebar-overlay"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-80 z-[9998] overflow-hidden mobile-sidebar-container mobile-sidebar-content"
          >
            {/* Sidebar Background with Gradient */}
            <div className="absolute inset-0 bg-black">
              <div className="absolute inset-0 bg-gradient-to-l from-blue-900/10 via-blue-800/5 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-blue-800/10" />
            </div>

            {/* Sidebar Content */}
            <div className="relative z-[9999] h-full flex flex-col">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between p-6 border-b border-gray-800/50"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-full p-2"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Sparkles className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-lg font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                      PerfumeAI
                    </h2>
                    <p className="text-xs text-gray-400">Discover Your Scent</p>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="p-6 border-b border-gray-800/30"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search fragrances..."
                    className="w-full bg-gray-900/50 border border-gray-700/50 rounded-full pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
                  />
                </div>
              </motion.div>

              {/* AI Chat Quick Access */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 border-b border-gray-800/30"
              >
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => {
                      onChatOpen?.()
                      setIsOpen(false)
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-2xl py-4 text-sm font-semibold relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <Zap className="mr-2 h-4 w-4 relative z-10" />
                    <span className="relative z-10">Ask AI Expert</span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Main Navigation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="p-6"
                >
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Navigation</h3>
                  <div className="space-y-2">
                    {navigationItems.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-800/30 transition-all duration-300 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-800/50 group-hover:bg-blue-600/20 rounded-xl p-2 transition-colors">
                            <item.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                          </div>
                          <span className="text-gray-300 group-hover:text-white font-medium transition-colors">
                            {item.label}
                          </span>
                        </div>
                        {item.badge && (
                          <motion.span
                            className={`text-xs px-2 py-1 rounded-full font-semibold ${
                              item.badge === "New" || item.badge === "Hot"
                                ? "bg-blue-600 text-white"
                                : item.badge === "VIP"
                                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black"
                                  : "bg-gray-700 text-gray-300"
                            }`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {item.badge}
                          </motion.span>
                        )}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Account Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 border-t border-gray-800/30"
                >
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Account</h3>
                  <div className="space-y-2">
                    {accountItems.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 + index * 0.05 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-gray-800/30 transition-all duration-300 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="bg-gray-800/50 group-hover:bg-blue-600/20 rounded-xl p-2 transition-colors">
                          <item.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white font-medium transition-colors">
                          {item.label}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Contact Info Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 border-t border-gray-800/50 bg-gradient-to-t from-black/50 to-transparent"
              >
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Contact</h3>
                <div className="space-y-3">
                  {contactInfo.map((contact, index) => (
                    <motion.div
                      key={contact.type}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 + index * 0.05 }}
                      className="flex items-center space-x-3 text-sm"
                    >
                      <contact.icon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-400">{contact.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Version Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 pt-4 border-t border-gray-800/30 text-center"
                >
                  <p className="text-xs text-gray-500">PerfumeAI v2.0 • Powered by AI</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute z-[9999] top-20 right-4 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
            <div className="absolute z-[9999] bottom-20 right-8 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl" />

            {/* Animated Border */}
            <motion.div
              className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent z-50"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
