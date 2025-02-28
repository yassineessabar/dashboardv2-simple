"use client"

import { useState, useEffect } from "react"
import {
  Copy,
  Apple,
  SmartphoneIcon as Android,
  X,
  QrCode,
  ExternalLink,
  HelpCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  PartyPopper,
} from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"

interface ImprovedDemoTutorialProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImprovedDemoTutorial({ open, onOpenChange }: ImprovedDemoTutorialProps) {
  const [step, setStep] = useState(1)
  const { toast } = useToast()
  const [copied, setCopied] = useState<string | null>(null)
  const [showCongrats, setShowCongrats] = useState(false)

  // Restore progress from localStorage
  useEffect(() => {
    const savedStep = localStorage.getItem("demoTutorialStep")
    if (savedStep) {
      setStep(Number.parseInt(savedStep))
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("demoTutorialStep", step.toString())
  }, [step])

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
    toast({
      description: `${label} copied to clipboard`,
    })
  }

  const handleClose = () => {
    onOpenChange(false)
    setStep(1)
    setShowCongrats(false)
    localStorage.removeItem("demoTutorialStep")
  }

  const steps = [
    {
      title: "Download MetaTrader 4",
      content: (
        <div className="space-y-8">
          <div className="w-full max-w-[300px] mx-auto">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/metatrader-4-logo-og-fRVR4S05xCoUqukHzpbf1et5tkQwxc.png"
              alt="MetaTrader 4"
              className="w-full h-auto"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <Button
                className="w-full bg-black hover:bg-gray-800 h-auto py-4 px-6 transition-transform hover:scale-105"
                asChild
              >
                <a
                  href="https://apps.apple.com/us/app/metatrader-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="space-y-1"
                >
                  <Apple className="h-7 w-7 mb-1" />
                  <div className="text-[0.65rem] font-normal opacity-90">Download on the</div>
                  <div className="text-base font-semibold leading-none">App Store</div>
                </a>
              </Button>
              <div className="bg-white p-2 rounded-lg mx-auto w-24 h-24 border">
                <QrCode className="w-full h-full text-black" />
              </div>
            </div>
            <div className="space-y-4">
              <Button
                className="w-full bg-black hover:bg-gray-800 h-auto py-4 px-6 transition-transform hover:scale-105"
                asChild
              >
                <a
                  href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="space-y-1"
                >
                  <Android className="h-7 w-7 mb-1" />
                  <div className="text-[0.65rem] font-normal opacity-90">Get it on</div>
                  <div className="text-base font-semibold leading-none">Google Play</div>
                </a>
              </Button>
              <div className="bg-white p-2 rounded-lg mx-auto w-24 h-24 border">
                <QrCode className="w-full h-full text-black" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Set Up Your Account",
      content: (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium mb-4 flex items-center">
              Open the app and follow these steps:
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Make sure to complete each step in order</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h3>
            <ol className="space-y-4">
              {[
                "Open Settings from the menu",
                "Select New Account option",
                "Choose Login to Existing Account",
                "Enter Server: XMGlobal-Demo2",
              ].map((step, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="h-6 w-6 rounded-full bg-[#7497bd] text-white flex items-center justify-center mr-3 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      ),
    },
    {
      title: "Demo credentials",
      content: (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium mb-6 text-center">Enter these credentials in the app:</h3>
            <div className="space-y-6">
              <motion.div
                className="bg-white rounded-lg p-4 border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-600">Login:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-[#7497bd] font-mono">79165744</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 ${copied === "Login" ? "text-green-500" : "hover:text-[#7497bd]"}`}
                      onClick={() => handleCopy("79165744", "Login")}
                    >
                      {copied === "Login" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="bg-white rounded-lg p-4 border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-600">Password:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-[#7497bd] font-mono">2vP81$$be8</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 ${copied === "Password" ? "text-green-500" : "hover:text-[#7497bd]"}`}
                      onClick={() => handleCopy("2vP81$$be8", "Password")}
                    >
                      {copied === "Password" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
        <div className="absolute right-4 top-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
            onClick={handleClose}
          >
            <X className="h-4 w-4 text-white" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="bg-gradient-to-br from-[#7497bd] to-[#5a7a9d] text-white p-6">
          <h2 className="text-2xl font-bold mb-2">Discover Demo Trading</h2>
          <p className="text-sm opacity-90">Experience risk-free trading with our demo account</p>
        </div>

        <div className="p-6">
          {!showCongrats ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Step {step} of {steps.length}
                  </span>
                  <span className="text-sm font-medium text-[#7497bd]">
                    {Math.round((step / steps.length) * 100)}% Complete
                  </span>
                </div>
                <Progress value={(step / steps.length) * 100} className="h-2" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-6 text-[#7497bd]">{steps[step - 1].title}</h3>
                  {steps[step - 1].content}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between mt-8 pt-4 border-t">
                <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1} className="w-[100px]">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                  onClick={() => {
                    if (step < steps.length) {
                      setStep(step + 1)
                    } else {
                      setShowCongrats(true)
                    }
                  }}
                  className="w-[100px] bg-[#7497bd] hover:bg-[#5a7a9d]"
                >
                  {step === steps.length ? "Finish" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <PartyPopper className="h-16 w-16 mx-auto text-[#7497bd] mb-4" />
              <h3 className="text-2xl font-bold text-[#7497bd] mb-4">Congratulations!</h3>
              <p className="text-gray-600 mb-6">
                You've successfully set up your demo account. You're now ready to start your risk-free trading journey!
              </p>
              <Button onClick={handleClose} className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white">
                Start Trading
              </Button>
            </motion.div>
          )}
        </div>

        {step === steps.length && !showCongrats && (
          <div className="bg-green-50 border-t border-green-200 p-4 text-sm text-green-700">
            <p className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Need help? Contact our support team:
            </p>
            <a href="mailto:support@sigmatic.io" className="flex items-center mt-1 hover:underline">
              <ExternalLink className="h-4 w-4 mr-1" />
              support@sigmatic.io
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

