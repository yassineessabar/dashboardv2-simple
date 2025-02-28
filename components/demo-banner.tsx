"use client"

import { useState } from "react"
import { PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DemoTutorial } from "@/components/demo-tutorial"

export function DemoBanner() {
  const [showDemoTutorial, setShowDemoTutorial] = useState(false)

  return (
    <>
      <div className="bg-[#7497bd] text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <PlayCircle className="h-8 w-8" />
            <div>
              <h3 className="font-semibold text-lg">Try Sigmatic Demo</h3>
              <p className="text-sm opacity-90">Experience our trading platform risk-free</p>
            </div>
          </div>
          <Button onClick={() => setShowDemoTutorial(true)} className="bg-white text-[#7497bd] hover:bg-gray-100">
            Start Demo
          </Button>
        </div>
      </div>
      <DemoTutorial open={showDemoTutorial} onOpenChange={setShowDemoTutorial} />
    </>
  )
}

