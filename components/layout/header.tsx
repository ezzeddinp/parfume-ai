"use client"

import Link from "next/link"
import { ShoppingCart, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store/auth"
import { useCartStore } from "@/lib/store/cart"
import { AuthModal } from "@/components/auth/auth-modal"

export function Header() {
  const { user, setShowAuthModal, logout } = useAuthStore()
  const { getTotalItems } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            PerfumeAI
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
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

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:text-purple-400">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm">Hi, {user.name || user.email}</span>
                <Button variant="ghost" size="icon" onClick={logout} className="text-white hover:text-red-400">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <AuthModal />
    </>
  )
}
