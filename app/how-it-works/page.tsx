"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, ArrowRight, Star, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto pt-6 pb-12 px-4">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">How It Works</h1>
        <p className="text-gray-600 mt-2">Learn how Sigmatic AI helps you trade smarter</p>
      </div>

      <Card className="border-0 shadow-md overflow-hidden mb-10">
        <CardContent className="p-0">
          {/* Video header */}
          <div className="relative h-56 md:h-72 w-full overflow-hidden">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67a7c67b1ef7e64ca306f7f7_LIQUID_ART_by_gleb-transcode.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="text-center p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome to Sigmatic AI</h2>
                <p className="text-white text-lg">Trade smarter with the power of artificial intelligence</p>
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="p-6 md:p-8">
            <div className="space-y-8">
              {/* Introduction */}
              <div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Trading Simplified</h3>
                <p className="text-gray-700 mb-4">
                  Sigmatic uses advanced AI algorithms to analyze markets, identify opportunities, and execute trades automatically on your behalf. No prior trading experience required.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">24/7 Automated Trading</h4>
                      <p className="text-sm text-gray-600 mt-1">Our AI trades around the clock, never missing an opportunity</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Advanced Risk Management</h4>
                      <p className="text-sm text-gray-600 mt-1">Sophisticated controls to protect your capital</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Hands-Off Investing</h4>
                      <p className="text-sm text-gray-600 mt-1">Set up once and let the AI do the work for you</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Real-Time Performance</h4>
                      <p className="text-sm text-gray-600 mt-1">Track your results in a comprehensive dashboard</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategy Options */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Choose Your Strategy</h3>
                <Tabs defaultValue="conservative" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="conservative">Conservative</TabsTrigger>
                    <TabsTrigger value="balanced">Balanced</TabsTrigger>
                    <TabsTrigger value="aggressive">Aggressive</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="conservative" className="border rounded-lg p-5">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Conservative Strategy</h4>
                        <div className="flex">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <Star className="h-4 w-4 text-gray-300" />
                          <Star className="h-4 w-4 text-gray-300" />
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        Lower risk approach focused on capital preservation with consistent returns. Ideal for beginners or risk-averse investors.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Expected Annual Return</span>
                          <span className="text-sm font-medium">15-25%</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Risk Level</span>
                          <span className="text-sm font-medium">Low</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Recommended For</span>
                          <span className="text-sm font-medium">New Traders</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="balanced" className="border rounded-lg p-5">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Balanced Strategy</h4>
                        <div className="flex">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <Star className="h-4 w-4 text-gray-300" />
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        Moderate risk approach that balances growth with reasonable safety. Ideal for investors seeking growth with manageable volatility.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Expected Annual Return</span>
                          <span className="text-sm font-medium">25-40%</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Risk Level</span>
                          <span className="text-sm font-medium">Medium</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Recommended For</span>
                          <span className="text-sm font-medium">Most Traders</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="aggressive" className="border rounded-lg p-5">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Aggressive Strategy</h4>
                        <div className="flex">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        Higher risk approach focused on maximum growth. Best for experienced traders comfortable with market volatility.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Expected Annual Return</span>
                          <span className="text-sm font-medium">40%+</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Risk Level</span>
                          <span className="text-sm font-medium">High</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Recommended For</span>
                          <span className="text-sm font-medium">Experienced Traders</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Simple Steps */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Getting Started in 3 Simple Steps</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-900 text-white flex items-center justify-center mr-4">1</div>
                    <div>
                      <h4 className="font-medium">Create Your Account</h4>
                      <p className="text-sm text-gray-600 mt-1">Sign up and verify your identity to ensure account security</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-900 text-white flex items-center justify-center mr-4">2</div>
                    <div>
                      <h4 className="font-medium">Choose Your Strategy & Deposit</h4>
                      <p className="text-sm text-gray-600 mt-1">Select your preferred trading approach and fund your account</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-900 text-white flex items-center justify-center mr-4">3</div>
                    <div>
                      <h4 className="font-medium">Activate AI Trading</h4>
                      <p className="text-sm text-gray-600 mt-1">Turn on the system and monitor your results as the AI works for you</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Minimum Deposit */}
              <div className="bg-blue-50 border border-blue-100 rounded-md p-5">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <HelpCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">Minimum Deposit Information</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      The minimum deposit to start with Sigmatic AI Trading is $250. For optimal performance and risk management, we recommend starting with $500 or more.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-blue-800 shadow-sm">
                        Minimum: $250
                      </div>
                      <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-blue-800 shadow-sm">
                        Recommended: $500+
                      </div>
                      <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-blue-800 shadow-sm">
                        Optimal: $1,000+
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Testimonials */}
              <div>
                <h3 className="text-xl font-semibold mb-4">What Our Users Say</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                    <div className="flex mb-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <p className="text-gray-700 italic text-sm mb-3">
                      "I've tried several trading systems before, but Sigmatic's AI is on another level. The returns have been consistent and the platform is so easy to use."
                    </p>
                    <p className="text-sm font-medium">David M.</p>
                    <p className="text-xs text-gray-500">Trader since 2022</p>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                    <div className="flex mb-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <p className="text-gray-700 italic text-sm mb-3">
                      "As someone with zero trading experience, this platform has been life-changing. I just set it up and let the AI do its magic."
                    </p>
                    <p className="text-sm font-medium">Sarah K.</p>
                    <p className="text-xs text-gray-500">Trader since 2023</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/get-started" className="flex-1">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                      Create Real Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/demo-tutorial" className="flex-1">
                    <Button variant="outline" className="w-full border-gray-300">
                      Try Demo Account
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* FAQ Quick Access */}
      <div className="text-center">
        <h3 className="text-lg font-medium mb-3">Have Questions?</h3>
        <p className="text-sm text-gray-600 mb-4">Check our frequently asked questions or contact our support team</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/faq">
            <Button variant="outline" className="border-gray-300">
              View FAQ
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="border-gray-300">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}