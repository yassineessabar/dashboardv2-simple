"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  Globe, 
  ShieldCheck, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Copy, 
  ExternalLink, 
  Mail,
  ChevronDown
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { VideoInstructionBubble } from "./video-instruction-bubble"
import { WhatsAppContactBubble } from "./whatsapp-contact-bubble"

export function StepOne({ formData, updateFormData }) {
  const { toast } = useToast()
  const partnerCode = "D2XQQ"
  const [copied, setCopied] = useState(false)
  const [expandedFeatures, setExpandedFeatures] = useState({})
  
  // Use local state for trust indicators section instead of formData
  const [showTrustIndicators, setShowTrustIndicators] = useState(false)

  // Video instruction source
  const videoInstruction = {
    title: "How to Register with XM Markets",
    videoSrc: "https://www.youtube.com/embed/your-registration-video-id"
  }

  const handleCopyPartnerCode = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    navigator.clipboard.writeText(partnerCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    
    toast({
      description: "Partner code copied to clipboard",
      className: "bg-gray-100 border-gray-200 text-gray-800"
    })
  }

  const handleRegister = () => {
    window.open("https://www.xmglobal.com/register/profile-account", "_blank")
  }

  const toggleFeature = (featureId) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }))
  }

  const features = [
    { 
      id: "global",
      icon: Globe, 
      title: "Global Trading Platform", 
      description: "Trade in 196+ countries with multi-language support and 24/7 service",
    },
    { 
      id: "secure",
      icon: ShieldCheck, 
      title: "Secure & Regulated", 
      description: "Protected by SSL encryption and compliant with international regulations",
    },
    { 
      id: "execution",
      icon: Zap, 
      title: "Ultra-Fast Execution", 
      description: "99.35% of orders executed in under 1 second with no requotes",
    },
    { 
      id: "benefits",
      icon: CheckCircle, 
      title: "Exclusive Benefits", 
      description: "Access Sigmatic's AI trading algorithms with our partner code",
    },
  ]

  return (
    <div className="w-full mx-auto space-y-4 sm:space-y-6">
      {/* Floating helpers */}
      {/* <VideoInstructionBubble 
        title={videoInstruction.title}
        videoSrc={videoInstruction.videoSrc}
        position="bottom-right"
      />*/}
      
      <WhatsAppContactBubble 
        phoneNumber="447700000000" 
        message="Hi, I need help with registering my XM Markets account. My partner code is D2XQQ." 
        position="bottom-right" 
      />

      {/* Registration Steps Card */}
      <motion.div 
        className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="divide-y divide-gray-200">
          {/* Step 1: Visit Website */}
          <div className="p-4 sm:p-6">
            <div className="flex gap-2 sm:gap-5">
              <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#7497bd] text-white font-medium text-xs shrink-0 mt-1">
                1
              </div>
              <div className="space-y-2 sm:space-y-3 w-full">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Visit XM Markets Website</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Click the button below to open the official XM Markets registration page in a new tab.
                </p>
                <div>
                  <Button
                    onClick={handleRegister}
                    className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-colors"
                  >
                    Open Registration Page
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
            
          {/* Step 2: Copy Partner Code */}
          <div className="p-4 sm:p-6 bg-gray-50">
            <div className="flex gap-2 sm:gap-5">
              <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#7497bd] text-white font-medium text-xs shrink-0 mt-1">
                2
              </div>
              <div className="space-y-3 sm:space-y-4 w-full">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">Use Our Partner Code</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Copy this code and enter it in the "Partner Code" field during registration.
                  </p>
                </div>
                  
                <div className="flex items-center gap-2 bg-white p-2 sm:p-3 pl-3 sm:pl-5 pr-2 sm:pr-3 rounded-md border border-gray-200 w-full sm:w-auto max-w-xs shadow-sm">
                  <span className="font-mono text-sm sm:text-base font-medium text-gray-900">{partnerCode}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyPartnerCode}
                    className={`ml-auto ${copied ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {copied ? (
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </Button>
                </div>
                  
                <Alert className="bg-gray-100 border-0 text-gray-800 p-2.5 sm:p-4 rounded-md sm:rounded-lg shadow-sm">
                  <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-[#7497bd] mt-0.5" />
                  <AlertDescription className="text-xs sm:text-sm ml-2">
                    You must enter the partner code to link your account with Sigmatic Trading.
                  </AlertDescription>
                </Alert>
                  
                <div className="flex justify-center mt-3 sm:mt-4">
                  <div className="relative max-w-[220px] sm:max-w-xs transition-transform hover:scale-102 duration-300">
                    <div className="absolute -top-2 -right-2 bg-[#7497bd] text-white text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm z-10">
                      Example
                    </div>
                    <div className="border border-gray-300 rounded-lg bg-white shadow-md overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-03-10%20at%206.59.26%20am-0J2S79XFpPsRN6CEYTjTdyBVFr1o5L.png"
                        alt="XM Markets Registration Form"
                        width={280}
                        height={340}
                        className="rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          {/* Step 3: Email Verification */}
          <div className="p-4 sm:p-6">
            <div className="flex gap-2 sm:gap-5">
              <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#7497bd] text-white font-medium text-xs shrink-0 mt-1">
                3
              </div>
              <div className="space-y-3 sm:space-y-4 w-full">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Confirm Your Email</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  After submitting the registration form, XM Markets will send you a confirmation email. Click the verification link to activate your account.
                </p>
                <div className="bg-gray-100 rounded-md sm:rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3 shadow-sm">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#7497bd] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">Check All Email Folders</p>
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-1">
                      If you don't see the confirmation email in your inbox, check your spam, promotions, or junk folders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          
        <div className="bg-gray-50 p-3 sm:p-4 border-t border-gray-200">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#7497bd]" />
            <span className="text-xs sm:text-sm text-gray-700">Typical registration time: <span className="font-medium">3-5 minutes</span></span>
          </div>
        </div>
      </motion.div>

      {/* Trust Indicators Section */}
      <motion.div 
        className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Section Header - Always visible */}
        <div 
          className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={() => setShowTrustIndicators(!showTrustIndicators)}
        >
          <h3 className="text-base sm:text-lg font-medium text-gray-900">Why Traders Choose XM Markets</h3>
            
          <div>
            <button className="text-gray-500 hover:text-[#7497bd] transition-colors">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{
                  rotate: showTrustIndicators ? 180 : 0,
                  transition: { duration: 0.3 }
                }}
              >
                <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.div>
            </button>
          </div>
        </div>
        
        {/* Collapsible Content */}
        <AnimatePresence>
          {showTrustIndicators && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {features.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex items-start gap-2 sm:gap-4 p-3 sm:p-4 rounded-md sm:rounded-lg border border-gray-200 hover:border-[#7497bd] hover:shadow-md bg-white transition-all duration-200"
                    >
                      <div className="bg-[#f0f5fb] p-1.5 sm:p-2.5 rounded-md">
                        <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#7497bd]" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Social Proof */}
              <div className="bg-gray-50 p-4 sm:p-5 border-t border-gray-200">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                  {[
                    { value: "1.5M+", label: "Active Traders" },
                    { value: "30+", label: "Awards" },
                    { value: "99.35%", label: "Execution Speed" },
                    { value: "24/7", label: "Support" }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-3 sm:p-4 rounded-md sm:rounded-lg text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-lg sm:text-xl font-bold text-[#7497bd]">{stat.value}</p>
                      <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Hidden button for video trigger */}
      <button 
        data-bubble-video="registration" 
        className="hidden"
        aria-hidden="true"
      />
    </div>
  )
}