"use client"

import { Copy, ArrowUpDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AffiliateContent() {
  const { toast } = useToast()
  const referralLink = "https://dashboard.sigmatic-trading.com/invite?ref=UD00101"

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    toast({
      description: "Referral link copied to clipboard",
    })
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#7497bd] mb-4">Referral Program</h1>
        <p className="text-gray-600 text-lg mb-2">Invite friends and earn rewards</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#7497bd]">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Share your unique referral link with friends and colleagues. When they sign up and trade, you'll earn a
              percentage of their trading fees.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Earn $100 to your trading account for each successful referral</li>
              <li>No limit on the number of referrals</li>
              <li>Instant rewards credited to your account</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#7497bd]">Your Referral Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-md">
              <code className="flex-1 text-sm text-[#7497bd] font-mono break-all">{referralLink}</code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex-shrink-0 hover:bg-[#7497bd] hover:text-white transition-colors"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="text-sm text-gray-500 italic">Share this link to invite friends and start earning rewards.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#7497bd]">Your Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold text-[#7497bd]">
                  <Button variant="ghost" className="p-0 h-auto font-semibold hover:text-[#7497bd]">
                    USER NAME
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-[#7497bd]">
                  <Button variant="ghost" className="p-0 h-auto font-semibold hover:text-[#7497bd]">
                    EARN TOKEN
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-[#7497bd]">
                  <Button variant="ghost" className="p-0 h-auto font-semibold hover:text-[#7497bd]">
                    REGISTER DATE
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                  No referrals yet. Start sharing your link to earn rewards!
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-gray-600 mb-2">Need help? Contact our support team:</p>
        <a href="mailto:support@sigmatic.io" className="inline-flex items-center text-[#7497bd] hover:underline">
          <ExternalLink className="h-4 w-4 mr-1" />
          support@sigmatic.io
        </a>
      </div>
    </div>
  )
}

