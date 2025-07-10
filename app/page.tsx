import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedPerfumes } from "@/components/sections/featured-perfumes"
import { AIFeatures } from "@/components/sections/ai-features"
import { StatsSection } from "@/components/sections/stats-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { HorizontalProducts } from "@/components/sections/horizontal-products"
import { Footer } from "@/components/sections/footer"
import { SmokeEffect } from "@/components/effects/smoke-effect"
import { FloatingBottle } from "@/components/effects/floating-bottle"
import { ChatBot } from "@/components/chat-bot"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <SmokeEffect />
      <FloatingBottle />

      <HeroSection />
      <FeaturedPerfumes />
      <AIFeatures />
      <StatsSection />
      <HorizontalProducts />
      <TestimonialsSection />
      <Footer />

      <ChatBot />
    </div>
  )
}
