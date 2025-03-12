"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

function AuthPageContent() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("+44")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Check URL query parameter for mode on component mount
  useEffect(() => {
    const mode = searchParams.get('mode')
    if (mode === 'signup') {
      setIsLogin(false)
    } else if (mode === 'signin') {
      setIsLogin(true)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        // Handle login
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Login failed")
        }

        toast({
          title: "Login successful",
          description: "Welcome back!",
        })

        router.push("/")
        router.refresh()
      } else {
        // Handle registration
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phone: `${countryCode}${phoneNumber}`,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Registration failed")
        }

        toast({
          title: "Registration successful",
          description: "Your account has been created.",
        })

        // Auto login after registration
        const loginResponse = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })

        if (loginResponse.ok) {
          router.push("/get-started")
          router.refresh()
        } else {
          // If auto-login fails, redirect to login
          router.push('/auth?mode=signin')
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Authentication failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Toggle mode and update URL
  const toggleMode = () => {
    const newMode = !isLogin
    setIsLogin(!isLogin)
    router.push(`/auth?mode=${newMode ? 'signin' : 'signup'}`)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
        {/* Sigmatic Logo - Visible on all screen sizes */}
        <div className="flex justify-center mb-6">
          <Link href="https://www.sigmatic-trading.com/" target="_blank">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/67984b56824e29d4d17f7d98_image__1_-removebg-preview-p-500-dCWeUC1cV6JJXGdpegIPj1wRHoCEgn.png"
              alt="Sigmatic Trading Logo"
              className="h-12 sm:h-16 w-auto object-contain"
            />
          </Link>
        </div>
        
        <div className="max-w-md w-full mx-auto space-y-6 sm:space-y-8">
          <div className="text-center">
            <h2 className="mt-2 sm:mt-6 text-2xl sm:text-3xl font-bold text-gray-900">{isLogin ? "Welcome back" : "Create an account"}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? "Sign in to access your account" : "Sign up to start trading with AI"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="pl-10"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">WhatsApp Number</Label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-[100px] min-w-[100px] sm:w-[120px]">
                        <SelectValue placeholder="+44" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+44">🇬🇧 +44</SelectItem>
                        <SelectItem value="+1">🇺🇸 +1</SelectItem>
                        <SelectItem value="+91">🇮🇳 +91</SelectItem>
                        <SelectItem value="+61">🇦🇺 +61</SelectItem>
                        <SelectItem value="+33">🇫🇷 +33</SelectItem>
                        <SelectItem value="+49">🇩🇪 +49</SelectItem>
                        <SelectItem value="+81">🇯🇵 +81</SelectItem>
                        <SelectItem value="+86">🇨🇳 +86</SelectItem>
                        <SelectItem value="+34">🇪🇸 +34</SelectItem>
                        <SelectItem value="+52">🇲🇽 +52</SelectItem>
                        <SelectItem value="+55">🇧🇷 +55</SelectItem>
                        <SelectItem value="+82">🇰🇷 +82</SelectItem>
                        <SelectItem value="+39">🇮🇹 +39</SelectItem>
                        <SelectItem value="+7">🇷🇺 +7</SelectItem>
                        <SelectItem value="+65">🇸🇬 +65</SelectItem>
                        <SelectItem value="+971">🇦🇪 +971</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="flex-1 ml-2"
                      placeholder="07291711142"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    Processing...
                  </span>
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Sign Up"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <Link href="/forgot-password" className="text-sm text-[#7497bd] hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>

        <p className="mt-6 sm:mt-10 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleMode} className="font-semibold text-[#7497bd] hover:text-[#5a7a9d]">
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>

      {/* Right side - Video Background */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67a7c67b1ef7e64ca306f7f7_LIQUID_ART_by_gleb-transcode.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="flex items-center justify-center h-full px-20 bg-gray-900 bg-opacity-40 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white">Trade Smarter, Earn Consistently</h2>
            <p className="mt-3 text-lg text-gray-300">
              Let Sigmatic's AI do the work—analyze, trade, and grow your profits effortlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  )
}