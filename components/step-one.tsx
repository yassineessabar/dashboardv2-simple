"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, ShieldCheck, Zap, CheckCircle, AlertTriangle, Copy, ExternalLink, Mail, Play } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { VideoInstructionBubble } from "./video-instruction-bubble"

export function StepOne({ formData, updateFormData }) {
  const { toast } = useToast()
  const partnerCode = "D2XQQ"

  // Video instruction source
  const videoInstruction = {
    title: "How to Register with XM Markets",
    videoSrc: "https://www.youtube.com/embed/your-registration-video-id" // Replace with your actual YouTube video ID
  }

  const handleCopyPartnerCode = (e) => {
    // Prevent the event from propagating
    e.preventDefault()
    e.stopPropagation()
    
    navigator.clipboard.writeText(partnerCode)
    toast({
      description: "Partner code copied to clipboard",
    })
  }

  const handleRegister = () => {
    window.open("https://www.xmglobal.com/register/profile-account", "_blank")
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <motion.div className="max-w-3xl mx-auto space-y-8 py-6" initial="initial" animate="animate" variants={fadeInUp}>
      {/* Video instruction bubble */}
      <VideoInstructionBubble 
        title={videoInstruction.title}
        videoSrc={videoInstruction.videoSrc}
        position="bottom-right"
      />
      
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-3xl font-bold text-[#7497bd] tracking-tight">Broker Registration</h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Follow these simple steps to set up your XM Markets trading account
        </p>
      </div>

      <Card className="shadow-xl border-0 overflow-hidden">
        <CardContent className="p-8 space-y-8">
          {/* Step 1: Visit XM Market website */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#7497bd] text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-[#7497bd]">Visit XM Market website</h3>
            </div>
            <p className="text-gray-700 ml-11">
              Click the button below to open the XM Markets registration page in a new tab.
            </p>
            <div className="ml-11">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRegister();
                }}
                className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 flex items-center gap-2 shake-animation attention-button"
              >
                Register with XM Markets
                <ExternalLink className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Step 2: Fill in Your Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#7497bd] text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-[#7497bd]">Fill in Your Information</h3>
            </div>
            <p className="text-gray-700 ml-11">
              Complete the registration form with your personal details. Make sure to enter the partner code in the
              designated field.
            </p>

            <div className="ml-11 bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="mb-4">
                <Label htmlFor="partnerCode" className="text-gray-700 font-medium">
                  Partner Code (Important)
                </Label>
                <div className="mt-2 flex items-center gap-2">
                  <Input id="partnerCode" value={partnerCode} readOnly className="bg-white font-mono text-[#7497bd]" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleCopyPartnerCode(e)}
                    className="flex items-center gap-1"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  This code must be entered in the "Partner Code" field during registration
                </p>
              </div>

              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-03-10%20at%206.59.26%20am-0J2S79XFpPsRN6CEYTjTdyBVFr1o5L.png"
                alt="XM Markets Registration Form"
                width={500}
                height={600}
                className="rounded-lg border border-gray-200 shadow-md mx-auto"
              />
            </div>
          </div>

          {/* Step 3: Confirm Your Email */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#7497bd] text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-[#7497bd]">Confirm Your Email</h3>
            </div>
            <p className="text-gray-700 ml-11">
              After registration, XM Markets will send a confirmation email to your inbox. Click the verification link
              to activate your account.
            </p>
            <Alert className="ml-11 bg-blue-50 border-blue-200">
              <Mail className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Check Your Inbox</AlertTitle>
              <AlertDescription className="text-blue-700">
                If you don't see the confirmation email, check your spam or junk folder. The email verification is
                required to complete your registration.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Important:</strong> Make sure to enter the partner code {partnerCode} during registration to link your
          account with Sigmatic Trading.
        </AlertDescription>
      </Alert>

      <motion.div
        className="bg-gradient-to-r from-[#7497bd] to-[#5a7a9d] rounded-xl overflow-hidden shadow-xl"
        variants={fadeInUp}
      >
        <div className="p-8 flex flex-col sm:flex-row justify-between items-center">
          <h3 className="text-3xl font-bold text-white mb-4 sm:mb-0">Why Choose XM Markets?</h3>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Df6oWaVYWM8Qm88wys1zvoGCJrb7WX.png"
            alt="XM Markets Logo"
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
      
      {/* Hidden button for video trigger */}
      <button 
        data-bubble-video="registration" 
        className="hidden"
        aria-hidden="true"
      />
    </motion.div>
  )
}