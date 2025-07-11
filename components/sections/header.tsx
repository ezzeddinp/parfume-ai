"use client"

import { logout } from "@/app/(auth)/actions"
import { useEffect, useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import MobileSidebar from "@/components/ui/mobile-sidebar"
import { supabase } from "@/utils/supabase/client"

export default function Header({ onChatOpen }: { onChatOpen?: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      setIsLoggedIn(!!data.session)
    }

    checkSession()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  return (
    <header className="fixed top-0 w-full z-30 border-b border-gray-800/30 bg-black">
      <div className="container mx-auto px-4 py-2">
        <motion.div
          className="flex items-center justify-between"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Logo */}
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

          {/* Nav + Auth Button */}
          <nav className="hidden md:flex items-center space-x-8 text-sm">
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

            {isLoggedIn ? (
              <motion.button
                onClick={() =>
                  startTransition(async () => {
                    await logout()
                    window.location.href = "/"
                  })
                }
                disabled={isPending}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-red-900 hover:bg-red-800 text-white font-semibold px-4 py-1.5 rounded-xl shadow-md hover:shadow-red-500/40 transition duration-300 text-sm"
              >
                Logout
              </motion.button>
            ) : (
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-4 py-1.5 rounded-xl shadow-md hover:shadow-blue-500/40 transition duration-300 text-sm"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu */}
          <MobileSidebar onChatOpen={onChatOpen} />
        </motion.div>
      </div>
    </header>
  )
}
