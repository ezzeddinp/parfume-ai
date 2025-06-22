"use client"

import { useState } from "react"
import Header from "@/components/sections/header"
import HeroSection from "@/components/sections/hero-section"
import HorizontalProducts from "@/components/sections/horizontal-products"
import StatsSection from "@/components/sections/stats-section"
import FeaturedPerfumes from "@/components/sections/featured-perfumes"
import AIFeatures from "@/components/sections/ai-features"
import TestimonialsSection from "@/components/sections/testimonials-section"
import Footer from "@/components/sections/footer"
import ChatBot from "@/components/chat-bot"
import FloatingChatButton from "@/components/ui/floating-chat-button"
import SmokeEffect from "@/components/effects/smoke-effect"
import FloatingBottle from "@/components/effects/floating-bottle"

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleChatOpen = () => {
    setIsChatOpen(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Clean Black-Blue Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Floating Perfume Bottle */}
      <FloatingBottle />

      {/* Smokey Effect */}
      <SmokeEffect />

      {/* Header with Mobile Sidebar */}
      <Header onChatOpen={handleChatOpen} />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection onChatOpen={handleChatOpen} />
        <HorizontalProducts />
        <StatsSection />
        <FeaturedPerfumes />
        <AIFeatures />
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Chat Components */}
      <FloatingChatButton isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
      <ChatBot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </div>
  )
}
