"use client"

import type React from "react"

import { useState } from "react"
import {
  Eye,
  PlusCircle,
  PlayCircle,
  Wallet,
  FileCheck,
  AlertCircle,
  BarChart2,
  DollarSign,
  Percent,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DemoTutorial } from "@/components/demo-tutorial"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const liveAccounts = [
  {
    id: "6025358",
    type: "MT4 Standard",
    login: "6025358",
    leverage: "1:500",
    currency: "USD",
    balance: "10000.00",
    credit: "0.00",
    equity: "10050.00",
    margin: "500.00",
  },
  {
    id: "6025359",
    type: "MT4 ECN",
    login: "6025359",
    leverage: "1:100",
    currency: "EUR",
    balance: "5000.00",
    credit: "0.00",
    equity: "4980.00",
    margin: "250.00",
  },
]

const accountMetrics = [
  { title: "Total Balance", value: "$15,000.00", icon: DollarSign, change: "+5.3%", changeType: "positive" },
  { title: "Total Equity", value: "$15,030.00", icon: BarChart2, change: "+0.2%", changeType: "positive" },
  { title: "Used Margin", value: "$750.00", icon: Percent, change: "-2.1%", changeType: "negative" },
  { title: "Free Margin", value: "$14,280.00", icon: Wallet, change: "+0.5%", changeType: "positive" },
]

const performanceData = [
  { date: "2023-01-01", balance: 10000 },
  { date: "2023-02-01", balance: 10500 },
  { date: "2023-03-01", balance: 11200 },
  { date: "2023-04-01", balance: 10800 },
  { date: "2023-05-01", balance: 11500 },
  { date: "2023-06-01", balance: 12200 },
  { date: "2023-07-01", balance: 13000 },
  { date: "2023-08-01", balance: 13800 },
  { date: "2023-09-01", balance: 14200 },
  { date: "2023-10-01", balance: 15000 },
]

export function TradingAccounts() {
  const [showDemoTutorial, setShowDemoTutorial] = useState(false)
  const hasLiveAccounts = liveAccounts.length > 0

  // Simulated KYC and Deposit status (replace with actual data in a real application)
  const kycStatus = "pending" // or "completed"
  const depositStatus = "pending" // or "completed"

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#7497bd]">Trading Accounts</h1>
        {hasLiveAccounts && (
          <Button
            size="lg"
            className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white"
            onClick={() => {
              // TODO: Implement the logic to create a new live account
              console.log("Create new live account")
            }}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create New Account
          </Button>
        )}
      </div>

      {!hasLiveAccounts ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 space-y-8"
        >
          <h2 className="text-2xl font-bold text-[#7497bd] mb-6 text-center">Create Your Live Trading Account</h2>
          <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            To start trading with a live account, you need to complete the KYC verification process and make an initial
            deposit. Follow the steps below to get started.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AccountSetupCard
              title="KYC Verification"
              description="Verify your identity to ensure account security and comply with regulations."
              status={kycStatus}
              icon={FileCheck}
              href="/kyc"
              buttonText="Complete Verification"
            />
            <AccountSetupCard
              title="Initial Deposit"
              description="Fund your account to start trading. Minimum deposit required: $500."
              status={depositStatus}
              icon={Wallet}
              href="/deposit"
              buttonText="Make Deposit"
            />
          </div>

          <div className="mt-12 text-center">
            <Progress
              value={(kycStatus === "completed" ? 50 : 0) + (depositStatus === "completed" ? 50 : 0)}
              className="w-full max-w-md mx-auto mb-4"
            />
            <p className="text-sm text-gray-600 mb-8">Complete both steps to activate your live trading account</p>
          </div>
        </motion.div>
      ) : (
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-white border-b border-gray-200 w-full justify-start rounded-none p-0">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:text-[#7497bd] data-[state=active]:border-b-2 data-[state=active]:border-[#7497bd] rounded-none px-6 py-3"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="accounts"
              className="data-[state=active]:text-[#7497bd] data-[state=active]:border-b-2 data-[state=active]:border-[#7497bd] rounded-none px-6 py-3"
            >
              Accounts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accountMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className={`text-xs ${metric.changeType === "positive" ? "text-green-500" : "text-red-500"}`}>
                      {metric.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Account Performance</CardTitle>
                <CardDescription>Your account's performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short" })}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`$${value}`, "Balance"]}
                        labelFormatter={(label) =>
                          new Date(label).toLocaleDateString("en-US", { year: "numeric", month: "long" })
                        }
                      />
                      <Line type="monotone" dataKey="balance" stroke="#7497bd" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Login</TableHead>
                      <TableHead className="font-semibold">Leverage</TableHead>
                      <TableHead className="font-semibold">Currency</TableHead>
                      <TableHead className="font-semibold">Balance</TableHead>
                      <TableHead className="font-semibold">Equity</TableHead>
                      <TableHead className="font-semibold">Margin</TableHead>
                      <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {liveAccounts.map((account) => (
                      <TableRow key={account.id} className="hover:bg-gray-50">
                        <TableCell>{account.type}</TableCell>
                        <TableCell className="font-medium text-[#7497bd]">{account.login}</TableCell>
                        <TableCell>{account.leverage}</TableCell>
                        <TableCell>{account.currency}</TableCell>
                        <TableCell>{account.balance}</TableCell>
                        <TableCell>{account.equity}</TableCell>
                        <TableCell>{account.margin}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[#7497bd] hover:text-white hover:bg-[#7497bd]"
                              asChild
                            >
                              <Link href={`/trading/${account.id}`}>
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Link>
                            </Button>
                            <Button size="sm" className="bg-[#7497bd] hover:bg-[#5a7a9d]">
                              <PlusCircle className="w-4 h-4 mr-1" />
                              Deposit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">New to trading? Try our risk-free demo account</h3>
        <Button
          size="lg"
          className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white px-8 py-6 text-lg"
          onClick={() => setShowDemoTutorial(true)}
        >
          <PlayCircle className="w-6 h-6 mr-2" />
          Discover our Demo
        </Button>
        <p className="mt-4 text-gray-600">Practice trading with virtual funds and zero risk</p>
      </div>

      <DemoTutorial open={showDemoTutorial} onOpenChange={setShowDemoTutorial} />
    </div>
  )
}

interface AccountSetupCardProps {
  title: string
  description: string
  status: "pending" | "completed"
  icon: React.ElementType
  href: string
  buttonText: string
}

function AccountSetupCard({ title, description, status, icon: Icon, href, buttonText }: AccountSetupCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm flex flex-col"
    >
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-full ${status === "completed" ? "bg-green-100" : "bg-yellow-100"} mr-4`}>
          <Icon className={`h-6 w-6 ${status === "completed" ? "text-green-600" : "text-yellow-600"}`} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full mr-2 ${status === "completed" ? "bg-green-500" : "bg-yellow-500"}`} />
          <span className={`text-sm font-medium ${status === "completed" ? "text-green-600" : "text-yellow-600"}`}>
            {status === "completed" ? "Completed" : "Pending"}
          </span>
        </div>
        <Button
          asChild
          className={`${
            status === "completed" ? "bg-green-500 hover:bg-green-600" : "bg-[#7497bd] hover:bg-[#5a7a9d]"
          } text-white`}
          disabled={status === "completed"}
        >
          <Link href={href}>
            {status === "completed" ? (
              <>
                <AlertCircle className="w-4 h-4 mr-2" />
                Completed
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4 mr-2" />
                {buttonText}
              </>
            )}
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

