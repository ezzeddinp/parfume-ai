"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuthStore } from "@/lib/store/auth"
import { useCartStore } from "@/lib/store/cart"
import { createClient } from "@/lib/supabase/client"
import { AuthModal } from "@/components/auth/auth-modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, LogOut, Sparkles } from "lucide-react"
import { toast } from "sonner"

export function Header() {
  const { user, loading } = useAuthStore()
  const { getTotalItems } = useCartStore()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const supabase = createClient()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error("Failed to logout")
    }
  }

  const totalItems = getTotalItems()

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                PerfumeAI
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/products" className="text-white hover:text-purple-400 transition-colors">
                Products
              </Link>
              <Link href="/about" className="text-white hover:text-purple-400 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-white hover:text-purple-400 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative text-white hover:text-purple-400">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Auth */}
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse" />
              ) : user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-300 hidden sm:block">{user.email?.split("@")[0]}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:text-red-400">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="text-white hover:text-purple-400"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}
