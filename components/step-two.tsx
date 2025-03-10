"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CheckCircle, 
  User, 
  FileText, 
  InfoIcon, 
  AlertTriangle, 
  Play,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  HelpCircle
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoInstructionBubble } from "./video-instruction-bubble"
import { WhatsAppContactBubble } from "./whatsapp-contact-bubble"
import Image from "next/image"

export function StepTwo({ formData, updateFormData }) {
  const [activeVerificationStep, setActiveVerificationStep] = useState("personal")
  const [tutorialExpanded, setTutorialExpanded] = useState(false)
  
  // Video instructions for each verification step
  const videoInstructions = {
    personal: {
      title: "How to Complete Personal Information",
      videoSrc: "https://www.youtube.com/embed/your-personal-info-video-id"
    },
    investor: {
      title: "How to Complete Investor Profile",
      videoSrc: "https://www.youtube.com/embed/your-investor-profile-video-id"
    },
    documents: {
      title: "How to Complete Document Verification",
      videoSrc: "https://www.youtube.com/embed/your-document-upload-video-id"
    }
  }

  const handleCompleteVerification = () => {
    // Update the form data to indicate verification is complete
    updateFormData({ 
      verificationComplete: true,
      personalInfoCompleted: true,
      investorProfileCompleted: true,
      documentsSubmitted: true
    })
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <motion.div 
      className="w-full mx-auto space-y-4 sm:space-y-6 p-2 sm:p-4" 
      initial="initial" 
      animate="animate" 
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* WhatsApp contact bubble */}
      <WhatsAppContactBubble 
        phoneNumber="447700000000" 
        message={`Hi, I need help with my account verification. I'm currently on the ${activeVerificationStep} section.`}
        position="bottom-right" 
      />
      
      {/* Header Section */}
      <motion.div 
        className="text-center mb-4 sm:mb-6"
        variants={fadeInUp}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Account Verification</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md mx-auto">
          Complete this step to activate your trading account
        </p>
      </motion.div>
      
      {/* Main Verification Section */}
      <motion.div variants={fadeInUp}>
        <Card className="border-0 shadow-sm rounded-md overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-100 p-3 sm:p-4">
            <CardTitle className="text-base sm:text-lg font-medium text-gray-900">Verification Required</CardTitle>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              To start trading, please complete verification on the XM Markets website
            </p>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4 bg-white">
            <Alert className="bg-blue-50 border-0 shadow-sm rounded-md p-2 sm:p-3">
              <InfoIcon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
              <AlertDescription className="text-[10px] sm:text-xs text-blue-700 ml-2">
                You'll need to complete personal information, investor profile, and document verification steps.
              </AlertDescription>
            </Alert>
            
            <div className="pt-2 flex justify-center">
              <Button
                className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-md shadow-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  window.open("https://my.xmglobal.com/profile/validate/profile-details", "_blank");
                }}
              >
                Start Verification Process
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Video instruction bubble that changes based on active tab */}
      {tutorialExpanded && (
        <VideoInstructionBubble 
          title={videoInstructions[activeVerificationStep].title}
          videoSrc={videoInstructions[activeVerificationStep].videoSrc}
          position="bottom-right"
        />
      )}

      {/* Collapsible Tutorial Section */}
      <motion.div variants={fadeInUp} className="mt-2">
        <div 
          className="border border-gray-200 rounded-md overflow-hidden shadow-sm"
        >
          <div 
            className="bg-gray-50 p-2.5 sm:p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setTutorialExpanded(!tutorialExpanded)}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#7497bd]" />
              <h3 className="text-sm sm:text-base font-medium text-gray-900">Step-by-Step Tutorial</h3>
            </div>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{
                rotate: tutorialExpanded ? 180 : 0,
                transition: { duration: 0.3 }
              }}
            >
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
            </motion.div>
          </div>
          
          <AnimatePresence>
            {tutorialExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-200"
              >
                <div className="p-2 sm:p-3">
                  <Tabs 
                    defaultValue="personal" 
                    value={activeVerificationStep}
                    onValueChange={setActiveVerificationStep}
                    className="space-y-3 sm:space-y-4"
                  >
                    <TabsList className="w-full grid grid-cols-3 p-1 bg-gray-100 rounded-md">
                      <TabsTrigger 
                        value="personal" 
                        className="py-1.5 sm:py-2 px-2 sm:px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm text-xs sm:text-sm"
                      >
                        <span className="flex items-center gap-1 sm:gap-1.5">
                          <span className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#7497bd] text-white text-[10px] sm:text-xs">1</span>
                          <span className="hidden sm:inline">Personal</span>
                        </span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="investor" 
                        className="py-1.5 sm:py-2 px-2 sm:px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm text-xs sm:text-sm"
                      >
                        <span className="flex items-center gap-1 sm:gap-1.5">
                          <span className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#7497bd] text-white text-[10px] sm:text-xs">2</span>
                          <span className="hidden sm:inline">Investor</span>
                        </span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="documents" 
                        className="py-1.5 sm:py-2 px-2 sm:px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm text-xs sm:text-sm"
                      >
                        <span className="flex items-center gap-1 sm:gap-1.5">
                          <span className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#7497bd] text-white text-[10px] sm:text-xs">3</span>
                          <span className="hidden sm:inline">Documents</span>
                        </span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="mt-3 sm:mt-4">
                      <Card className="border border-gray-200 shadow-sm rounded-md overflow-hidden">
                        <CardHeader className="bg-white border-b border-gray-100 py-2 px-3 sm:p-3">
                          <CardTitle className="text-sm sm:text-base font-medium text-gray-900 flex items-center">
                            <User className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-[#7497bd]" />
                            Personal Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-2 sm:p-3 space-y-2 sm:space-y-3 bg-white">
                          <Alert className="bg-yellow-50 border-0 shadow-sm rounded-md p-1.5 sm:p-2">
                            <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-600" />
                            <AlertDescription className="text-yellow-700 text-[10px] sm:text-xs ml-1.5 sm:ml-2">
                              Provide your full name exactly as it appears on your ID
                            </AlertDescription>
                          </Alert>
                          
                          {/* Profile Details */}
                          <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center">
                              <span className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#7497bd] text-white font-medium mr-1.5 sm:mr-2 text-[10px] sm:text-xs">1</span>
                              <h3 className="text-xs sm:text-sm font-medium text-gray-900">Profile Details</h3>
                            </div>
                            
                            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                              <div className="flex justify-center p-1.5 sm:p-2">
                                <div className="border border-gray-100 rounded-md overflow-hidden shadow-sm">
                                  <img 
                                    src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce0e46ec624e2b732c6b79_Screen%20Shot%202025-03-10%20at%208.41.14%20am.png"
                                    alt="Personal information form" 
                                    className="max-w-full h-auto w-auto max-h-[150px] sm:max-h-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Address Information */}
                          <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center">
                              <span className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#7497bd] text-white font-medium mr-1.5 sm:mr-2 text-[10px] sm:text-xs">2</span>
                              <h3 className="text-xs sm:text-sm font-medium text-gray-900">Your Address</h3>
                            </div>
                            
                            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                              <div className="flex justify-center p-1.5 sm:p-2">
                                <div className="border border-gray-100 rounded-md overflow-hidden shadow-sm">
                                  <img 
                                    src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce0e46bf864b91e7ded287_Screen%20Shot%202025-03-10%20at%208.42.03%20am.png"
                                    alt="Address information form" 
                                    className="max-w-full h-auto w-auto max-h-[150px] sm:max-h-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="investor" className="mt-3 sm:mt-4">
                      <Card className="border border-gray-200 shadow-sm rounded-md overflow-hidden">
                        <CardHeader className="bg-white border-b border-gray-100 py-2 px-3 sm:p-3">
                          <CardTitle className="text-sm sm:text-base font-medium text-gray-900 flex items-center">
                            <User className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-[#7497bd]" />
                            Investor Profile
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-2 sm:p-3 space-y-2 sm:space-y-3 bg-white">
                          <Alert className="bg-blue-50 border-0 shadow-sm rounded-md p-1.5 sm:p-2">
                            <InfoIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-600" />
                            <AlertDescription className="text-blue-700 text-[10px] sm:text-xs ml-1.5 sm:ml-2">
                              Required to ensure our products are suitable for you
                            </AlertDescription>
                          </Alert>
                          
                          {/* Financial Information */}
                          <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center">
                              <span className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#7497bd] text-white font-medium mr-1.5 sm:mr-2 text-[10px] sm:text-xs">1</span>
                              <h3 className="text-xs sm:text-sm font-medium text-gray-900">Financial Information</h3>
                            </div>
                            
                            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                              <div className="flex justify-center p-1.5 sm:p-2">
                                <div className="border border-gray-100 rounded-md overflow-hidden shadow-sm">
                                  <img 
                                    src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce0e47b096a4729b771f7a_Screen%20Shot%202025-03-10%20at%208.43.30%20am.png"
                                    alt="Investor profile form" 
                                    className="max-w-full h-auto w-auto max-h-[150px] sm:max-h-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Trading Experience */}
                          <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center">
                              <span className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#7497bd] text-white font-medium mr-1.5 sm:mr-2 text-[10px] sm:text-xs">2</span>
                              <h3 className="text-xs sm:text-sm font-medium text-gray-900">Trading Experience</h3>
                            </div>
                            
                            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                              <div className="flex justify-center p-1.5 sm:p-2">
                                <div className="border border-gray-100 rounded-md overflow-hidden shadow-sm">
                                  <img 
                                    src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce0e4688b3110eab1179e2_Screen%20Shot%202025-03-10%20at%208.43.37%20am.png"
                                    alt="Trading experience form" 
                                    className="max-w-full h-auto w-auto max-h-[150px] sm:max-h-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <Alert className="bg-yellow-50 border-0 shadow-sm rounded-md p-1.5 sm:p-2">
                            <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-600" />
                            <AlertDescription className="text-yellow-700 text-[10px] sm:text-xs ml-1.5 sm:ml-2">
                              <ul className="list-disc list-inside text-[10px] sm:text-xs">
                                <li>Purpose: <strong>To trade and hedge the markets</strong></li>
                                <li>Trading experience: <strong>Select "Yes"</strong></li>
                              </ul>
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="documents" className="mt-3 sm:mt-4">
                      <Card className="border border-gray-200 shadow-sm rounded-md overflow-hidden">
                        <CardHeader className="bg-white border-b border-gray-100 py-2 px-3 sm:p-3">
                          <CardTitle className="text-sm sm:text-base font-medium text-gray-900 flex items-center">
                            <FileText className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-[#7497bd]" />
                            Document Verification
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-2 sm:p-3 space-y-2 sm:space-y-3 bg-white">
                          <Alert className="bg-red-50 border-0 shadow-sm rounded-md p-1.5 sm:p-2">
                            <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-600" />
                            <AlertDescription className="text-red-700 text-[10px] sm:text-xs ml-1.5 sm:ml-2">
                              Trading access requires verified documents
                            </AlertDescription>
                          </Alert>
                          
                          <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                            <div className="flex justify-center p-1.5 sm:p-2">
                              <div className="border border-gray-100 rounded-md overflow-hidden shadow-sm">
                                <img 
                                  src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce11b7ac2c7e70820e3e6a_Screen%20Shot%202025-03-10%20at%209.09.41%20am.png"
                                  alt="Document verification page" 
                                  className="max-w-full h-auto w-auto max-h-[150px] sm:max-h-none"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <Alert className="bg-blue-50 border-0 shadow-sm rounded-md p-1.5 sm:p-2">
                            <InfoIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-600" />
                            <AlertDescription className="text-blue-700 text-[10px] sm:text-xs ml-1.5 sm:ml-2">
                              <ul className="list-disc list-inside text-[10px] sm:text-xs">
                                <li>Formats: GIF, JPG, PNG, PDF (max 5MB)</li>
                                <li>Required: ID (both sides) and proof of address</li>
                              </ul>
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Success Message */}
      {formData.verificationComplete && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="bg-green-50 border-0 shadow-sm rounded-md p-2 sm:p-3">
            <div className="flex">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mr-1.5 sm:mr-2 mt-0.5" />
              <div>
                <AlertTitle className="text-green-800 font-medium text-xs sm:text-sm">Verification Submitted Successfully!</AlertTitle>
                <AlertDescription className="text-green-700 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
                  Your information has been submitted. Our team will review your documents within 24-48 hours.
                </AlertDescription>
              </div>
            </div>
          </Alert>
        </motion.div>
      )}
      
      {/* Hidden buttons for video triggers */}
      <button 
        data-bubble-video="personal" 
        className="hidden"
        aria-hidden="true"
      />
      <button 
        data-bubble-video="investor" 
        className="hidden"
        aria-hidden="true"
      />
      <button 
        data-bubble-video="documents" 
        className="hidden"
        aria-hidden="true"
      />
    </motion.div>
  )
}