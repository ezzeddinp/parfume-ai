"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, ShoppingBag, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts } from "@/lib/database"
import { ProductGrid } from "@/components/products/product-grid"
import { ChatBot } from "@/components/chat-bot"
import { SmokeEffect } from "@/components/effects/smoke-effect"
import { FloatingBottle } from "@/components/effects/floating-bottle"

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <SmokeEffect />
      <FloatingBottle />

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Discover Your Perfect Fragrance
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            AI-powered perfume recommendations tailored to your unique preferences and personality
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
            >
              <Link href="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 text-lg px-8 py-3 bg-transparent"
              onClick={() => {
                const chatButton = document.querySelector("[data-chat-button]") as HTMLElement
                chatButton?.click()
              }}
            >
              <Bot className="mr-2 h-5 w-5" />
              Ask AI Expert
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose PerfumeAI?</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Experience the future of fragrance discovery with our AI-powered platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-slate-800/30 border border-purple-500/20">
            <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">AI Recommendations</h3>
            <p className="text-slate-300">
              Get personalized perfume suggestions based on your preferences and personality
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-slate-800/30 border border-purple-500/20">
            <ShoppingBag className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Premium Collection</h3>
            <p className="text-slate-300">Curated selection of luxury and niche fragrances from top brands worldwide</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-slate-800/30 border border-purple-500/20">
            <Bot className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Expert Consultation</h3>
            <p className="text-slate-300">
              Chat with our AI fragrance expert for personalized advice and recommendations
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Fragrances</h2>
            <p className="text-slate-300 text-lg">Discover our most popular and highly-rated perfumes</p>
          </div>

          <ProductGrid products={featuredProducts.slice(0, 8)} />

          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 bg-transparent"
            >
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* Chat Bot */}
      <ChatBot />
    </div>
  )
}
