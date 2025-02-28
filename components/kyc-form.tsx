"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Shield, Info, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"

export function KYCForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    address: "",
    identityDocument: null,
    addressDocument: null,
  })
  const [progress, setProgress] = useState(0)
  const [acknowledgement, setAcknowledgement] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    updateProgress()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] })
    updateProgress()
  }

  const updateProgress = () => {
    const totalFields = Object.keys(formData).length
    const filledFields = Object.values(formData).filter((value) => value !== "" && value !== null).length
    setProgress((filledFields / totalFields) * 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acknowledgement) {
      toast({
        title: "Acknowledgement Required",
        description: "Please acknowledge the use of your verification information for regulatory purposes.",
        variant: "destructive",
      })
      return
    }
    // Here you would typically call your API to submit KYC data
    console.log("KYC data:", formData)
    toast({
      title: "KYC Submission Successful",
      description: "Your KYC documents have been submitted for review. We'll notify you once verified.",
    })
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">KYC Verification</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#7497bd]">Why KYC is Important</CardTitle>
            <CardDescription>Understanding the KYC process and its benefits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-500 mr-2 mt-1" />
              <p>KYC helps us prevent fraud and ensure the security of all our users.</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1" />
              <p>Your information is encrypted and stored securely.</p>
            </div>
            <div className="flex items-start">
              <Info className="h-5 w-5 text-yellow-500 mr-2 mt-1" />
              <p>KYC is a one-time process. Once approved, you can trade without restrictions.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#7497bd]">Personal Information</CardTitle>
            <CardDescription>Please provide accurate information for verification</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Residential Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="identityDocument">Identity Document</Label>
                <Input
                  id="identityDocument"
                  name="identityDocument"
                  type="file"
                  onChange={handleFileChange}
                  required
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressDocument">Proof of Address</Label>
                <Input
                  id="addressDocument"
                  name="addressDocument"
                  type="file"
                  onChange={handleFileChange}
                  required
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acknowledgement"
                  checked={acknowledgement}
                  onCheckedChange={(checked) => setAcknowledgement(checked as boolean)}
                />
                <label
                  htmlFor="acknowledgement"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I consent to the use of my KYC details to set up my trading account.
                </label>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <div className="w-full mb-4">
              <Label>Completion Progress</Label>
              <Progress value={progress} className="mt-2" />
            </div>
            <Button type="submit" className="w-full bg-[#7497bd] hover:bg-[#5a7a9d] text-white">
              Submit KYC Documents <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Document Guidelines</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              <li>Ensure documents are clear and legible</li>
              <li>Files should be in JPG, PNG, or PDF format</li>
              <li>Maximum file size: 5MB per document</li>
            </ul>
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#7497bd]">KYC Process Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Submit your personal information and documents</li>
              <li>Our team reviews your information (typically within 24-48 hours)</li>
              <li>Receive confirmation email once approved</li>
              <li>Start trading with full account features</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#7497bd]">Need Assistance?</CardTitle>
            <CardDescription>Our support team is here to help with your KYC verification</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-sm text-gray-600">If you have any questions or issues, don't hesitate to reach out.</p>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

