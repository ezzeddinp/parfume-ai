"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuthStore } from "@/lib/store/auth"
import { toast } from "sonner"

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, setUser, rememberMe, setRememberMe } = useAuthStore()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"email" | "otp">("email")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Please enter your email")
      return
    }

    setIsLoading(true)

    // Simulate OTP sending (replace with actual implementation)
    try {
      // In real implementation, you would call your OTP service here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStep("otp")
      toast.success("OTP sent to your email!")
    } catch (error) {
      toast.error("Failed to send OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP")
      return
    }

    setIsLoading(true)

    try {
      // Simulate OTP verification (replace with actual implementation)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, accept any 6-digit code
      if (otp.length === 6) {
        const user = { email, name: email.split("@")[0] }
        setUser(user)
        setShowAuthModal(false)
        toast.success("Successfully logged in!")

        // Reset form
        setEmail("")
        setOtp("")
        setStep("email")
      } else {
        toast.error("Invalid OTP")
      }
    } catch (error) {
      toast.error("Failed to verify OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setShowAuthModal(false)
    setStep("email")
    setEmail("")
    setOtp("")
  }

  return (
    <Dialog open={showAuthModal} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-white text-center">
            {step === "email" ? "Sign In / Sign Up" : "Verify OTP"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {step === "email" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-slate-300">
                  Remember me for 30 days
                </Label>
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-white">
                  Enter 6-digit OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="bg-slate-800 border-slate-700 text-white text-center text-2xl tracking-widest"
                  maxLength={6}
                />
                <p className="text-sm text-slate-400 text-center">OTP sent to {email}</p>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("email")}
                  className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Back
                </Button>
                <Button
                  onClick={handleVerifyOTP}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
