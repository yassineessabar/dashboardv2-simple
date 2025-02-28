"use client"

import { useState } from "react"
import { Rocket, TrendingUp, Shield, Info, X } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface RobotSelectionProps {
  selectedRobot: string
  onSelect: (value: string) => void
}

export function RobotSelection({ selectedRobot, onSelect }: RobotSelectionProps) {
  const [showInfo, setShowInfo] = useState(false)

  const robots = [
    {
      id: "sigmatic-3.5",
      name: "Sigmatic 3.5",
      description: "Our latest and most advanced trading robot",
      icon: Rocket,
    },
    {
      id: "sigmatic-3.0",
      name: "Sigmatic 3.0",
      description: "Proven performance with a track record of success",
      icon: TrendingUp,
    },
    {
      id: "sigmatic-2.5",
      name: "Sigmatic 2.5",
      description: "Reliable and stable, perfect for beginners",
      icon: Shield,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Step 3: Select Your Trading Robot</h2>
          <p className="mt-2 text-gray-600 text-lg">
            Choose the Sigmatic Trading robot that best fits your trading goals and risk tolerance.
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-900"
          onClick={() => setShowInfo(true)}
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>

      <RadioGroup value={selectedRobot} onValueChange={onSelect} className="space-y-4">
        {robots.map((robot) => (
          <label
            key={robot.id}
            className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            <RadioGroupItem value={robot.id} id={robot.id} />
            <div className="flex items-center space-x-4">
              <robot.icon className="h-8 w-8 text-[#7497bd]" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{robot.name}</h3>
                <p className="text-gray-600">{robot.description}</p>
              </div>
            </div>
          </label>
        ))}
      </RadioGroup>

      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">About Our Trading Robots</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0 rounded-full"
                onClick={() => setShowInfo(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              Sigmatic Trading offers a range of advanced trading robots, each designed to cater to different trading
              styles and risk appetites. Our robots use sophisticated algorithms to analyze market trends and execute
              trades automatically.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold">Sigmatic 3.5:</h4>
                <p className="text-gray-600">
                  Our most advanced robot, featuring AI-driven decision making and adaptive strategies.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Sigmatic 3.0:</h4>
                <p className="text-gray-600">A balanced robot with a proven track record, suitable for most traders.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Sigmatic 2.5:</h4>
                <p className="text-gray-600">A more conservative robot, ideal for those new to algorithmic trading.</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

