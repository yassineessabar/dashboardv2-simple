"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StepOne } from "@/components/step-one"
import { StepTwo } from "@/components/step-two"
import { StepThree } from "@/components/step-three"
import { SummaryStep } from "@/components/summary-step"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

const steps = [
  { id: 0, title: "Registration", icon: "🏦" },
  { id: 1, title: "Verification", icon: "🔒" },
  { id: 2, title: "Deposit", icon: "💰" },
  { id: 3, title: "Review & Submit", icon: "📝" },
]

export function OnboardingForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    setupChoice: "manual",
    selectedRobot: "sigmatic-3.5",
    minimumDepositAcknowledged: true,
    consentGiven: true,
    personalInfoCompleted: false,
    investorProfileCompleted: false,
    documentsSubmitted: false,
    verificationComplete: false,
    depositAmount: "",
    depositProof: null,
    depositVerified: false
  })
  const [showConfirmation, setShowConfirmation] = useState(false)

  const updateFormData = useCallback((newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...(typeof newData === "function" ? newData(prevData) : newData),
    }))
  }, [])

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return true // No validation needed for step 1 now
      case 1:
        // Only allow progression if verification is complete
        return formData.verificationComplete === true
      case 2:
        // Only allow progression if deposit is verified
        return formData.depositVerified === true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateStep(currentStep)) {
      // Only show confirmation at the final step
      if (currentStep === steps.length - 1) {
        console.log("Form submitted:", formData)
        setShowConfirmation(true)
      } else {
        // Otherwise just go to the next step
        handleNext()
      }
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepOne formData={formData} updateFormData={updateFormData} />
      case 1:
        return <StepTwo formData={formData} updateFormData={updateFormData} />
      case 2:
        return <StepThree formData={formData} updateFormData={updateFormData} />
      case 3:
        return <SummaryStep formData={formData} />
      default:
        return null
    }
  }

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto bg-white border-gray-200 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#7497bd] to-[#5a7a9d] p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Trading Account Setup in 10 minutes</h1>
          <p className="text-sm opacity-90">Complete the following steps to set up your account</p>
        </div>
        <CardContent className="p-6 sm:p-8">
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${index <= currentStep ? "text-[#7497bd]" : "text-gray-400"}`}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${
                      index <= currentStep ? "bg-[#7497bd] text-white" : "bg-gray-200"
                    }`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {step.icon}
                  </motion.div>
                  <span className="text-xs sm:text-sm font-medium">{step.title}</span>
                </div>
              ))}
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#7497bd] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between border-t border-gray-200 p-6">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="w-full sm:w-auto mb-2 sm:mb-0 border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            type="button"
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={!validateStep(currentStep)}
            className={`w-full sm:w-auto ${validateStep(currentStep) ? "bg-[#7497bd] hover:bg-[#5a7a9d]" : "bg-gray-300"} text-white`}
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              Application Submitted
            </DialogTitle>
            <DialogDescription className="text-center">
              Thank you for submitting your application. We will review your information and verify your documents.
              <motion.span
                className="block mt-2 font-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                We will notify you once your account is fully set up and ready for trading.
              </motion.span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowConfirmation(false)
                router.push("/")
              }}
              className="w-full bg-[#7497bd] hover:bg-[#5a7a9d] text-white"
            >
              Go to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}