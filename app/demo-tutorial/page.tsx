"use client"

import { useState } from "react"
import { DemoTutorial } from "@/components/demo-tutorial"
import { useRouter } from "next/navigation"

export default function DemoTutorialPage() {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      // Navigate back to home page when closed
      router.push("/")
    }
  }
  
  return (
    <div className="min-h-screen">
      <DemoTutorial open={open} onOpenChange={handleOpenChange} />
    </div>
  )
}