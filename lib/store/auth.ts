import { create } from "zustand"
import type { User } from "@supabase/supabase-js"

interface AuthStore {
  user: User | null
  loading: boolean
  showAuthModal: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setShowAuthModal: (show: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  showAuthModal: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setShowAuthModal: (showAuthModal) => set({ showAuthModal }),
}))
