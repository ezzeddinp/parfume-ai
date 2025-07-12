import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/sections/header"
import SmokeEffect from "@/components/effects/smoke-effect"
import FloatingBottle from "@/components/effects/floating-bottle"
import Footer from "@/components/sections/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Perfume AI Chatbot",
  description: "AI-powered perfume consultant and fragrance specialist",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                {/* Clean Black-Blue Gradient Background */}
                <div className="fixed inset-0 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-blue-900" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
          
  
          
                {/* Smokey Effect */}
                <SmokeEffect />
          
                {/* Header with Mobile Sidebar */}
                <Header/>
          {children}
          
       
                <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
