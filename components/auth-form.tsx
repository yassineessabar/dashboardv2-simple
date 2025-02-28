"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/router"
import { register, login } from "../services/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    country: "",
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let response
      if (isLogin) {
        response = await login({ email: formData.email, password: formData.password })
      } else {
        response = await register(formData)
      }
      localStorage.setItem("token", response.data.token)
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      })
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
          <Input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <Input
            name="dateOfBirth"
            type="date"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <Input name="country" type="text" placeholder="Country" value={formData.country} onChange={handleChange} />
        </>
      )}
      <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" className="w-full">
        {isLogin ? "Login" : "Register"}
      </Button>
      <p className="text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </Button>
      </p>
    </form>
  )
}

