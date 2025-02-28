"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Upload, CheckCircle, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function StepZero({ formData, updateFormData }) {
  const [emailError, setEmailError] = useState("")
  const [fileUploads, setFileUploads] = useState({
    identityDocument: null,
    proofOfAddress: null,
  })

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleFileUpload = (field: string, file: File) => {
    setFileUploads((prev) => ({ ...prev, [field]: file }))
    updateFormData({ [field]: file })
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-8"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div className="text-center" variants={fadeInUp}>
        <h2 className="text-3xl font-bold mb-4 text-[#7497bd]">Welcome to Sigmatic Trading</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Let's get you started on your trading journey. Please provide some basic information to personalize your
          experience.
        </p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#7497bd]">Personal Information</CardTitle>
            <CardDescription>Please fill in your details accurately</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData({ fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="pl-10"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </motion.div>

            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    const newEmail = e.target.value
                    updateFormData({ email: newEmail })
                    if (newEmail && !validateEmail(newEmail)) {
                      setEmailError("Please enter a valid email address")
                    } else {
                      setEmailError("")
                    }
                  }}
                  placeholder="Enter your email address"
                  className={`pl-10 ${emailError ? "border-red-500" : ""}`}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              {emailError && (
                <p className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {emailError}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                We'll use this email to send you important updates about your account and trading strategies.
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={fadeInUp}>
              <Label className="text-sm font-medium text-gray-700">Document Upload</Label>
              <div className="grid gap-4 sm:grid-cols-2">
                <FileUploadCard
                  id="identityDocument"
                  label="Identity Document"
                  description="Upload a clear image or PDF of your government-issued ID"
                  file={fileUploads.identityDocument}
                  onFileUpload={(file) => handleFileUpload("identityDocument", file)}
                />
                <FileUploadCard
                  id="proofOfAddress"
                  label="Proof of Address"
                  description="Upload a recent utility bill or bank statement (less than 3 months old)"
                  file={fileUploads.proofOfAddress}
                  onFileUpload={(file) => handleFileUpload("proofOfAddress", file)}
                />
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please ensure all information is accurate and up-to-date. This helps us verify your account quickly and
            securely.
          </AlertDescription>
        </Alert>
      </motion.div>
    </motion.div>
  )
}

function FileUploadCard({ id, label, description, file, onFileUpload }) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-4">
        <Label htmlFor={id} className="text-sm font-medium text-gray-700 mb-2 block">
          {label}
        </Label>
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#7497bd] transition-colors">
          <input
            id={id}
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => onFileUpload(e.target.files[0])}
            accept="image/*,.pdf"
          />
          {file ? (
            <div className="flex items-center justify-center text-[#7497bd]">
              <CheckCircle className="h-6 w-6 mr-2" />
              <span className="text-sm font-medium">{file.name}</span>
            </div>
          ) : (
            <>
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">{description}</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

