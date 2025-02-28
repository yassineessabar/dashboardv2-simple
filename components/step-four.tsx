"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function StepFour({ formData, updateFormData }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#7497bd]">Step 4: Deposit Funds</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          To start trading, you need to deposit a minimum of $500 into your XM Global account.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="depositAmount" className="text-sm font-medium text-gray-700">
              Deposit Amount
            </Label>
            <Input
              id="depositAmount"
              type="number"
              value={formData.depositAmount}
              onChange={(e) => updateFormData({ depositAmount: e.target.value })}
              placeholder="Enter deposit amount (min. $500)"
              min="500"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="depositProof" className="text-sm font-medium text-gray-700">
              Deposit Proof
            </Label>
            <Input
              id="depositProof"
              type="file"
              onChange={(e) => updateFormData({ depositProof: e.target.files[0] })}
              accept="image/*,.pdf"
            />
            <p className="text-sm text-gray-500 mt-1">Upload a screenshot or PDF of your deposit confirmation</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Need help with depositing funds?{" "}
          <a href="#" className="text-[#7497bd] hover:underline">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  )
}

