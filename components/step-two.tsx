import { CheckCircle, User, FileText, HelpCircle, ArrowRight, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function StepTwo({ formData, updateFormData }) {
  const verificationSteps = [
    {
      title: "Personal Information",
      icon: User,
      questions: [
        "Full name",
        "Date of birth",
        "Address",
        "Phone number",
        "Email address",
        "Preferred language and currency",
      ],
    },
    {
      title: "Investor Profile",
      icon: HelpCircle,
      questions: [
        {
          q: "What is the purpose of opening a trading account with us?",
          a: "To trade and hedge the markets",
        },
        {
          q: "Have you had any forex education or traded at least 15 times in derivative products such as forex or Contracts for Difference (CFDs)?",
          a: "Yes",
        },
        "Your trading experience and financial situation",
      ],
    },
    {
      title: "Document Upload",
      icon: FileText,
      questions: [
        "Government-issued ID (passport, driver's license, or national ID card)",
        "Proof of address (utility bill or bank statement from the last 3 months)",
      ],
    },
  ]

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-[#7497bd]">Step 2: Verify Your XM Global Account</h2>
        <p className="text-xl text-gray-600 mb-8">
          Complete these quick steps to activate your trading account with XM Global.
        </p>
        <Button
          className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white text-lg py-6 px-8 transition-all duration-300 transform hover:scale-105"
          asChild
        >
          <Link href="https://my.xm.com/profile/validate/profile-details" className="flex items-center justify-center">
            Start Verification Process
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#7497bd] to-[#5a7a9d] p-6">
          <CardTitle className="text-2xl font-bold text-white">Verification Steps</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {verificationSteps.map((step, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <h3 className="text-xl font-semibold text-[#7497bd] flex items-center mb-3">
                <step.icon className="h-6 w-6 mr-2" />
                {step.title}
              </h3>
              <ul className="list-disc pl-8 space-y-4">
                {step.questions.map((question, qIndex) => (
                  <li key={qIndex} className="text-gray-600">
                    {typeof question === "string" ? (
                      question
                    ) : (
                      <>
                        <p>{question.q}</p>
                        <Alert className="mt-2 bg-yellow-50 border-yellow-200">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <AlertTitle className="text-yellow-800">Recommended Response</AlertTitle>
                          <AlertDescription className="text-yellow-700 font-medium">{question.a}</AlertDescription>
                        </Alert>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <Alert className="bg-blue-50 border-blue-200 text-blue-800 shadow-md">
        <CheckCircle className="h-6 w-6 text-[#7497bd]" />
        <AlertTitle className="text-lg font-semibold mb-2">Important Note</AlertTitle>
        <AlertDescription className="text-base">
          XM Global requires this information for legal compliance. Accurate information and clear documents will speed
          up your verification.
        </AlertDescription>
      </Alert>

      <div className="text-center">
        <p className="text-sm text-gray-600 mt-4">
          Need help? Contact our support team for assistance with your verification.
        </p>
      </div>
    </div>
  )
}

