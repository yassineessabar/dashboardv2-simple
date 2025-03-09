"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function StepZero({ formData, updateFormData }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-8"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div className="text-center" variants={fadeInUp}>
        <h2 className="text-3xl font-bold mb-4 text-[#7497bd]">Welcome to Sigmatic Trading</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Let's get you started on your trading journey. We'll guide you through setting up your account with XM
          Markets.
        </p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#7497bd]">Basic Information</CardTitle>
            <CardDescription>Please tell us your name to personalize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData({ fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-[#7497bd]"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

