import { useState } from "react"
import { CheckCircle, User, FileText, InfoIcon, AlertTriangle, Play } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoInstructionBubble } from "./video-instruction-bubble"
import Image from "next/image"

export function StepTwo({ formData, updateFormData }) {
  const [activeVerificationStep, setActiveVerificationStep] = useState("personal")
  
  // Video instructions for each verification step
  const videoInstructions = {
    personal: {
      title: "How to Complete Personal Information",
      videoSrc: "https://www.youtube.com/embed/your-personal-info-video-id" // Replace with your actual YouTube video ID
    },
    investor: {
      title: "How to Complete Investor Profile",
      videoSrc: "https://www.youtube.com/embed/your-investor-profile-video-id" // Replace with your actual YouTube video ID
    },
    documents: {
      title: "How to Upload Verification Documents",
      videoSrc: "https://www.youtube.com/embed/your-document-upload-video-id" // Replace with your actual YouTube video ID
    }
  }

  const handleCompleteVerification = () => {
    // Update the form data to indicate verification is complete
    updateFormData({ 
      verificationComplete: true,
      personalInfoCompleted: true,
      investorProfileCompleted: true,
      documentsSubmitted: true
    });
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Video instruction bubble that changes based on active tab */}
      <VideoInstructionBubble 
        title={videoInstructions[activeVerificationStep].title}
        videoSrc={videoInstructions[activeVerificationStep].videoSrc}
        position="bottom-right"
      />
      
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#7497bd]">Step 2: Account Verification</h2>
        <p className="text-xl text-gray-600 mb-6">
          Complete these verification steps to activate your trading account
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white text-lg py-6 px-8 transition-all duration-300 transform hover:scale-105 shake-animation-delayed attention-button"
            asChild
          >
            <a 
              href="https://my.xmglobal.com/profile/validate/profile-details" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open("https://my.xmglobal.com/profile/validate/profile-details", "_blank");
              }}
            >
              Start Verification Process on XM Website
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="personal" 
        value={activeVerificationStep}
        onValueChange={setActiveVerificationStep}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="personal" className="py-3">Personal Information</TabsTrigger>
          <TabsTrigger value="investor" className="py-3">Investor Profile</TabsTrigger>
          <TabsTrigger value="documents" className="py-3">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card className="shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#1a2233] to-[#111927] p-6">
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <User className="mr-2 h-6 w-6" />
                Personal Information
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-auto text-white hover:bg-white/20"
                  onClick={() => document.querySelector('[data-bubble-video="personal"]')?.click()}
                >
                  <Play className="mr-1 h-4 w-4" />
                  Watch Guide
                </Button>
              </CardTitle>
              <p className="text-gray-300 mt-2">
                Complete your profile details with accurate personal information for verification.
              </p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <AlertTitle className="text-yellow-800 font-medium">Important</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  Please make sure to provide your full name exactly as it appears on your proof of identity and residence for verification purposes.
                </AlertDescription>
              </Alert>
              
              {/* Step 1: Profile Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#7497bd] flex items-center">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#7497bd] text-white font-bold mr-2 text-sm">1</span>
                  Profile Details
                </h3>
                
                <div className="border rounded-lg overflow-hidden shadow-md">
                  <div className="p-4 bg-gray-50 border-b font-medium">Personal Information Form</div>
                  <div className="p-4">
                    <img 
                      src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce0e46ec624e2b732c6b79_Screen%20Shot%202025-03-10%20at%208.41.14%20am.png"
                      alt="Personal information form showing name, date of birth, and phone fields" 
                      className="rounded-md w-full border shadow-sm"
                    />
                    <p className="text-gray-500 mt-3 text-sm">
                      Enter your personal details including your first name, last name, date of birth, and phone number. Make sure all information matches your identification documents.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Step 2: Your Address */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#7497bd] flex items-center">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#7497bd] text-white font-bold mr-2 text-sm">2</span>
                  Your Address
                </h3>
                
                <div className="border rounded-lg overflow-hidden shadow-md">
                  <div className="p-4 bg-gray-50 border-b font-medium">Address Information Form</div>
                  <div className="p-4">
                    <img 
                      src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce0e46bf864b91e7ded287_Screen%20Shot%202025-03-10%20at%208.42.03%20am.png"
                      alt="Personal information form showing address fields" 
                      className="rounded-md w-full border shadow-sm"
                    />
                    <p className="text-gray-500 mt-3 text-sm">
                      Enter your complete address information including country of residence, street address, city/town, street number, and postal code. This address must match the one on your proof of address document.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    updateFormData({ personalInfoCompleted: true });
                    setActiveVerificationStep("investor");
                  }}
                >
                  Continue to Investor Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="investor" className="space-y-6">
          <Card className="shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#1a2233] to-[#111927] p-6">
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <User className="mr-2 h-6 w-6" />
                Investor Profile
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-auto text-white hover:bg-white/20"
                  onClick={() => document.querySelector('[data-bubble-video="investor"]')?.click()}
                >
                  <Play className="mr-1 h-4 w-4" />
                  Watch Guide
                </Button>
              </CardTitle>
              <p className="text-gray-300 mt-2">
                Complete your trading profile to help us understand your investment goals and experience.
              </p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <Alert className="bg-blue-50 border-blue-200">
                <InfoIcon className="h-5 w-5 text-blue-600" />
                <AlertTitle className="text-blue-800 font-medium">Regulatory Requirement</AlertTitle>
                <AlertDescription className="text-blue-700">
                  This information is required for regulatory purposes to ensure you're aware of trading risks and that our products are suitable for you.
                </AlertDescription>
              </Alert>
              
              {/* Step 1: Financial Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#7497bd] flex items-center">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#7497bd] text-white font-bold mr-2 text-sm">1</span>
                  Financial Information
                </h3>
                
                <div className="border rounded-lg overflow-hidden shadow-md">
                  <div className="p-4 bg-gray-50 border-b font-medium">Financial Details Form</div>
                  <div className="p-4">
                    <img 
                      src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce0e47b096a4729b771f7a_Screen%20Shot%202025-03-10%20at%208.43.30%20am.png"
                      alt="Investor profile form showing deposit plans and trading purpose" 
                      className="rounded-md w-full border shadow-sm"
                    />
                    <p className="text-gray-500 mt-3 text-sm">
                      Provide information about your planned deposit amount, the purpose of opening a trading account, employment status, and business nature.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Step 2: Trading Experience */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#7497bd] flex items-center">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#7497bd] text-white font-bold mr-2 text-sm">2</span>
                  Trading Experience
                </h3>
                
                <div className="border rounded-lg overflow-hidden shadow-md">
                  <div className="p-4 bg-gray-50 border-b font-medium">Trading Experience Form</div>
                  <div className="p-4">
                    <img 
                      src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce0e4688b3110eab1179e2_Screen%20Shot%202025-03-10%20at%208.43.37%20am.png"
                      alt="Investor profile form showing trading experience question" 
                      className="rounded-md w-full border shadow-sm"
                    />
                    <p className="text-gray-500 mt-3 text-sm">
                      Confirm whether you have forex education or trading experience in derivative products such as forex or Contracts for Difference (CFDs).
                    </p>
                  </div>
                </div>
              </div>
              
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <AlertTitle className="text-yellow-800 font-medium">Recommended Responses</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Purpose of opening a trading account: <strong>To trade and hedge the markets</strong></li>
                    <li>Trading experience question: <strong>Yes</strong></li>
                  </ul>
                </AlertDescription>
              </Alert>
              
              <Alert className="bg-red-50 border-red-200">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <AlertTitle className="text-red-800 font-medium">Important!</AlertTitle>
                <AlertDescription className="text-red-700">
                  You must select <strong>"Yes"</strong> for the trading experience question to be eligible for a trading account. If you select "No," you will not be able to proceed with account creation.
                </AlertDescription>
              </Alert>
              
              <div className="pt-4 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setActiveVerificationStep("personal")}
                >
                  Previous Step
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    updateFormData({ investorProfileCompleted: true });
                    setActiveVerificationStep("documents");
                  }}
                >
                  Continue to Documents
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-6">
          <Card className="shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#1a2233] to-[#111927] p-6">
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <FileText className="mr-2 h-6 w-6" />
                Document Verification
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-auto text-white hover:bg-white/20"
                  onClick={() => document.querySelector('[data-bubble-video="documents"]')?.click()}
                >
                  <Play className="mr-1 h-4 w-4" />
                  Watch Guide
                </Button>
              </CardTitle>
              <p className="text-gray-300 mt-2">
                Upload required documents to complete your account verification.
              </p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <Alert className="bg-red-50 border-red-200">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <AlertTitle className="text-red-800 font-medium">Important Notice</AlertTitle>
                <AlertDescription className="text-red-700">
                  Trading access and/or withdrawals will not be permitted until your documents have been received and verified.
                </AlertDescription>
              </Alert>
              
              <div className="border rounded-lg overflow-hidden shadow-md">
                <div className="p-4 bg-gray-50 border-b font-medium">Document Verification Screenshot</div>
                <div className="p-4">
                  <img 
                    src="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce11b7ac2c7e70820e3e6a_Screen%20Shot%202025-03-10%20at%209.09.41%20am.png"
                    alt="Document verification page" 
                    className="rounded-md w-full border shadow-sm"
                  />
                  <p className="text-gray-500 mt-3 text-sm">
                    Upload both sides of your identity document and proof of address. Make sure all four corners are visible and the images are clear.
                  </p>
                </div>
              </div>
              
              <Alert className="bg-blue-50 border-blue-200">
                <InfoIcon className="h-5 w-5 text-blue-600" />
                <AlertTitle className="text-blue-800 font-medium">Document Requirements</AlertTitle>
                <AlertDescription className="text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Accepted formats: GIF, JPG, PNG, PDF</li>
                    <li>Maximum file size: 5MB per document</li>
                    <li>Documents needed: Government-issued ID (both sides) and proof of address (utility bill or bank statement from the last 3 months)</li>
                    <li>You may also need to provide a selfie during the verification process</li>
                  </ul>
                </AlertDescription>
              </Alert>
              
              <div className="pt-4 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setActiveVerificationStep("investor")}
                >
                  Previous Step
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleCompleteVerification}
                >
                  Complete Verification
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Alert className="bg-blue-50 border-blue-200 text-blue-800 shadow-md">
        <CheckCircle className="h-6 w-6 text-[#7497bd]" />
        <AlertTitle className="text-lg font-semibold mb-2">Verification Process</AlertTitle>
        <AlertDescription className="text-base">
          Once all verification steps are completed, our team will review your information and documents within 24-48 hours. 
          You will receive an email confirmation when your account is fully verified and ready for trading.
        </AlertDescription>
      </Alert>
      
      {formData.verificationComplete && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800 font-medium">Verification Complete</AlertTitle>
          <AlertDescription className="text-green-700">
            You have successfully completed the verification process. You can now proceed to the next step.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Hidden buttons for video triggers */}
      <button 
        data-bubble-video="personal" 
        className="hidden"
        aria-hidden="true"
      />
      <button 
        data-bubble-video="investor" 
        className="hidden"
        aria-hidden="true"
      />
      <button 
        data-bubble-video="documents" 
        className="hidden"
        aria-hidden="true"
      />
    </div>
  )
}