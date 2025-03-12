"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, ChevronRight, HelpCircle, Shield, Star, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Feature card component
const FeatureCard = ({ icon, title, description }) => (
  <Card className="h-full">
    <CardHeader className="pb-2">
      <div className="mb-2 bg-blue-50 rounded-full w-10 h-10 flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-sm">{description}</CardDescription>
    </CardContent>
  </Card>
)

// Testimonial card component
const TestimonialCard = ({ quote, name, title, rating }) => (
  <Card className="h-full border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
    <CardHeader className="pb-2">
      <div className="flex space-x-1 mb-2">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <p className="font-medium text-sm">{name}</p>
      <p className="text-xs text-gray-500">{title}</p>
    </CardContent>
  </Card>
)

// Step Card component
const StepCard = ({ number, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
      {number}
    </div>
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
)

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">How Sigmatic AI Trading Works</h1>
        <p className="text-xl text-gray-600">Smart algorithms. Real results. Trade with confidence.</p>
      </div>

      {/* Hero Section */}
      <Card className="mb-10 overflow-hidden border-0 shadow-xl">
        <div className="md:flex">
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              AI-Powered Trading
            </h2>
            <p className="text-lg mb-6 text-gray-600">
              Sigmatic uses advanced machine learning algorithms to analyze markets, identify opportunities, and execute trades with precision.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>24/7 Automated Trading</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Real-time Market Analysis</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Risk Management Controls</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>No Prior Trading Experience Required</span>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/get-started">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                  Get Started Now
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 bg-gray-900 md:bg-transparent">
            <div className="h-full w-full relative overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67a7c67b1ef7e64ca306f7f7_LIQUID_ART_by_gleb-transcode.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 md:flex items-center justify-center hidden">
                <div className="text-white text-center px-10">
                  <h3 className="text-2xl font-bold mb-2">AI-Powered Excellence</h3>
                  <p>Our algorithms have been trained on years of market data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* How It Works Steps */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Getting Started Is Simple</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <StepCard
                number="1"
                title="Create Your Account"
                description="Sign up in minutes with your email and basic information. No complex paperwork required."
              />
            </motion.div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <StepCard
                number="2"
                title="Connect Your Trading Account"
                description="Link your existing trading account or set up a new one with our trusted broker partners."
              />
            </motion.div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <StepCard
                number="3"
                title="Fund Your Account"
                description="Make your initial deposit and select your risk tolerance and trading preferences."
              />
            </motion.div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <StepCard
                number="4"
                title="Activate AI Trading"
                description="Our system begins analyzing markets and executing trades on your behalf using advanced algorithms."
              />
            </motion.div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <StepCard
                number="5"
                title="Monitor Performance"
                description="Track your results in real-time through your personalized dashboard with detailed analytics."
              />
            </motion.div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <StepCard
                number="6"
                title="Withdraw Profits Anytime"
                description="Access your funds and profits whenever you want with our streamlined withdrawal process."
              />
            </motion.div>
          </Card>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="AI-Powered Analytics"
              description="Our algorithm analyzes thousands of market indicators in real-time to identify the most profitable opportunities."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Risk Management"
              description="Advanced controls protect your capital with stop-loss mechanisms and customizable risk parameters."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FeatureCard
              icon={<HelpCircle className="h-5 w-5" />}
              title="24/7 Support"
              description="Our dedicated team is always available to assist with any questions or technical support needs."
            />
          </motion.div>
        </div>
      </div>

      {/* Trading Strategies Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Trading Strategies</h2>
        <Tabs defaultValue="strategy1" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="strategy1">Conservative</TabsTrigger>
            <TabsTrigger value="strategy2">Balanced</TabsTrigger>
            <TabsTrigger value="strategy3">Aggressive</TabsTrigger>
          </TabsList>
          <TabsContent value="strategy1">
            <Card>
              <CardHeader>
                <CardTitle>Conservative Strategy</CardTitle>
                <CardDescription>
                  Lower risk approach with steady, consistent returns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Our conservative strategy focuses on stable assets and longer-term positions to minimize volatility while generating consistent returns. Ideal for beginners and risk-averse investors.</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Target annual returns: 15-25%</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Lower drawdown periods</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Focus on major currency pairs and blue-chip stocks</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="strategy2">
            <Card>
              <CardHeader>
                <CardTitle>Balanced Strategy</CardTitle>
                <CardDescription>
                  Moderate risk with optimized returns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">The balanced strategy provides a middle ground, taking calculated risks while maintaining reasonable safety measures. Perfect for traders with some experience looking for growth.</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Target annual returns: 25-40%</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Moderate volatility with controlled drawdowns</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Diversified asset selection across multiple markets</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="strategy3">
            <Card>
              <CardHeader>
                <CardTitle>Aggressive Strategy</CardTitle>
                <CardDescription>
                  Higher risk with potential for greater returns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Our aggressive strategy pursues maximum growth through higher-risk, higher-reward opportunities. Designed for experienced traders comfortable with market volatility.</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Target annual returns: 40%+</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Higher volatility with potential for larger drawdowns</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Includes exotic pairs, commodities, and cryptocurrency markets</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* User Testimonials */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TestimonialCard
            quote="I never thought trading could be this simple. The AI does all the work while I focus on my day job. My returns have been impressive and consistent."
            name="David Thompson"
            title="Business Owner"
            rating={5}
          />
          <TestimonialCard
            quote="After trying several trading systems, Sigmatic's AI technology is clearly superior. The automated risk management gives me peace of mind."
            name="Sarah Johnson"
            title="Financial Analyst"
            rating={5}
          />
          <TestimonialCard
            quote="As someone with zero trading experience, this platform has been life-changing. The setup was easy and the support team is always helpful."
            name="Michael Chen"
            title="Software Engineer"
            rating={4}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white rounded-xl p-8 md:p-12 text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Trading with AI?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of traders who are already benefiting from our cutting-edge AI technology. Get started in minutes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/get-started">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto">
              Create Real Account
            </Button>
          </Link>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto" onClick={() => {}}>
            Try Demo Account
          </Button>
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How much money do I need to start?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The minimum deposit to start with Sigmatic AI Trading is $250. However, we recommend starting with at least $500 to optimize performance and allow the algorithm more flexibility.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Do I need trading experience?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No trading experience is required. Our system is fully automated and designed to be user-friendly for beginners while offering advanced features for experienced traders.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How quickly can I withdraw my profits?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Withdrawal processing typically takes 1-3 business days depending on your payment method and location. There are no lockup periods - you can access your funds anytime.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What markets does the AI trade?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Our AI specializes in forex, commodities, stocks, and cryptocurrency markets. The specific assets traded depend on your selected strategy and risk profile.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}