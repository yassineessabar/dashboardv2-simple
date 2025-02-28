"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { User, ArrowRight, Globe, ShieldCheck, Zap, CheckCircle } from "lucide-react"
import Image from "next/image"

export function StepOne({ formData, updateFormData }) {
  const [setupChoice, setSetupChoice] = useState("automatic")
  const [minimumDepositAcknowledged, setMinimumDepositAcknowledged] = useState(true)
  const [consentGiven, setConsentGiven] = useState(setupChoice === "automatic")

  useEffect(() => {
    if (!formData.setupChoice) {
      updateFormData({
        setupChoice: "automatic",
        selectedRobot: "sigmatic-3.5",
        minimumDepositAcknowledged: true,
        consentGiven: true,
      })
    }
    setConsentGiven(setupChoice === "automatic")
  }, [formData.setupChoice, updateFormData, setupChoice])

  const handleSetupChoice = useCallback(
    (choice: string) => {
      setSetupChoice(choice)
      updateFormData((prevData) => ({
        ...prevData,
        setupChoice: choice,
        selectedRobot: "sigmatic-3.5",
        consentGiven: choice === "automatic",
      }))
    },
    [updateFormData],
  )

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <motion.div className="max-w-3xl mx-auto space-y-8 py-6" initial="initial" animate="animate" variants={fadeInUp}>
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-3xl font-bold text-[#7497bd] tracking-tight">Account Setup</h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          XM Global is our recommended broker for Sigmatic Trading.
        </p>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Choose your preferred method to set up your XM Global account and start trading.
        </p>
      </div>

      <Card className="shadow-xl border-0 overflow-hidden">
        <CardContent className="p-8">
          <RadioGroup onValueChange={handleSetupChoice} value={setupChoice} className="grid sm:grid-cols-2 gap-6">
            {[
              {
                value: "automatic",
                icon: User,
                title: "Automatic Setup",
                description: "We'll create and verify your account for you",
              },
              {
                value: "manual",
                icon: ArrowRight,
                title: "Manual Setup",
                description: "Set up your own account on XM Global's website",
              },
            ].map((option) => (
              <motion.div
                key={option.value}
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                <Label
                  htmlFor={option.value}
                  className="flex flex-col items-center justify-center p-6 h-full border-2 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gray-50 peer-data-[state=checked]:border-[#7497bd] peer-data-[state=checked]:bg-blue-50"
                >
                  <option.icon className="h-12 w-12 mb-4 text-[#7497bd]" />
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{option.title}</h3>
                  <p className="text-gray-600 text-center">{option.description}</p>
                </Label>
              </motion.div>
            ))}
          </RadioGroup>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="minimumDeposit"
                checked={minimumDepositAcknowledged}
                onCheckedChange={(checked) => {
                  setMinimumDepositAcknowledged(checked as boolean)
                  updateFormData((prevData) => ({
                    ...prevData,
                    minimumDepositAcknowledged: checked as boolean,
                  }))
                }}
                className="mt-1"
              />
              <label htmlFor="minimumDeposit" className="text-gray-700 text-base leading-relaxed">
                I acknowledge the minimum trading deposit of 650 USD. (Optional)
              </label>
            </div>
          </div>

          {setupChoice === "automatic" && (
            <motion.div
              className="mt-8 p-6 bg-blue-50 rounded-xl"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="consent"
                  checked={consentGiven}
                  onCheckedChange={(checked) => {
                    setConsentGiven(checked as boolean)
                    updateFormData((prevData) => ({
                      ...prevData,
                      consentGiven: checked as boolean,
                    }))
                  }}
                />
                <label htmlFor="consent" className="text-gray-700 text-lg leading-relaxed">
                  I consent to Sigmatic Trading creating and verifying my XM Global account.
                </label>
              </div>
            </motion.div>
          )}

          {setupChoice === "manual" && (
            <motion.div className="mt-8 text-center" variants={fadeInUp} initial="initial" animate="animate">
              <Button
                onClick={() => window.open("https://www.xm.com/register", "_blank")}
                className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300"
              >
                Go to XM Global Registration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="mt-4 text-sm text-gray-600 italic">
                * Please note: When setting up your account manually, you will need to ensure compliance and
                successfully pass the risk knowledge test.
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <motion.div
        className="bg-gradient-to-r from-[#7497bd] to-[#5a7a9d] rounded-xl overflow-hidden shadow-xl"
        variants={fadeInUp}
      >
        <div className="p-8 flex flex-col sm:flex-row justify-between items-center">
          <h3 className="text-3xl font-bold text-white mb-4 sm:mb-0">Why Choose XM Global?</h3>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Df6oWaVYWM8Qm88wys1zvoGCJrb7WX.png"
            alt="XM Global Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>
        <div className="bg-white p-8 grid sm:grid-cols-2 gap-6">
          {[
            { icon: Globe, title: "Global Reach", description: "Access markets worldwide" },
            { icon: ShieldCheck, title: "Secure Platform", description: "Advanced security measures" },
            { icon: Zap, title: "Fast Execution", description: "Lightning-fast trade execution" },
            { icon: CheckCircle, title: "Legally Regulated", description: "Compliant with financial regulations" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 transition-all duration-300 hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <feature.icon className="h-8 w-8 text-[#7497bd] flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg mb-1 text-gray-800">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

