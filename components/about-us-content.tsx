"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Zap, TrendingUp, Clock, DollarSign, BarChart2, Users, ArrowRight, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export function AboutUsContent() {
  const [activeTab, setActiveTab] = useState("overview")

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      <motion.section
        className="text-center relative overflow-hidden py-16 px-6 rounded-3xl bg-gradient-to-br from-[#7497bd] to-[#5a7a9d]"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">About Sigmatic Trading</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Revolutionizing trading with AI-powered precision and ease.
          </p>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTR2LTJoLTJ2Mmgyem0tNCAwdi0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnptLTQtOHYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat" />
        </div>
      </motion.section>

      <motion.section className="grid md:grid-cols-2 gap-8" initial="initial" animate="animate" variants={fadeIn}>
        <Card className="bg-gradient-to-br from-[#7497bd] to-[#5a7a9d] text-white overflow-hidden group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl group-hover:translate-x-2 transition-transform duration-300">
              <Zap className="mr-2" /> Reliable AI
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg relative">
            <p className="mb-4">
              Our bot leverages cutting-edge technology with over 90% accuracy in identifying lucrative trading
              opportunities.
            </p>
            <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
              <Zap className="w-32 h-32" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#7497bd] to-[#5a7a9d] text-white overflow-hidden group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl group-hover:translate-x-2 transition-transform duration-300">
              <TrendingUp className="mr-2" /> Easy Automation
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg relative">
            <p className="mb-4">
              Effortlessly execute trades with our advanced automation, saving you time and maximizing efficiency.
            </p>
            <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
              <TrendingUp className="w-32 h-32" />
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section initial="initial" animate="animate" variants={fadeIn} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#7497bd] inline-block relative">
          Unparalleled Benefits
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#7497bd] to-[#5a7a9d]"></span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: DollarSign,
              title: "Risk-Free Start",
              description: "Begin your journey with our bot at no initial cost.",
            },
            {
              icon: BarChart2,
              title: "Proven Strategies",
              description: "Benefit from time-tested methods ensuring consistent performance.",
            },
            {
              icon: Clock,
              title: "Quick Setup",
              description: "Be ready to trade in under 20 minutes, regardless of experience.",
            },
            {
              icon: TrendingUp,
              title: "Rapid Results",
              description: "Witness potential earnings within days of starting.",
            },
            {
              icon: DollarSign,
              title: "Accessible Entry",
              description: "Commence your trading adventure with a modest $500 investment.",
            },
            {
              icon: Star,
              title: "24/7 Support",
              description: "Access our dedicated support team anytime you need assistance.",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="mb-4 w-16 h-16 mx-auto bg-[#7497bd] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-[#7497bd] group-hover:text-[#5a7a9d] transition-colors duration-300">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">{benefit.description}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="bg-gradient-to-r from-[#7497bd] to-[#5a7a9d] text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Exceptional Performance</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <DollarSign className="h-10 w-10 mr-4 text-yellow-300" />
                <h3 className="text-2xl font-semibold">Impressive Daily Returns</h3>
              </div>
              <p className="text-lg">Consistently achieve 0.5%–5% returns each day.</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <BarChart2 className="h-10 w-10 mr-4 text-green-300" />
                <h3 className="text-2xl font-semibold">Intelligent Trading</h3>
              </div>
              <p className="text-lg">Our AI only executes trades under optimal conditions for maximum success.</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTR2LTJoLTJ2Mmgyem0tNCAwdi0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnptLTQtOHYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat" />
        </div>
      </motion.section>

      <motion.section initial="initial" animate="animate" variants={fadeIn} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#7497bd] inline-block relative">
          Our Expert Team
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#7497bd] to-[#5a7a9d]"></span>
        </h2>
        <Card className="max-w-3xl mx-auto hover:shadow-lg transition-shadow duration-300">
          <CardContent className="py-8 px-6">
            <div className="flex items-center justify-center mb-6">
              <Users className="h-20 w-20 text-[#7497bd]" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our team of seasoned professionals brings extensive experience in quantitative finance, developing
              innovative solutions that consistently deliver outstanding results. With backgrounds in AI, finance, and
              software engineering, we're committed to pushing the boundaries of what's possible in algorithmic trading.
            </p>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section className="text-center" initial="initial" animate="animate" variants={fadeIn}>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#7497bd] inline-block relative">
          Discover Sigmatic Trading
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#7497bd] to-[#5a7a9d]"></span>
        </h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="overview"
              className="text-lg py-3 data-[state=active]:border-b-2 data-[state=active]:border-[#7497bd]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="features"
              className="text-lg py-3 data-[state=active]:border-b-2 data-[state=active]:border-[#7497bd]"
            >
              Features
            </TabsTrigger>
            <TabsTrigger
              value="testimonials"
              className="text-lg py-3 data-[state=active]:border-b-2 data-[state=active]:border-[#7497bd]"
            >
              Testimonials
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#7497bd]">AI-Powered Trading</CardTitle>
                <CardDescription className="text-lg">
                  Experience the future of trading with our advanced AI technology.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-700 text-lg leading-relaxed">
                <p>
                  Sigmatic Trading combines cutting-edge artificial intelligence with years of financial expertise to
                  provide you with a powerful, easy-to-use trading platform. Our AI analyzes market trends, executes
                  trades, and continuously learns to improve its performance, giving you a significant edge in the
                  competitive world of trading.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#7497bd]">Key Features</CardTitle>
                <CardDescription className="text-lg">Discover what sets Sigmatic Trading apart.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-6 w-6 text-green-500" />
                    <span className="text-lg">Advanced AI algorithms for market analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-6 w-6 text-green-500" />
                    <span className="text-lg">Real-time market data processing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-6 w-6 text-green-500" />
                    <span className="text-lg">Automated trade execution</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-6 w-6 text-green-500" />
                    <span className="text-lg">Risk management tools</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-6 w-6 text-green-500" />
                    <span className="text-lg">User-friendly interface for easy navigation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#7497bd]">What Our Users Say</CardTitle>
                <CardDescription className="text-lg">
                  Read about the experiences of our satisfied clients.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <blockquote className="border-l-4 border-[#7497bd] pl-4 italic text-gray-700 text-lg">
                  "Sigmatic Trading has transformed my approach to the markets. The AI-driven insights have
                  significantly improved my trading performance. I've seen consistent returns and feel more confident in
                  my trading decisions."
                </blockquote>
                <p className="text-right mt-2 text-gray-600">- John D., Professional Trader</p>
                <blockquote className="border-l-4 border-[#7497bd] pl-4 italic text-gray-700 text-lg">
                  "As a newcomer to trading, I was intimidated by the complexity of the markets. Sigmatic Trading's
                  user-friendly interface and AI assistance have made it possible for me to start trading with
                  confidence. The results have been amazing!"
                </blockquote>
                <p className="text-right mt-2 text-gray-600">- Sarah M., Beginner Trader</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.section>

      <motion.section className="text-center mt-16" initial="initial" animate="animate" variants={fadeIn}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#7497bd]">Begin Your Trading Journey</h2>
        <p className="text-xl mb-8 text-gray-700 max-w-2xl mx-auto">
          Join Sigmatic Trading today and experience the power of AI-driven trading strategies.
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-[#7497bd] to-[#5a7a9d] hover:from-[#5a7a9d] hover:to-[#7497bd] text-white text-xl px-10 py-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          asChild
        >
          <Link href="/kyc">
            Start Trading Now <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
      </motion.section>
    </div>
  )
}

