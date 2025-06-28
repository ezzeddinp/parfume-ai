"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import ChatBot from "@/components/chat-bot"
import HeroSection from "@/components/sections/hero-section"
import AIFeatures from "@/components/sections/ai-features"
import FeaturedPerfumes from "@/components/sections/featured-perfumes"
import TestimonialsSection from "@/components/sections/testimonials-section"
import StatsSection from "@/components/sections/stats-section"
import HorizontalProducts from "@/components/sections/horizontal-products"
import Footer from "@/components/sections/footer"

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <HeroSection />
      <AIFeatures />
      <FeaturedPerfumes />
      <HorizontalProducts />
      <TestimonialsSection />
      <StatsSection />
      <Footer />

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg z-50 transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Bot */}
      <ChatBot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </main>
  )
}
