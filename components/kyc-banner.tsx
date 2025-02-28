"use client"

import { useState } from "react"
import { Info, ChevronUp, ChevronDown } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface KYCBannerProps {
  isKYCCompleted: boolean
  isDepositCompleted: boolean
  kycStatus: "pending" | "in_review" | "completed"
}

export function KYCBanner({ isKYCCompleted, isDepositCompleted, kycStatus }: KYCBannerProps) {
  const [isMinimized, setIsMinimized] = useState(false)

  if (isKYCCompleted && isDepositCompleted) return null

  return (
    <Alert variant="default" className="mb-6 border-2 border-yellow-400 bg-yellow-50">
      <div className="flex items-start">
        <Info className="h-5 w-5 text-yellow-600 mt-1 mr-2 flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <AlertTitle className="text-yellow-800 text-lg font-semibold">
              Start Live Trading with Sigmatic: Complete These Steps
            </AlertTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-yellow-800 hover:text-yellow-900 hover:bg-yellow-200"
            >
              {isMinimized ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </div>
          <AlertDescription className="text-yellow-700">
            <p className="mb-4">
              To unlock the full potential of Sigmatic's AI-powered trading and start maximizing your profits, please
              complete the following steps:
            </p>
            <div
              className={`space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${
                isMinimized ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 flex-shrink-0"></div>
                    <span>
                      KYC Verification:{" "}
                      {kycStatus === "completed" ? (
                        <span className="text-green-600 font-medium">Completed</span>
                      ) : kycStatus === "in_review" ? (
                        <span className="text-orange-600 font-medium">In Review</span>
                      ) : (
                        <span className="text-red-600 font-medium">Pending</span>
                      )}
                    </span>
                  </div>
                  {kycStatus === "pending" && (
                    <Button asChild className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white shrink-0">
                      <Link href="/kyc">Complete Verification</Link>
                    </Button>
                  )}
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 flex-shrink-0"></div>
                    <span>
                      Minimum Deposit ($500):{" "}
                      {isDepositCompleted ? (
                        <span className="text-green-600 font-medium">Completed</span>
                      ) : (
                        <span className="text-red-600 font-medium">Pending</span>
                      )}
                    </span>
                  </div>
                  {!isDepositCompleted && (
                    <Button asChild className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white shrink-0">
                      <Link href="/deposit">Make Deposit</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  )
}

