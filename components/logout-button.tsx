"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function LogoutButton({ 
  variant = "destructive", 
  size = "default",
  className = ""
}: { 
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link", 
  size?: "default" | "sm" | "lg" | "icon",
  className?: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to log out")
      }

      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      })

      // Refresh the router to update auth state
      router.refresh()
      
      // Redirect to login
      router.push("/auth")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log out",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  )
}