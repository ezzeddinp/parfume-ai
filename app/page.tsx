"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, ShoppingBag, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedPerfumes } from "@/components/sections/featured-perfumes"
import { AIFeatures } from "@/components/sections/ai-features"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { StatsSection } from "@/components/sections/stats-section"
import { Footer } from "@/components/sections/footer"
import { FloatingChatButton } from "@/components/ui/floating-chat-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Actions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/products" className="group">
              <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-500/40 transition-all duration-300">
                <ShoppingBag className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Shop Collection</h3>
                <p className="text-slate-400 text-sm">Browse our curated perfume selection</p>
              </div>
            </Link>

            <div
              className="group cursor-pointer"
              onClick={() => {
                const chatButton = document.querySelector("[data-chat-button]") as HTMLElement
                chatButton?.click()
              }}
            >
              <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-500/40 transition-all duration-300">
                <Bot className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">AI Consultant</h3>
                <p className="text-slate-400 text-sm">Get personalized fragrance advice</p>
              </div>
            </div>

            <Link href="/products" className="group">
              <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-500/40 transition-all duration-300">
                <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Discover</h3>
                <p className="text-slate-400 text-sm">Find your signature scent</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedPerfumes />

      {/* AI Features */}
      <AIFeatures />

      {/* Stats */}
      <StatsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Perfect Fragrance?</h2>
            <p className="text-slate-300 text-lg mb-8">
              Join thousands of satisfied customers who discovered their signature scent with our AI-powered
              recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Link href="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-500/30 text-white hover:bg-purple-600/20 bg-transparent"
                onClick={() => {
                  const chatButton = document.querySelector("[data-chat-button]") as HTMLElement
                  chatButton?.click()
                }}
              >
                <Bot className="mr-2 h-5 w-5" />
                Chat with AI
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  )
}
