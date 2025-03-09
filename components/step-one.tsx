"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, ShieldCheck, Zap, CheckCircle, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export function StepOne({ formData, updateFormData }) {
  useEffect(() => {
    console.log("StepOne component mounted")
    if (!formData.setupChoice) {
      updateFormData({
        setupChoice: "manual",
      })
    }
    return () => {
      console.log("StepOne component unmounted")
    }
  }, [formData.setupChoice, updateFormData])

  console.log("StepOne rendering, formData:", formData)

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-3xl font-bold text-[#7497bd] tracking-tight">Account Setup</h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          XM Global is our recommended broker for Sigmatic Trading.
        </p>
      </div>

      <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Important:</strong> During the signup process, you will be asked some risk management questions to
          ensure compliance. If you're unsure how to answer any of them, please reach out to us. Providing incorrect
          answers could result in being unable to create your account.
        </AlertDescription>
      </Alert>

      <Card className="shadow-xl border-0 overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center">
            <Button
              onClick={() => window.open("https://affs.click/W6Cqx", "_blank")}
              className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300"
            >
              Register my account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
        <p className="font-bold">Please note:</p>
        <p>
          You will need to ensure compliance and successfully pass the risk knowledge test. If you have any questions,
          please contact us on WhatsApp:{" "}
          <a href="https://wa.me/61480575144" target="_blank" rel="noopener noreferrer" className="underline">
            +61 480 575 144
          </a>
        </p>
      </div>

      <div className="bg-gradient-to-r from-[#7497bd] to-[#5a7a9d] rounded-xl overflow-hidden shadow-xl mt-8">
        <div className="p-8 flex flex-col sm:flex-row justify-between items-center">
          <h3 className="text-3xl font-bold text-white mb-4 sm:mb-0">Why Choose XM Global?</h3>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Df6oWaVYWM8Qm88wys1zvoGCJrb7WX.png"
            alt="XM Global Logo"
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
            <div
              key={index}
              className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 transition-all duration-300 hover:shadow-md"
            >
              <feature.icon className="h-8 w-8 text-[#7497bd] flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg mb-1 text-gray-800">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

