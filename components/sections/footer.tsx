"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, MapPin, Phone, Mail, MessageCircle, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900/50 to-black border-t border-gray-800/50 relative z-10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="h-8 w-8 text-blue-400" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                PerfumeAI
              </h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Discover your perfect fragrance with AI-powered recommendations. Experience the future of perfume
              discovery.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="bg-gray-800/50 hover:bg-blue-600 p-3 rounded-full transition-colors backdrop-blur-sm border border-gray-700/30"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-5 w-5 text-gray-400 hover:text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Fragrances", "Brands", "New Arrivals", "Best Sellers", "Sale"].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-bold mb-6 text-lg">Customer Service</h4>
            <ul className="space-y-3">
              {["Contact Us", "FAQ", "Shipping Info", "Returns", "Size Guide", "Track Order"].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-white font-bold mb-6 text-lg">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">123 Fragrance St, Perfume City, PC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">hello@perfumeai.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">24/7 AI Support</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800/50 pt-8 mb-8"
        >
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-white mb-2">Stay Updated</h4>
            <p className="text-gray-400">Subscribe to get the latest fragrance releases and exclusive offers</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-gray-800/50 border border-gray-700/50 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none backdrop-blur-sm"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-full px-8 py-4 font-semibold">
                Subscribe
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 PerfumeAI. All rights reserved. Powered by AI technology.
          </p>
          <div className="flex space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors font-medium"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
