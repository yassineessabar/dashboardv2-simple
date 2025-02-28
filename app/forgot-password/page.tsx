"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Here you would typically call your API to initiate the password reset process
    // For this example, we'll simulate an API call with a timeout
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Reset link sent",
        description: "If an account exists for this email, you will receive a password reset link.",
      })
      setEmail("")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full max-w-md m-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#7497bd] hover:bg-[#5a7a9d] text-white" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Reset Link"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/auth" className="text-sm text-[#7497bd] hover:text-[#5a7a9d] flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

