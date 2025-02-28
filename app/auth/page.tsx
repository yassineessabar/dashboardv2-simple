"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("+1")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLogin) {
      // Simulate a successful sign-up
      localStorage.setItem("showDemoTutorial", "true")
      router.push("/") // Redirect to dashboard
    } else {
      // Handle login logic here
      console.log("Login submitted")
      // Add login logic and redirection here
      router.push("/") // Redirect to dashboard after successful login
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">{isLogin ? "Welcome back" : "Create an account"}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? "Sign in to access your account" : "Sign up to start trading"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input id="name" name="name" type="text" required className="pl-10" placeholder="John Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="+1" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+1">🇺🇸 +1</SelectItem>
                        <SelectItem value="+44">🇬🇧 +44</SelectItem>
                        <SelectItem value="+91">🇮🇳 +91</SelectItem>
                        {/* Add more country codes as needed */}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="flex-1 ml-2"
                      placeholder="123-456-7890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input id="email" name="email" type="email" required className="pl-10" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
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
              <Button type="submit" className="w-full bg-[#7497bd] hover:bg-[#5a7a9d] text-white">
                {isLogin ? "Sign In" : "Sign Up"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link href="/forgot-password" className="text-sm text-[#7497bd] hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-[#7497bd] hover:text-[#5a7a9d]">
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>

      {/* Right side - Image */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579226905180-636b76d96082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')",
        }}
      >
        <div className="flex items-center justify-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white">Start Your Trading Journey</h2>
            <p className="mt-3 text-lg text-gray-300">
              Join our platform to access global markets and trade with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

