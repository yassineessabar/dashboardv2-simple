"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Upload, CheckCircle, AlertTriangle, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function StepZero({ formData, updateFormData }) {
  const [emailError, setEmailError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [fileUploads, setFileUploads] = useState({
    identityDocument: null,
    proofOfAddress: null,
  })

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const validatePhone = (phone: string) => {
    // Basic phone validation - can be adjusted based on requirements
    const re = /^\d{6,15}$/
    return re.test(String(phone).replace(/\s+/g, ''))
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

  // Country codes with flags
  const countryCodes = [
    { code: "+1", country: "US/Canada", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+234", country: "Nigeria", flag: "🇳🇬" },
    { code: "+55", country: "Brazil", flag: "🇧🇷" },
    { code: "+52", country: "Mexico", flag: "🇲🇽" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+82", country: "South Korea", flag: "🇰🇷" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+60", country: "Malaysia", flag: "🇲🇾" },
    { code: "+39", country: "Italy", flag: "🇮🇹" },
    { code: "+34", country: "Spain", flag: "🇪🇸" },
    { code: "+7", country: "Russia", flag: "🇷🇺" },
    { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  ]

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

            {/* WhatsApp Phone Number Field with Smaller Flag Box */}
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="whatsappNumber" className="text-sm font-medium text-gray-700">
                WhatsApp Number
              </Label>
              <div className="flex gap-2">
                <div className="w-[100px]"> {/* Reduced width from 1/3 to fixed 100px */}
                  <Select 
                    value={formData.countryCode || "+1"} 
                    onValueChange={(value) => updateFormData({ countryCode: value })}
                  >
                    <SelectTrigger className="px-2"> {/* Reduced padding */}
                      <SelectValue placeholder="Code">
                        {formData.countryCode && (
                          <div className="flex items-center">
                            <span className="mr-1 text-base leading-none">
                              {countryCodes.find(c => c.code === formData.countryCode)?.flag || "🇺🇸"}
                            </span>
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center">
                            <span className="mr-2">{country.flag}</span>
                            <span>{country.code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative flex-1">
                  <Input
                    id="whatsappNumber"
                    type="tel"
                    value={formData.whatsappNumber || ""}
                    onChange={(e) => {
                      const newPhone = e.target.value
                      updateFormData({ whatsappNumber: newPhone })
                      if (newPhone && !validatePhone(newPhone)) {
                        setPhoneError("Please enter a valid phone number")
                      } else {
                        setPhoneError("")
                      }
                    }}
                    placeholder="Enter your WhatsApp number"
                    className={`pl-10 ${phoneError ? "border-red-500" : ""}`}
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              {phoneError && (
                <p className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {phoneError}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                We'll use this for faster communication and important notifications about your trades.
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