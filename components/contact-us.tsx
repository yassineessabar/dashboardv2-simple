"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MessageSquare, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
      duration: 5000,
    })
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
      <motion.section
        className="text-center relative overflow-hidden py-20 px-6 rounded-3xl bg-gradient-to-br from-[#7497bd] to-[#5a7a9d]"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Contact Us</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            We're here to help. Get in touch with our support team.
          </p>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTR2LTJoLTJ2Mmgyem0tNCAwdi0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnptLTQtOHYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat" />
        </div>
      </motion.section>

      <div className="grid gap-12">
        <motion.div initial="initial" animate="animate" variants={fadeIn} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#7497bd] mb-2">Contact Information</CardTitle>
              <CardDescription>Reach out to us through any of these channels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-[#7497bd] p-3 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">hello@sigmatic-trading.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-[#7497bd] p-3 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <p className="text-gray-600">+61 480 575 144</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#7497bd] mb-2">Support Hours</CardTitle>
              <CardDescription>We're here to assist you during these hours.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-[#7497bd] p-3 rounded-full">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Monday - Friday</h3>
                  <p className="text-gray-600">9:00 AM - 8:00 PM AEST</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-[#7497bd] p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">24/7 Chat Support</h3>
                  <p className="text-gray-600">Available for urgent inquiries</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

