'use client'

import { signup } from '@/app/(auth)/actions'
import { useState, useTransition } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSignup = async (formData: FormData) => {
    setErrorMsg(null)
    const password = formData.get("password") as string
    const confirm = formData.get("confirm") as string

    if (password !== confirm) {
      setErrorMsg("Passwords do not match.")
      return
    }

    startTransition(async () => {
      try {
        await signup(formData)
        window.location.href = "/"
      } catch (err: any) {
        setErrorMsg(err.message || "Sign up failed. Please try again.")
      }
    })
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        className="w-full max-w-md bg-gradient-to-br from-black via-black to-blue-900/10 text-white rounded-2xl shadow-xl p-8 space-y-6 border border-blue-900/20"
        action={handleSignup}
      >
        <h1 className="text-2xl font-bold text-center text-white">
          Create an Account
        </h1>

        {errorMsg && (
          <div className="bg-red-500/10 text-red-400 text-sm px-4 py-2 rounded-md border border-red-500/40">
            {errorMsg}
          </div>
        )}

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-700/30"
          />
        </div>

        {/* Password */}
        <div className="space-y-2 relative">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-700/30"
          />
          <button
            title='Toggle Password Visibility'
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[34px] right-3 text-zinc-400 hover:text-white"
          >

          </button>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2 relative">
          <label htmlFor="confirm" className="block text-sm font-medium">
            Confirm Password
          </label>
          <input
            id="confirm"
            name="confirm"
            type={showConfirm ? 'text' : 'password'}
            required
            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-700/30"
          />
          <button
            title='Toggle Confirm Password Visibility'
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute top-[34px] right-3 text-zinc-400 hover:text-white"
          >
          </button>
        </div>

        {/* Submit */}
        <div>
          <button
            disabled={isPending}
            className="w-full bg-blue-800/90 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
          >
            {isPending ? "Signing up..." : "Sign up"}
          </button>
        </div>

        <p className="text-center text-xs text-zinc-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log in
          </a>
        </p>

        <p className="text-center text-xs text-zinc-500 mt-2">
          By signing up, you agree to our{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>.
        </p>
      </form>
    </div>
  )
}
