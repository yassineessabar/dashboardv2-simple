"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register"
      
      // Use the minimal data needed for login
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      // Log the raw response for debugging
      const responseText = await response.text()
      
      let data
      try {
        // Try to parse the response as JSON
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", responseText)
        throw new Error("Server returned an invalid response. Please try again later.")
      }

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed")
      }

      toast({
        title: isLogin ? "Login successful" : "Registration successful",
        description: "Redirecting to dashboard...",
      })

      // Refresh the router to update the auth state
      router.refresh()
      
      // Redirect to dashboard
      router.push("/")
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
      console.error("Auth error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <>
          <Input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input 
            name="phone" 
            type="tel" 
            placeholder="Phone Number" 
            value={formData.phone} 
            onChange={handleChange} 
          />
        </>
      )}
      <Input 
        name="email" 
        type="email" 
        placeholder="Email" 
        value={formData.email} 
        onChange={handleChange} 
        required 
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Loading..." : (isLogin ? "Login" : "Register")}
      </Button>
      <p className="text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Button 
          variant="link" 
          onClick={() => setIsLogin(!isLogin)} 
          disabled={isLoading}
          className="px-1" 
          type="button"
        >
          {isLogin ? "Register" : "Login"}
        </Button>
      </p>
    </form>
  )
}