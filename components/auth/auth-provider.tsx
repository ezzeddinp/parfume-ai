"use client"

import type React from "react"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuthStore } from "@/lib/store/auth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore()
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)

      // Auto-refresh session for remember me users
      if (event === "TOKEN_REFRESHED" && session?.user) {
        console.log("Session refreshed automatically")
      }
    })

    return () => subscription.unsubscribe()
  }, [setUser, setLoading, supabase.auth])

  return <>{children}</>
}
