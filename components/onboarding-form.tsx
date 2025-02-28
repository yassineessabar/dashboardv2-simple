"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StepZero } from "@/components/step-zero"
import { StepOne } from "@/components/step-one"
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
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const steps = [
  { id: 0, title: "Basic Info", icon: "👤" },
  { id: 1, title: "Account & Robot", icon: "🏦" },
  { id: 2, title: "Review & Submit", icon: "📝" },
]

export function OnboardingForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    identityDocument: null,
    proofOfAddress: null,
    setupChoice: "automatic",
    selectedRobot: "sigmatic-3.5",
    minimumDepositAcknowledged: true,
    consentGiven: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const updateFormData = useCallback((newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...(typeof newData === "function" ? newData(prevData) : newData),
    }))
  }, [])

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return (
          formData.fullName.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.identityDocument !== null &&
          formData.proofOfAddress !== null
        )
      case 1:
        return formData.setupChoice !== null
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    
    if (validateStep(currentStep)) {
      setIsSubmitting(true)
      
      try {
        // Optimize file handling - resize/compress images before sending if they're too large
        const optimizedFormData = new FormData()
        
        // Append text fields directly
        const textFields = ['fullName', 'email', 'setupChoice', 'selectedRobot', 'minimumDepositAcknowledged', 'consentGiven']
        textFields.forEach(key => {
          if (formData[key] !== null) {
            optimizedFormData.append(key, formData[key])
          }
        })
        
        // Handle file fields - append them directly without preprocessing for now
        // In a production app, you might want to compress images here
        if (formData.identityDocument) {
          optimizedFormData.append('identityDocument', formData.identityDocument)
        }
        
        if (formData.proofOfAddress) {
          optimizedFormData.append('proofOfAddress', formData.proofOfAddress)
        }

        // Use AbortController to set a timeout for the fetch operation
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
        
        const response = await fetch("/api/submit-account", {
          method: "POST",
          body: optimizedFormData,
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)

        // Start parsing the JSON response while we're checking the status
        const resultPromise = response.json()
        
        if (response.ok) {
          const result = await resultPromise
          console.log("Form submitted successfully:", result)
          setShowConfirmation(true)
        } else {
          const result = await resultPromise
          throw new Error(result.message || "Failed to submit form")
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        if (error.name === 'AbortError') {
          setErrorMessage("Request timed out. Please try again.")
        } else {
          setErrorMessage(error.message || "An error occurred while submitting the form")
        }
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepZero formData={formData} updateFormData={updateFormData} />
      case 1:
        return <StepOne formData={formData} updateFormData={updateFormData} />
      case 2:
        return <SummaryStep formData={formData} />
      default:
        return null
    }
  }

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto bg-white border-gray-200 shadow-xl">
        <CardContent className="p-4 sm:p-6">
          <div className="mb-6 sm:mb-8">
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${index <= currentStep ? "text-[#7497bd]" : "text-gray-400"}`}
                >
                  <span className="text-xl sm:text-2xl mb-1 sm:mb-2">{step.icon}</span>
                  <span className="text-xs sm:text-sm">{step.title}</span>
                </div>
              ))}
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
            
            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {errorMessage}
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between border-t border-gray-200 p-4 sm:p-6">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0 || isSubmitting}
            className="w-full sm:w-auto mb-2 sm:mb-0 border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={!validateStep(currentStep) || isSubmitting}
            className="w-full sm:w-auto bg-[#7497bd] hover:bg-[#5a7a9d] text-white"
          >
            {isSubmitting 
              ? "Processing..." 
              : currentStep === steps.length - 1 
                ? "Submit" 
                : "Next"
            }
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              Application Submitted
            </DialogTitle>
            <DialogDescription className="text-center">
              Thank you for submitting your application. We have received your information and will process it shortly.
              {formData.setupChoice === "automatic" && (
                <span className="block mt-2 font-semibold">
                  We will notify you once your account is ready for trading.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowConfirmation(false)
                router.push("/")
              }}
              className="w-full"
            >
              Ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}