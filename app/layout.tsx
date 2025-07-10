import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Header } from "@/components/layout/header"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PerfumeAI - AI-Powered Fragrance Discovery",
  description: "Discover your perfect fragrance with AI-powered recommendations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "rgb(30 41 59)",
                color: "white",
                border: "1px solid rgb(147 51 234 / 0.2)",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
