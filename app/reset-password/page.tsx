"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Lock, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

// Wrapper component that has access to search params
function ResetPasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  
  const token = searchParams.get("token")
  
  // If no token is provided, show an error
  if (!token) {
    return (
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Invalid Link</h2>
        <p className="mt-2 text-sm text-gray-600">
          This password reset link is invalid or has expired. Please request a new password reset link.
        </p>
        <div className="mt-6">
          <Link
            href="/forgot-password"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#7497bd] hover:bg-[#5a7a9d]"
          >
            Request New Link
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate passwords
    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      return
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      })
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }
      
      toast({
        title: "Success",
        description: "Your password has been reset successfully. You can now log in with your new password.",
      })
      
      // Redirect to login page after successful password reset
      setTimeout(() => {
        router.push("/auth")
      }, 2000)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reset password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
        <p className="mt-2 text-sm text-gray-600">
          Create a new password for your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="password">New Password</Label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="pl-10 pr-10"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              className="pl-10"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
        </div>

        <Button type="submit" className="w-full bg-[#7497bd] hover:bg-[#5a7a9d] text-white" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Resetting...
            </span>
          ) : (
            <>
              Reset Password
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <Link href="/auth" className="text-sm text-[#7497bd] hover:text-[#5a7a9d] flex items-center justify-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Link>
      </div>
    </>
  )
}

// Main component that wraps the form with Suspense
export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full max-w-md m-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}