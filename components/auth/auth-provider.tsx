"use client"

import type React from "react"
import { useEffect } from "react"
import { useAuthStore } from "@/lib/store/auth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setLoading } = useAuthStore()

  useEffect(() => {
    // Simple auth initialization without Supabase
    setLoading(false)
  }, [setLoading])

  return <>{children}</>
}
