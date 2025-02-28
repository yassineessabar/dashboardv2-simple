"use client"

import { useState } from "react"
import { Copy, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface AccountDetailsProps {
  params: {
    id: string
  }
}

export default function AccountDetailsPage({ params }: AccountDetailsProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [showTradingPassword, setShowTradingPassword] = useState(false)
  const [showInvestorPassword, setShowInvestorPassword] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      description: "Copied to clipboard",
    })
  }

  // This would normally come from an API call using the ID
  const accountDetails = {
    accountType: "MT4 Standard",
    server: "ErranteSC-Real3",
    createdAt: "2025-02-08 13:10",
    login: "6025358",
    tradingPassword: "TradingPass123",
    investorPassword: "InvestorPass456",
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="bg-gray-50 min-h-[calc(100vh-4rem)] p-6">
          <div className="max-w-3xl mx-auto">
            <Button
              variant="ghost"
              className="mb-4 text-[#7497bd] hover:text-[#5a7a9d] hover:bg-[#7497bd]/10"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Trading Accounts
            </Button>

            <h1 className="text-2xl font-bold text-[#7497bd] mb-6">Account Details</h1>

            <div className="bg-white rounded-lg shadow-sm border">
              <div className="divide-y">
                <DetailRow
                  label="Account Type"
                  value={accountDetails.accountType}
                  onCopy={() => handleCopy(accountDetails.accountType)}
                />
                <DetailRow
                  label="Server"
                  value={accountDetails.server}
                  onCopy={() => handleCopy(accountDetails.server)}
                />
                <DetailRow
                  label="Created At"
                  value={accountDetails.createdAt}
                  onCopy={() => handleCopy(accountDetails.createdAt)}
                />
                <DetailRow
                  label="Trading Platform Login"
                  value={accountDetails.login}
                  onCopy={() => handleCopy(accountDetails.login)}
                />
                <DetailRow
                  label="Trading Platform Password"
                  value={showTradingPassword ? accountDetails.tradingPassword : "**********"}
                  showViewButton
                  isPasswordVisible={showTradingPassword}
                  onViewClick={() => setShowTradingPassword(!showTradingPassword)}
                  onCopy={() => handleCopy(accountDetails.tradingPassword)}
                />
                <DetailRow
                  label="Investor Password"
                  value={showInvestorPassword ? accountDetails.investorPassword : "**********"}
                  showViewButton
                  isPasswordVisible={showInvestorPassword}
                  onViewClick={() => setShowInvestorPassword(!showInvestorPassword)}
                  onCopy={() => handleCopy(accountDetails.investorPassword)}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

interface DetailRowProps {
  label: string
  value: string
  showViewButton?: boolean
  isPasswordVisible?: boolean
  onCopy?: () => void
  onViewClick?: () => void
}

function DetailRow({ label, value, showViewButton, isPasswordVisible, onCopy, onViewClick }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50">
      <div className="text-gray-600">{label}</div>
      <div className="flex items-center gap-3">
        <span className="font-medium">{value}</span>
        {showViewButton ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="text-[#7497bd] hover:text-white hover:bg-[#7497bd]"
              onClick={onViewClick}
            >
              {isPasswordVisible ? (
                <>
                  <EyeOff className="h-4 w-4 mr-1" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </>
              )}
            </Button>
            {isPasswordVisible && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-[#7497bd]"
                onClick={onCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#7497bd]" onClick={onCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

