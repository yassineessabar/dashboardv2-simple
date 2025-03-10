"use client"

import { useState, useCallback, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StepZero } from "@/components/step-zero"
import { StepOne } from "@/components/step-one"
import { StepTwo } from "@/components/step-two"
import { StepThree } from "@/components/step-three"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { CheckCircle, ChevronLeft, ChevronRight, User, Mail, LockKeyhole, Rocket } from "lucide-react"
import { useRouter } from "next/navigation"

const steps = [
  { id: 0, title: "Welcome", icon: <Rocket className="h-5 w-5" /> },
  { id: 1, title: "Registration", icon: <User className="h-5 w-5" /> },
  { id: 2, title: "Verification", icon: <Mail className="h-5 w-5" /> },
  { id: 3, title: "Deposit", icon: <LockKeyhole className="h-5 w-5" /> },
]

export function OnboardingForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
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
    depositVerified: false,
    showTrustIndicators: true
  })
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sessionUser, setSessionUser] = useState(null)

  // Fetch the current user session when component mounts
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await fetch("/api/auth/session")
        if (response.ok) {
          const data = await response.json()
          setSessionUser(data.user)
        } else {
          console.error("Failed to fetch user session")
        }
      } catch (error) {
        console.error("Error fetching user session:", error)
      }
    }

    fetchUserSession()
  }, [])

  const updateFormData = useCallback((newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...(typeof newData === "function" ? newData(prevData) : newData),
    }))
  }, [])

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return true // No validation needed for step 0
      case 1:
        return true // No validation needed for step 1
      case 2:
        // Modified to allow progression without requiring verification to be complete
        return true
      case 3:
        // Always allow submission on the final step
        return true
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
      // We're on the last step (Deposit - index 3)
      if (currentStep === steps.length - 1) {
        if (isSubmitting) return // Prevent multiple submissions
        
        setIsSubmitting(true)
        
        try {
          // Get user name from session if available, fallback to form data or default
          const userName = sessionUser?.name || sessionUser?.email 
          
          // Use the API route to send the email
          const response = await fetch("/api/submit-form", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: userName,
              email: "essabar.yassine@gmail.com",
              formData: formData,
              subject: "New FORM Registration"
            }),
          })

          if (!response.ok) {
            console.error("Error response from server:", await response.text())
            throw new Error("Failed to submit form")
          }
          
          console.log("Form submitted successfully")
        } catch (error) {
          console.error("Error submitting form:", error)
        } finally {
          // Show confirmation dialog regardless of email success
          setShowConfirmation(true)
          setIsSubmitting(false)
        }
      } else {
        // Otherwise just go to the next step
        handleNext()
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
        return <StepTwo formData={formData} updateFormData={updateFormData} />
      case 3:
        return <StepThree formData={formData} updateFormData={updateFormData} />
      default:
        return null
    }
  }

  const isLastStep = currentStep === steps.length - 1

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left sidebar with progress indicators - Hidden on mobile */}
      <div className="hidden md:block md:w-1/4 bg-gray-50 p-6 border-r border-gray-200">
        <div className="flex items-center mb-10">
          <div className="h-8 w-8">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 5L21 9L12 13L3 9Z" fill="#333" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 14L12 18L21 14" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-semibold ml-2 text-gray-900">Trading Setup</h1>
        </div>
        
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className={`
                flex items-center justify-center h-10 w-10 rounded-full shrink-0
                ${idx < currentStep ? 'bg-green-500 text-white' : 
                  idx === currentStep ? 'bg-gray-900 text-white ring-4 ring-gray-200' : 
                  'bg-gray-200 text-gray-500'}
              `}>
                {idx < currentStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  step.icon
                )}
              </div>
              <div className="flex flex-col">
                <h3 className={`text-sm font-medium ${idx <= currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.title}
                </h3>
                <p className={`text-xs ${idx <= currentStep ? 'text-gray-600' : 'text-gray-400'}`}>
                  {idx === 0 && "Get started with trading"}
                  {idx === 1 && "Create your broker account"}
                  {idx === 2 && "Verify your identity"}
                  {idx === 3 && "Fund your account"}
                </p>
                {idx !== steps.length - 1 && (
                  <div className={`ml-5 h-10 w-px mt-2 ${idx < currentStep ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-6 left-6 hidden md:block">
          <Button variant="outline" className="text-gray-600" onClick={() => router.push("/")}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to home
          </Button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 rounded-none border-0 shadow-none">
          {/* Main content */}
          <div className="p-6 md:p-10 overflow-auto flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Progress indicator for mobile */}
              <div className="flex justify-between mb-8 md:hidden">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className={`
                      flex items-center justify-center h-8 w-8 rounded-full
                      ${idx < currentStep ? 'bg-green-500 text-white' : 
                        idx === currentStep ? 'bg-gray-900 text-white' : 
                        'bg-gray-200 text-gray-500'}
                    `}>
                      {idx < currentStep ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-xs">{idx + 1}</span>
                      )}
                    </div>
                    <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
                  </div>
                ))}
              </div>
              
              {/* Step title */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {steps[currentStep].title}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {currentStep === 0 && "Get started with your trading journey"}
                  {currentStep === 1 && "Register your XM Markets account"}
                  {currentStep === 2 && "Complete identity verification"}
                  {currentStep === 3 && "Fund your account to start trading"}
                </p>
              </div>
              
              {/* Step content with animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </form>
          </div>
          
          {/* Footer with navigation buttons */}
          <div className="border-t border-gray-200 p-6 flex justify-between items-center bg-white">
            <Button
              type="button"
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''} text-gray-600`}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <div className="flex-1 flex justify-center px-4">
              <div className="w-full max-w-xs bg-gray-200 h-1 rounded-full overflow-hidden flex items-center">
                <motion.div
                  className="h-full bg-gray-900 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            
            <Button
              type="button"
              onClick={handleSubmit}
              className={`${isLastStep ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-800'} text-white`}
            >
              {isSubmitting ? 
                "Processing..." : 
                isLastStep ? "Complete Setup" : "Continue"
              }
              {!isLastStep && !isSubmitting && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Success dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md rounded-xl p-0 overflow-hidden">
          <div className="bg-green-50 py-8 px-6 flex justify-center">
            <div className="bg-white rounded-full p-3 shadow-md">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-xl font-medium text-center">
              Setup Complete
            </DialogTitle>
            <DialogDescription className="text-center mt-2">
              Your trading account has been set up successfully. We will review your documents and connect the bot to your account soon.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="p-6">
            <Button
              onClick={() => {
                setShowConfirmation(false)
                window.location.href = "/"
              }}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
            >
              Go to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}