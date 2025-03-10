"use client"

import { motion } from "framer-motion"
import { User, CheckCircle, Zap, DollarSign, Lock, BarChart3, Calendar, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WhatsAppContactBubble } from "./whatsapp-contact-bubble"

export function StepZero({ formData, updateFormData }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  const handleNameChange = (e) => {
    updateFormData({ fullName: e.target.value })
  }

  const benefits = [
    {
      icon: DollarSign,
      title: "No Upfront Costs",
      description: "Free first month with no obligation"
    },
    {
      icon: BarChart3,
      title: "Real Results",
      description: "Test our AI with live trading"
    },
    {
      icon: Zap,
      title: "Fully Automated",
      description: "Hands-free AI-powered trading"
    },
    {
      icon: Lock,
      title: "Secure & Transparent",
      description: "Full control of your funds"
    }
  ]

  return (
    <motion.div
      className="w-full mx-auto space-y-6 sm:space-y-8 p-2 sm:p-4"
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
        message="Hi, I'm interested in Sigmatic Trading's free trial. Can you tell me more?"
        position="bottom-right" 
      />

      {/* How it works section */}
      <motion.div variants={fadeInUp}>
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#7497bd] inline-block pb-2 border-b-2 border-[#7497bd]">
            How Sigmatic AI Trading Works
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            {
              number: "01",
              title: "Sign Up",
              description: "Create your account in minutes with zero upfront cost."
            },
            {
              number: "02",
              title: "Connect",
              description: "Link our AI to your broker account securely."
            },
            {
              number: "03",
              title: "Profit",
              description: "Watch as our AI executes trades and generates returns."
            }
          ].map((step, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white">
              <CardContent className="p-3 sm:p-4">
                <span className="text-[#7497bd] text-3xl sm:text-4xl font-bold opacity-20">{step.number}</span>
                <h3 className="text-base sm:text-lg font-bold mt-1 mb-1">{step.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Key benefits details */}
      <motion.div variants={fadeInUp}>
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-center bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-gray-200">
          <div className="w-full lg:w-1/2">
            <h3 className="text-lg sm:text-xl font-bold text-[#7497bd] mb-2 sm:mb-3">Performance-Based Model</h3>
            <p className="text-gray-700 mb-3 text-xs sm:text-sm">
              We operate on a simple principle: <span className="font-semibold">you profit first, then we earn</span>.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">Only 20% performance fee on profits</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">No hidden charges or monthly fees</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">First month completely free</span>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2 bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100 mt-3 lg:mt-0">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#f0f5fb] text-[#7497bd] rounded-full mb-2 sm:mb-3">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </div>
              <h4 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">AI-Powered Results</h4>
              <p className="text-gray-600 mb-3 text-xs sm:text-sm">Our advanced algorithms analyze markets 24/7, executing trades with precision timing.</p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                <p className="font-bold text-[#7497bd] text-sm sm:text-base">Average Monthly Return</p>
                <p className="text-xl sm:text-2xl font-bold">8-15%</p>
                <p className="text-xs text-gray-500">Results may vary based on market conditions</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero section */}
      <motion.div 
        className="relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-r from-[#1a2233] to-[#111927] shadow-md"
        variants={fadeInUp}
      >
        <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-[#7497bd] opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-[#7497bd] opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/2"></div>
        
        <div className="relative z-10 p-4 sm:p-6 lg:p-8 text-white">
          <div className="w-full max-w-xl">
            <motion.div className="flex items-center mb-3 sm:mb-4" variants={fadeInUp}>
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#7497bd] mr-2 sm:mr-3" />
              <span className="bg-[#7497bd] text-white text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">1 MONTH FREE</span>
            </motion.div>
            
            <motion.h1 
              className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3"
              variants={fadeInUp}
            >
              Experience the Power of AI Trading
            </motion.h1>
            
            <motion.p 
              className="text-sm lg:text-base mb-4 sm:mb-5 lg:mb-6 text-gray-300"
              variants={fadeInUp}
            >
              Start with no upfront costs. See real results before you pay anything. We only win when you win.
            </motion.p>
          
            <div className="grid grid-cols-2 gap-3 mb-4 sm:mb-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-white/10 p-1 sm:p-1.5 rounded-md">
                    <benefit.icon className="h-3 w-3 sm:h-4 sm:w-4 text-[#7497bd]" />
                  </div>
                  <div className="ml-1.5 sm:ml-2">
                    <h4 className="font-bold text-xs">{benefit.title}</h4>
                    <p className="text-[10px] sm:text-xs text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center sm:justify-start mt-4">
              <Button
                className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white font-medium px-4 py-2 text-sm sm:text-base rounded-md shadow-sm transition-all duration-300"
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}