"use client"

import type React from "react"

import { useState } from "react"
import { BanknoteIcon as Bank, Wallet, Info, CheckCircle, AlertTriangle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { KYCBanner } from "@/components/kyc-banner"
import Link from "next/link"

export function WithdrawForm() {
  // This should be replaced with actual logic to check KYC status
  const isKYCCompleted = false
  const [amount, setAmount] = useState<string>("")
  const [amountError, setAmountError] = useState<string | null>(null)

  const validateAmount = (value: string) => {
    const numValue = Number(value)
    if (isNaN(numValue)) {
      setAmountError("Please enter a valid number.")
    } else if (numValue < 500) {
      setAmountError("Minimum withdrawal amount is $500.")
    } else {
      setAmountError(null)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <KYCBanner isKYCCompleted={isKYCCompleted} />

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-[#7497bd]">Withdraw Funds</h1>
        <p className="text-gray-600">Securely withdraw your funds to your preferred destination</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#7497bd]">Important Withdrawal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Withdrawal Limits</AlertTitle>
            <AlertDescription>Minimum: $500 | Maximum: $50,000 per transaction</AlertDescription>
          </Alert>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoItem
              icon={<Info className="h-5 w-5 text-blue-600" />}
              title="Processing Time"
              description="1-3 business days for most withdrawals"
            />
            <InfoItem
              icon={<Info className="h-5 w-5 text-blue-600" />}
              title="Fees"
              description="No hidden fees for standard withdrawals"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#7497bd]">Withdrawal Request</CardTitle>
          <CardDescription>Choose your withdrawal method and enter the required information</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bank" className="space-y-6">
            <TabsList className="grid grid-cols-2 gap-4 bg-transparent h-auto p-0">
              <TabsTrigger
                value="bank"
                className="data-[state=active]:border-[#7497bd] data-[state=active]:text-[#7497bd] border-2 p-4 h-auto flex flex-col items-center gap-2"
              >
                <Bank className="h-6 w-6" />
                <span>Bank Transfer</span>
              </TabsTrigger>
              <TabsTrigger
                value="crypto"
                className="data-[state=active]:border-[#7497bd] data-[state=active]:text-[#7497bd] border-2 p-4 h-auto flex flex-col items-center gap-2"
              >
                <Wallet className="h-6 w-6" />
                <span>Cryptocurrency</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bank" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Withdrawal Amount</Label>
                <Input
                  id="amount"
                  placeholder="Enter amount (min. $500)"
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    validateAmount(e.target.value)
                  }}
                />
                {amountError && <p className="text-red-500 text-sm">{amountError}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input id="bank-name" placeholder="Enter your bank name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input id="account-number" placeholder="Enter your account number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="swift">SWIFT/BIC Code</Label>
                <Input id="swift" placeholder="Enter SWIFT/BIC code" />
              </div>
            </TabsContent>

            <TabsContent value="crypto" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="crypto-amount">Withdrawal Amount</Label>
                <Input
                  id="crypto-amount"
                  placeholder="Enter amount (min. $500)"
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    validateAmount(e.target.value)
                  }}
                />
                {amountError && <p className="text-red-500 text-sm">{amountError}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="wallet-address">Wallet Address</Label>
                <Input id="wallet-address" placeholder="Enter your cryptocurrency wallet address" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crypto-network">Cryptocurrency Network</Label>
                <Input id="crypto-network" placeholder="e.g., ERC20, BEP20, TRC20" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-[#7497bd] hover:bg-[#5a7a9d] text-white"
            disabled={!!amountError || amount === "" || Number(amount) < 500}
          >
            Submit Withdrawal Request
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#7497bd]">Withdrawal Process Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoItem
              icon={<CheckCircle className="h-5 w-5 text-green-600" />}
              title="1. Choose Method"
              description="Select bank transfer or cryptocurrency"
            />
            <InfoItem
              icon={<CheckCircle className="h-5 w-5 text-green-600" />}
              title="2. Enter Details"
              description="Provide withdrawal amount and necessary information"
            />
            <InfoItem
              icon={<CheckCircle className="h-5 w-5 text-green-600" />}
              title="3. Confirm Request"
              description="Review and submit your withdrawal request"
            />
            <InfoItem
              icon={<CheckCircle className="h-5 w-5 text-green-600" />}
              title="4. Processing"
              description="We'll process your request within 1-3 business days"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#7497bd]">Need Assistance?</CardTitle>
          <CardDescription>Our support team is here to help with your withdrawal</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 text-center sm:text-left">
            If you have any questions or concerns about your withdrawal, we're here to help.
          </p>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/contact" className="inline-flex items-center justify-center">
              Contact Support
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function InfoItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="mt-1 bg-gray-100 p-2 rounded-full">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}

