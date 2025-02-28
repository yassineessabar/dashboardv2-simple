"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Wallet, Copy, Check, ExternalLink, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"
import { useToast } from "@/components/ui/use-toast"

export function DepositForm() {
  const [amount, setAmount] = useState<string>("")
  const [amountError, setAmountError] = useState<string>("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const validateAmount = (value: string) => {
    const numValue = Number(value)
    if (isNaN(numValue) || numValue < 500) {
      setAmountError("Minimum deposit amount is $500")
    } else {
      setAmountError("")
    }
  }

  const walletAddress = "0xec784217852Obb71f30523bcce4c10adc7e1cec4"

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    toast({
      description: "Wallet address copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePaymentConfirm = () => {
    setShowConfirmation(true)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-[#7497bd]">Deposit Funds</h1>
        <p className="text-gray-600">Securely add funds to your trading account</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#7497bd]">Make a Deposit</CardTitle>
          <CardDescription>Choose your preferred payment method and enter the deposit amount</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="card" className="space-y-6">
            <TabsList className="grid grid-cols-2 gap-4 bg-transparent h-auto p-0">
              <TabsTrigger
                value="card"
                className="data-[state=active]:border-[#7497bd] data-[state=active]:text-[#7497bd] border-2 p-4 h-auto flex flex-col items-center gap-2"
              >
                <CreditCard className="h-6 w-6" />
                <span>Credit Card</span>
              </TabsTrigger>
              <TabsTrigger
                value="crypto"
                className="data-[state=active]:border-[#7497bd] data-[state=active]:text-[#7497bd] border-2 p-4 h-auto flex flex-col items-center gap-2"
              >
                <Wallet className="h-6 w-6" />
                <span>Cryptocurrency</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Deposit Amount</Label>
                  <Input
                    id="amount"
                    placeholder="Enter amount (min. $500)"
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value)
                      validateAmount(e.target.value)
                    }}
                    min="500"
                    step="0.01"
                  />
                  {amountError && <p className="text-red-500 text-sm mt-1">{amountError}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <div className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm text-gray-600">
                    USD
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card">Card Number</Label>
                <Input id="card" placeholder="1234 5678 9012 3456" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>

              <Button
                className="w-full bg-[#7497bd] hover:bg-[#5a7a9d] text-white py-4"
                disabled={!!amountError || amount === "" || Number(amount) < 500}
              >
                Deposit Now
              </Button>
            </TabsContent>

            <TabsContent value="crypto" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <QRCodeSVG value={walletAddress} size={200} className="w-full max-w-[200px] mx-auto" />
                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <Label>Wallet Address (USDT - BEP20)</Label>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg break-all">
                      <code className="text-sm text-[#7497bd] flex-1">{walletAddress}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className={copied ? "text-green-500" : "text-gray-500"}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="crypto-amount">Amount to Deposit (USD)</Label>
                    <Input
                      id="crypto-amount"
                      placeholder="Enter amount (min. $500)"
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value)
                        validateAmount(e.target.value)
                      }}
                      min="500"
                      step="0.01"
                    />
                    {amountError && <p className="text-red-500 text-sm">{amountError}</p>}
                  </div>

                  <Button
                    className="w-full bg-[#7497bd] hover:bg-[#5a7a9d] text-white"
                    disabled={!!amountError || amount === "" || Number(amount) < 500}
                    onClick={handlePaymentConfirm}
                  >
                    I Have Made the Payment
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#7497bd]">Deposit Process Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoItem
              icon={<CheckCircle className="h-5 w-5 text-green-600" />}
              title="1. Choose Method"
              description="Select credit card or cryptocurrency"
            />
            <InfoItem
              icon={<CheckCircle className="h-5 w-5 text-green-600" />}
              title="2. Enter Amount"
              description="Specify the amount you wish to deposit"
            />
            <InfoItem
              icon={<CheckCircle className="h-5 w-5 text-green-600" />}
              title="3. Provide Details"
              description="Enter payment information or wallet address"
            />
            <InfoItem
              icon={<CheckCircle className="h-5 w-5 text-green-600" />}
              title="4. Confirm Deposit"
              description="Review and confirm your deposit"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#7497bd]">Need Assistance?</CardTitle>
          <CardDescription>Our support team is here to help with your deposit</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 text-center sm:text-left">
            If you have any questions or issues with your deposit, we're here to help.
          </p>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/contact" className="inline-flex items-center justify-center">
              Contact Support
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Deposit Request Submitted</h2>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Your deposit is being processed and should be credited to your account once we receive the payment and
              verify the transaction.
            </p>
            <p className="text-sm text-gray-500">This usually takes 15-30 minutes depending on network congestion.</p>
            <Button asChild className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white">
              <Link href="/">
                Go to Dashboard
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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

