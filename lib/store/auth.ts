import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/lib/types"

interface AuthStore {
  user: User | null
  isLoading: boolean
  showAuthModal: boolean
  rememberMe: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setShowAuthModal: (show: boolean) => void
  setRememberMe: (remember: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      showAuthModal: false,
      rememberMe: false,

      setUser: (user) => set({ user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      setShowAuthModal: (showAuthModal) => set({ showAuthModal }),
      setRememberMe: (rememberMe) => set({ rememberMe }),

      logout: () => set({ user: null, showAuthModal: false }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        rememberMe: state.rememberMe,
      }),
    },
  ),
)
