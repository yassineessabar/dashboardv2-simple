"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, TrendingUp, ArrowUp, ArrowDown, Play, FileDown, BarChart2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DemoBanner } from "@/components/demo-banner"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PageWithKYCBanner } from "@/components/page-with-kyc-banner"
import { DemoTutorial } from "@/components/demo-tutorial"

export function Dashboard() {
  const [isKYCCompleted, setIsKYCCompleted] = useState(false)
  const [isDepositCompleted, setIsDepositCompleted] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [showDemoTutorial, setShowDemoTutorial] = useState(false)

  const statsData = [
    {
      title: "Total Return",
      value: "518%",
      icon: TrendingUp,
      change: "+12.5%",
      description: "Overall growth and profitability",
    },
    {
      title: "Win Rate",
      value: "96.89%",
      icon: ArrowUpRight,
      change: "+2.3%",
      description: "Success rate of executed trades",
    },
    {
      title: "Total Trades",
      value: "2,433",
      icon: ArrowUpRight,
      change: "-0.8%",
      description: "Volume of executed trades",
    },
  ]

  const handleDownloadReport = () => {
    console.log("Downloading full backtesting report...")
  }

  useEffect(() => {
    const shouldShowDemo = localStorage.getItem("showDemoTutorial")
    if (shouldShowDemo === "true") {
      setShowDemoTutorial(true)
      localStorage.removeItem("showDemoTutorial")
    }
  }, [])

  return (
    <PageWithKYCBanner isKYCCompleted={isKYCCompleted} isDepositCompleted={isDepositCompleted}>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <DemoBanner />
        <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
          <div className="grid gap-6 md:grid-cols-12">
            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-12 lg:col-span-8"
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-white shadow-md border border-gray-200">
                <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                      <div className="p-2 bg-white bg-opacity-20 rounded-full">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold">Strategy Performance</CardTitle>
                        <p className="text-sm text-gray-300 mt-1">Sigmatic 3.5 AI-driven insights</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-10">
                      <BarChart2 className="h-5 w-5 mr-2" />
                    <a href="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67c1a5ae6c1fc283344e0774_Strategy%20Tester_%20sigmatic_mg3.5_cps.pdf" target="_blank">
                     View Details
                    </a>
                     
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0 relative aspect-video bg-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                  <iframe
                    src="https://player.vimeo.com/video/1052668268?h=77dac9d01f&background=1&autoplay=1&loop=1&byline=0&title=0"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVideoPlaying ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 z-20"
                  >
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="bg-white/20 hover:bg-white/30 transition-colors p-4 rounded-full"
                    >
                      <Play className="h-12 w-12 text-white" />
                    </button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white z-20"
                  >
                    <p className="text-sm font-medium">Watch our advanced AI trading strategy in action</p>
                    <p className="text-xs opacity-80">Click to view detailed performance metrics</p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <div className="md:col-span-12 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {statsData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Card className="overflow-hidden bg-white shadow-md border border-gray-200 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-blue-500/20">
                            <item.icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <h3 className="text-sm font-medium text-gray-700">{item.title}</h3>
                        </div>
                        <div className="flex items-center space-x-1">
                          {Number.parseFloat(item.change) > 0 ? (
                            <ArrowUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-red-500" />
                          )}
                          <span
                            className={`text-xs font-medium ${
                              Number.parseFloat(item.change) > 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {item.change}
                          </span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                      <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Backtesting Report Download Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="md:col-span-12"
            >
              <Card className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Full Backtesting Report</h3>
                    <p className="text-gray-300 text-sm md:text-base">
                      Get comprehensive insights into our AI trading strategy's historical performance
                    </p>
                  </div>
                  <Button

                    onClick={handleDownloadReport}
                    className="bg-white text-gray-800 hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-md hover:shadow-lg"
                  >
                    <FileDown className="h-5 w-5" />
                    <a href="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67c1a5ae6c1fc283344e0774_Strategy%20Tester_%20sigmatic_mg3.5_cps.pdf" target="_blank">
                    Download PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <DemoTutorial open={showDemoTutorial} onOpenChange={setShowDemoTutorial} />
    </PageWithKYCBanner>
  )
}

