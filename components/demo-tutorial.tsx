"use client"

import { useState, useEffect } from "react"
import { Apple, SmartphoneIcon as Android, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Progress } from "@/components/ui/progress"

interface DemoTutorialProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DemoTutorial({ open, onOpenChange }: DemoTutorialProps) {
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
        <div className="space-y-8 text-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/metatrader-4-logo-og-fRVR4S05xCoUqukHzpbf1et5tkQwxc.png"
            alt="MetaTrader 4"
            className="w-full max-w-[200px] mx-auto"
          />
          <div className="grid grid-cols-2 gap-6">
            <Button className="w-full bg-black hover:bg-gray-800 transition-colors" asChild>
              <a href="https://apps.apple.com/us/app/metatrader-4" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <img 
                  src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67c1883226b0646f0a5e4b27_Logo_App_Store_d%27Apple.png" 
                  alt="App Store Logo" 
                  className="h-6 w-6 mr-2"
                />
                App Store
              </a>
            </Button>

            <Button className="w-full bg-black hover:bg-gray-800 transition-colors" asChild>
              <a
                href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67c18832cf64e514ff6de3a9_google-play-store-logo-png-transparent.png" 
                  alt="Google Store Logo" 
                  className="h-6 w-6 mr-2"
                />
                Google Play
              </a>
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Set Up Your Account",
      content: (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium mb-4">Open the app and go to:</h3>
            <ol className="space-y-4">
              {[
                "'Settings' from the menu",
                "Select 'New Account' option",
                "Choose 'Login to Existing Account'",
                "Type: 'XMGlobal-Demo 2'",
              ].map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
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
      title: "Your Demo Account Credentials",
      content: (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium mb-4 text-center">Now that you are in Server  'XMGlobal-Demo 2', <p> Enter the login credentials below:</p></h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-600">Login:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-[#7497bd] font-mono">79165744</code>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-600">Password:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-[#7497bd] font-mono">2vP81$$be8</code>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600">Once logged in check the performance live (by day, week, or month) on the History tab</p>
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (showCongrats) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [showCongrats])

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {!showCongrats ? (
            <motion.div key="tutorial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="bg-gradient-to-br from-[#7497bd] to-[#5a7a9d] text-white p-6">
                <h2 className="text-2xl font-bold mb-2">Try Sigmatic AI with a Demo Account</h2>
                <p className="text-sm opacity-90">Experience risk-free trading powered by Sigmatic AI.</p>
              </div>
              <div className="p-6">
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
                <h3 className="text-xl font-semibold mb-6 text-[#7497bd]">{steps[step - 1].title}</h3>
                {steps[step - 1].content}
                <div className="flex justify-between mt-8 pt-4 border-t">
                  <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
                    Previous
                  </Button>
                  <Button
                    onClick={() => (step < steps.length ? setStep(step + 1) : setShowCongrats(true))}
                    className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white"
                  >
                    {step === steps.length ? "Start Demo Trading" : "Next"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="congrats"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#7497bd] to-[#5a7a9d] text-white p-8 h-full flex flex-col items-center justify-center text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
              <p className="text-xl mb-8">You've successfully set up your demo account.</p>
              {/* FIXED: Use asChild to properly allow the anchor to be the root */}
              <Button
                asChild
                className="bg-white text-[#7497bd] hover:bg-gray-100 transition-colors py-6 px-8 text-lg font-semibold"
              >
                <a href="/get-started" rel="noopener noreferrer">
                  Create Real Account Now
                </a>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute right-4 top-4">
        {/*   <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-white" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>*/}
        </div>
      </DialogContent>
    </Dialog>
  )
}