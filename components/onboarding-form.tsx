"use client"

import { useState, useCallback, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { StepZero } from "@/components/step-zero" // Commented out welcome page
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

// Define the responsive header component inline
const ResponsiveStepHeader = ({ currentStep }) => {
  // Step title and subtitle data
  const stepContent = [
    // { 
    //   title: "Welcome", 
    //   subtitle: "Get started with trading" 
    // }, // Commented out welcome step
    { 
      title: "Registration", 
      subtitle: "Create your broker account" 
    },
    { 
      title: "Verification", 
      subtitle: "Verify your identity" 
    },
    { 
      title: "Deposit", 
      subtitle: "Fund your account" 
    }
  ];

  // Get content for current step
  const currentContent = stepContent[currentStep];

  return (
    <div className="w-full p-4 bg-white border-b border-gray-200 md:hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            {currentContent.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {currentContent.subtitle}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const steps = [
  // { id: 0, title: "Welcome", icon: <Rocket className="h-5 w-5" /> }, // Commented out welcome step
  { id: 0, title: "Registration", icon: <User className="h-5 w-5" /> },
  { id: 1, title: "Verification", icon: <Mail className="h-5 w-5" /> },
  { id: 2, title: "Deposit", icon: <LockKeyhole className="h-5 w-5" /> },
]

export function OnboardingForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
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
  const [isLoading, setIsLoading] = useState(true)
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)

  // Fetch the current user profile when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/user/profile")
        if (response.ok) {
          const data = await response.json()
          if (data.user) {
            setSessionUser(data.user)
            setIsUserAuthenticated(true)
            // Update form data with user information
            setFormData(prev => ({
              ...prev,
              fullName: data.user.name || "",
              email: data.user.email || ""
            }))
          } else {
            console.error("No user data found in profile response")
            setShowAuthPrompt(true)
          }
        } else {
          console.error("Failed to fetch user profile:", response.status)
          // Changed from redirecting to login to showing auth prompt
          setShowAuthPrompt(true)
        }
      } catch (error) {
        console.error("Error fetching user profile:", error)
        setShowAuthPrompt(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
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
        // Modified to allow progression without requiring verification to be complete
        return true
      case 2:
        // Always allow submission on the final step
        return true
      default:
        return true
    }
  }

  // NEW FUNCTION: Handle clicking on step headers for navigation
  const handleStepClick = (stepIndex) => {
    // Only allow clicking on steps that have been completed or the current step + 1
    if (stepIndex <= currentStep + 1) {
      // Validate current step before allowing navigation
      if (stepIndex > currentStep && !validateStep(currentStep)) {
        return; // Don't allow forward navigation if current step isn't valid
      }
      setCurrentStep(stepIndex);
    }
  };

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
      // We're on the last step (Deposit - index 2)
      if (currentStep === steps.length - 1) {
        if (isSubmitting) return // Prevent multiple submissions
        
        setIsSubmitting(true)
        
        try {
          // Generate a unique submission ID
          const timestamp = Date.now()
          const randomString = Math.random().toString(36).substring(2, 8)
          const submissionId = `${timestamp}-${randomString}`
          
          // Format the submission time
          const submissionTime = new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          })
          
          // Determine if we need to use FormData (for file uploads) or JSON
          const hasFiles = formData.identityDocument || formData.proofOfAddress;
          
          let response;
          
          if (hasFiles) {
          // Create a FormData object for the file uploads
          const submitFormData = new FormData();
          
          // Add user data from session
          submitFormData.append("fullName", sessionUser?.name || formData.fullName);
          submitFormData.append("email", sessionUser?.email || formData.email);
          submitFormData.append("phoneNumber", formData.phoneNumber || "");
          
          // Add other form fields
            submitFormData.append("setupChoice", formData.setupChoice);
            submitFormData.append("selectedRobot", formData.selectedRobot);
            submitFormData.append("minimumDepositAcknowledged", formData.minimumDepositAcknowledged.toString());
            submitFormData.append("consentGiven", formData.consentGiven.toString());
            
            // Add submission metadata
            submitFormData.append("submissionId", submissionId);
            submitFormData.append("submissionTime", submissionTime);
            
            // Add file attachments
            if (formData.identityDocument) {
              submitFormData.append("identityDocument", formData.identityDocument);
            }
            
            if (formData.proofOfAddress) {
              submitFormData.append("proofOfAddress", formData.proofOfAddress);
            }
            
            // Use the API route to send the form data
            response = await fetch("/api/submit-form", {
              method: "POST",
              body: submitFormData
            });
          } else {
            // Use JSON for the email API - this was the original method that worked
            response = await fetch("/api/submit-form", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: sessionUser?.name || formData.fullName,
                email: sessionUser?.email || formData.email,
                phoneNumber: formData.phoneNumber,
                formData: {
                  ...formData,
                  fullName: sessionUser?.name || formData.fullName,
                  email: sessionUser?.email || formData.email,
                  phoneNumber: formData.phoneNumber
                },
                subject: "New FORM Registration",
                submissionId: submissionId,
                submissionTime: submissionTime,
                verificationStatus: formData.verificationComplete ? "Complete" : "Incomplete",
                depositStatus: formData.depositVerified ? "Verified" : "Not Verified"
              }),
            });
          }

          if (!response.ok) {
            console.error("Error response from server:", await response.text());
            throw new Error("Failed to submit form");
          }
          
          console.log("Form submitted successfully");
        } catch (error) {
          console.error("Error submitting form:", error);
        } finally {
          // Show confirmation dialog regardless of email success
          setShowConfirmation(true);
          setIsSubmitting(false);
        }
      } else {
        // Otherwise just go to the next step
        handleNext();
      }
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      // case 0:
      //   return <StepZero formData={formData} updateFormData={updateFormData} /> // Commented out welcome step
      case 0:
        return <StepOne formData={formData} updateFormData={updateFormData} sessionUser={sessionUser} />
      case 1:
        return <StepTwo formData={formData} updateFormData={updateFormData} />
      case 2:
        return <StepThree formData={formData} updateFormData={updateFormData} />
      default:
        return null
    }
  }

  const isLastStep = currentStep === steps.length - 1

  // Show loading state while fetching user profile
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Show auth prompt if user is not authenticated
  if (showAuthPrompt) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">
              You need to sign in or create an account to access the trading setup process.
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full bg-[#7497bd] hover:bg-[#5a7a9d]"
                onClick={() => router.push("/auth?mode=signin")}
              >
                Sign In
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => router.push("/auth?mode=signup")}
              >
                Create Account
              </Button>
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => router.push("/")}
              >
                Return to Home
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Top header with step indicators - Hidden on mobile */}
      <div className="bg-white border-b border-gray-200 p-6 hidden md:block">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 mr-2">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 5L21 9L12 13L3 9Z" fill="#333" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 14L12 18L21 14" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Trading Setup</h1>
            </div>
            
            <Button variant="outline" className="text-gray-600" onClick={() => router.push("/")}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to home
            </Button>
          </div>

          {/* User info display */}
          {sessionUser && (
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-1" />
              <span>{sessionUser.name}</span>
              <Mail className="h-4 w-4 ml-4 mr-1" />
              <span>{sessionUser.email}</span>
            </div>
          )}

          {/* Step Progress - UPDATED TO BE CLICKABLE */}
          <div className="mt-6 flex justify-between items-center space-x-4">
            {steps.map((step, idx) => (
              <div 
                key={step.id} 
                className={`flex-1 flex flex-col items-center ${
                  idx <= currentStep + 1 ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed opacity-60'
                } transition-opacity`}
                onClick={() => handleStepClick(idx)}
              >
                <div className={`
                  flex items-center justify-center h-10 w-10 rounded-full mb-2
                  ${idx < currentStep ? 'bg-green-500 text-white' : 
                    idx === currentStep ? 'bg-gray-900 text-white ring-4 ring-gray-200' : 
                    idx <= currentStep + 1 ? 'bg-gray-200 text-gray-500 hover:bg-gray-300' :
                    'bg-gray-200 text-gray-500'}
                  transition-colors
                `}>
                  {idx < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="text-center">
                  <h3 className={`text-sm font-medium ${idx <= currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs mt-1 ${idx <= currentStep ? 'text-gray-600' : 'text-gray-400'}`}>
                    {/* {idx === 0 && "Get started with trading"} */}
                    {idx === 0 && "Create your broker account"}
                    {idx === 1 && "Verify your identity"}
                    {idx === 2 && "Fund your account"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile header - only visible on mobile */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-6 w-6 mr-2">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 5L21 9L12 13L3 9Z" fill="#333" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 14L12 18L21 14" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Trading Setup</h1>
          </div>
          
          <Button variant="ghost" size="sm" className="text-gray-600 p-1 h-8" onClick={() => router.push("/")}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only md:not-sr-only ml-1">Back</span>
          </Button>
        </div>
        
        {/* Mobile step indicator - simple progress bar */}
        <div className="w-full bg-gray-200 h-1">
          <motion.div
            className="h-full bg-gray-900"
            initial={{ width: 0 }}
            animate={{ 
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      
      {/* Mobile step title component */}
      <ResponsiveStepHeader currentStep={currentStep} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col container mx-auto">
        <Card className="flex-1 rounded-none border-0 shadow-none">
          {/* Main content */}
          <div className="p-4 md:p-10 overflow-auto flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">              
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
          <div className="border-t border-gray-200 p-4 md:p-6 flex justify-between items-center bg-white">
            <Button
              type="button"
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''} text-gray-600`}
            >
              <ChevronLeft className="mr-1 md:mr-2 h-4 w-4" />
              <span className="sr-only md:not-sr-only">Back</span>
            </Button>
            
            <div className="hidden md:flex flex-1 justify-center px-4">
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
              className={`${isLastStep ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-800'} text-white text-sm md:text-base py-2 px-3 md:py-2 md:px-4`}
            >
              {isSubmitting ? 
                "Processing..." : 
                isLastStep ? "Complete Setup" : "Continue"
              }
              {!isLastStep && !isSubmitting && <ChevronRight className="ml-1 md:ml-2 h-4 w-4" />}
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