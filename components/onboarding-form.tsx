"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StepZero } from "@/components/step-zero"
import { StepOne } from "@/components/step-one"
import { SummaryStep } from "@/components/summary-step"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

const steps = [
  { id: 0, title: "Basic Info", icon: "👤" },
  { id: 1, title: "Account Setup", icon: "🏦" },
  { id: 2, title: "Review & Submit", icon: "📝" },
]

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    identityDocument: null,
    proofOfAddress: null,
    setupChoice: "manual",
    selectedRobot: "sigmatic-3.5",
    minimumDepositAcknowledged: true,
    consentGiven: true,
  })
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateStep(currentStep)) {
      console.log("Form submitted:", formData)
      // Here you would typically send the data to your backend
      // For now, we'll just show a success message
      setShowConfirmation(true)
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      })
    }
  }

  const renderStep = () => {
    console.log("Rendering step:", currentStep)
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
      <Card className="w-full max-w-4xl mx-auto bg-white border-gray-200 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#7497bd] to-[#5a7a9d] p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Sigmatic Trading Onboarding</h1>
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
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${
                      index <= currentStep ? "bg-[#7497bd] text-white" : "bg-gray-200"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{step.title}</span>
                </div>
              ))}
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#7497bd] rounded-full"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit}>{renderStep()}</form>
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
            type={currentStep === steps.length - 1 ? "submit" : "button"}
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={!validateStep(currentStep)}
            className="w-full sm:w-auto bg-[#7497bd] hover:bg-[#5a7a9d] text-white"
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Application Submitted</DialogTitle>
            <DialogDescription>
              Thank you for submitting your application. We will review the information provided.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowConfirmation(false)
                router.push("/") // Redirect to home page or dashboard
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

