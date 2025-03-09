import { 
  CheckCircle, 
  InfoIcon, 
  ArrowRight, 
  DollarSign, 
  CreditCard, 
  Settings,
  Clock,
  BarChart3,
  Play,
  CreditCard as CardIcon,
  Building,
    AlertTriangle

} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { VideoInstructionBubble } from "./video-instruction-bubble"
import Image from "next/image"

export function StepThree({ formData, updateFormData }) {
  const [activeTab, setActiveTab] = useState("deposit")
  const [selectedDepositMethod, setSelectedDepositMethod] = useState("card")
  
  // Video instructions for each step
  const videoInstructions = {
    deposit: {
      title: "How to Deposit Funds",
      videoSrc: "https://www.youtube.com/embed/your-deposit-video-id"
    },
    account: {
      title: "Setting Up Your Trading Account",
      videoSrc: "https://www.youtube.com/embed/your-account-setup-video-id"
    }
  }
  
  const handleSkipDeposit = () => {
    updateFormData({ 
      depositVerified: true,
      stayInDemo: true,
      accountType: "MT4 Standard",
      leverage: "1:500",
      currency: "USD"
    });
  }
  
  const handleMoveToSetup = () => {
    setActiveTab("account");
  }
  
  const handleSetupLiveAccount = () => {
    updateFormData({ 
      depositVerified: true,
      stayInDemo: false,
      accountType: "MT4 Standard",
      leverage: "1:500",
      currency: "USD"
    });
  }
  
  const handleSelectDepositMethod = (method) => {
    setSelectedDepositMethod(method);
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Video instruction bubble for the current tab */}
      <VideoInstructionBubble 
        title={videoInstructions[activeTab].title}
        videoSrc={videoInstructions[activeTab].videoSrc}
        position="bottom-right"
      />
      
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-[#7497bd]">Step 3: Fund Your Trading Account</h2>
        <p className="text-xl text-gray-600 mb-6">
          Deposit a minimum of $650 to start trading with real funds
        </p>
        <div className="flex justify-center space-x-4 mb-8">
                    <Button
            className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white text-lg py-6 px-8 transition-all duration-300 transform hover:scale-105 shake-animation-delayed attention-button"
            asChild
          >
            <a 
              href="https://my.xmglobal.com/payment/deposit" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open("https://my.xmglobal.com/profile/validate/profile-details", "_blank");
              }}
            >
              Go to Deposit Page
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="deposit" className="py-3">
            <DollarSign className="mr-2 h-4 w-4" />
            Deposit Instructions
          </TabsTrigger>
          <TabsTrigger value="account" className="py-3">
            <Settings className="mr-2 h-4 w-4" />
            Real Account Setup
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="deposit" className="space-y-6">
          <Card className="shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#7497bd] to-[#5a7a9d] p-6">
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <DollarSign className="mr-2 h-6 w-6" />
                Deposit Instructions
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-auto text-white hover:bg-white/20"
                  onClick={() => document.querySelector('[data-bubble-video="deposit"]')?.click()}
                >
                  <Play className="mr-1 h-4 w-4" />
                  Watch Video Guide
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <p className="text-gray-700 text-lg font-medium">
                Follow these steps to fund your XM Markets account:
              </p>
              
              <div className="space-y-8">
                {/* Step 1: Choose Deposit Method */}
                <div className="border rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#7497bd] text-white font-bold mr-3">
                      1
                    </div>
                    <h3 className="text-xl font-semibold text-[#7497bd]">Choose Deposit Method</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card 
                      className={`border-2 hover:border-[#7497bd] cursor-pointer transition-all duration-200 ${selectedDepositMethod === 'card' ? 'border-[#7497bd] bg-blue-50' : ''}`}
                      onClick={() => handleSelectDepositMethod('card')}
                    >
                      <CardContent className="p-6 flex items-center space-x-4">
                        <CardIcon className={`h-10 w-10 ${selectedDepositMethod === 'card' ? 'text-blue-600' : 'text-[#7497bd]'}`} />
                        <div>
                          <h4 className="font-semibold text-lg">Credit/Debit Cards</h4>
                          <p className="text-sm text-gray-500">Fast processing, instant deposit</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`border-2 hover:border-[#7497bd] cursor-pointer transition-all duration-200 ${selectedDepositMethod === 'wire' ? 'border-[#7497bd] bg-blue-50' : ''}`}
                      onClick={() => handleSelectDepositMethod('wire')}
                    >
                      <CardContent className="p-6 flex items-center space-x-4">
                        <Building className={`h-10 w-10 ${selectedDepositMethod === 'wire' ? 'text-blue-600' : 'text-[#7497bd]'}`} />
                        <div>
                          <h4 className="font-semibold text-lg">International Wire Transfer</h4>
                          <p className="text-sm text-gray-500">Secure for larger deposits</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-4 bg-gray-100 border-b font-medium">
                      {selectedDepositMethod === 'card' ? 'Credit/Debit Card Deposit' : 'Wire Transfer Deposit'}
                    </div>
                    <div className="p-4">
                      <img 
                        src={selectedDepositMethod === 'card' 
                          ? "https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce13aebb8ec5925b8c4d2e_Screen%20Shot%202025-03-10%20at%209.17.15%20am.png"
                          : "https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce13b16041daac25e410c3_Screen%20Shot%202025-03-10%20at%209.17.24%20am.png"
                        }
                        alt={selectedDepositMethod === 'card' ? "Credit card deposit form" : "Wire transfer deposit information"} 
                        className="rounded-md w-full border shadow-sm"
                      />
                      <p className="text-gray-500 mt-3 text-sm">
                        {selectedDepositMethod === 'card' 
                          ? "Enter your card details to make a deposit. All transactions are secure and encrypted."
                          : "Follow the wire transfer instructions provided. Remember to include your account number as reference."
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Step 2: Minimum Deposit */}
                <div className="border rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#7497bd] text-white font-bold mr-3">
                      2
                    </div>
                    <h3 className="text-xl font-semibold text-[#7497bd]">Enter Minimum of $USD 650</h3>
                  </div>
                  
                  <Alert className="bg-blue-50 border-blue-200">
                    <InfoIcon className="h-5 w-5 text-blue-600" />
                    <AlertTitle className="text-blue-800 font-medium">Important</AlertTitle>
                    <AlertDescription className="text-blue-700">
                      You must deposit at least $650 USD to effectively use our trading strategies. This amount ensures sufficient 
                      capital for proper risk management and optimal performance with our automated systems.
                    </AlertDescription>
                  </Alert>
                </div>
                
                {/* Step 3: Follow Prompts */}
                <div className="border rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#7497bd] text-white font-bold mr-3">
                      3
                    </div>
                    <h3 className="text-xl font-semibold text-[#7497bd]">Follow the Prompts</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Complete the deposit process by following the on-screen prompts:
                  </p>
                  
                  <ul className="list-disc list-inside space-y-2">
                    <li className="text-gray-700">Enter your payment details carefully</li>
                    <li className="text-gray-700">Review your deposit information before confirming</li>
                    <li className="text-gray-700">Complete any required security verification</li>
                  </ul>
                  
                  {selectedDepositMethod === 'card' && (
                    <Alert className="mt-4 bg-yellow-50 border-yellow-200">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <AlertTitle className="text-yellow-800 font-medium">Card Deposit Tips</AlertTitle>
                      <AlertDescription className="text-yellow-700">
                        <ul className="list-disc list-inside space-y-1">
                          <li>Make sure your card is enabled for online international transactions</li>
                          <li>Some banks may require additional verification for security</li>
                          <li>Your statement will show a charge from "XM Markets"</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {selectedDepositMethod === 'wire' && (
                    <Alert className="mt-4 bg-yellow-50 border-yellow-200">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <AlertTitle className="text-yellow-800 font-medium">Wire Transfer Tips</AlertTitle>
                      <AlertDescription className="text-yellow-700">
                        <ul className="list-disc list-inside space-y-1">
                          <li>Wire transfers typically take 2-5 business days to process</li>
                          <li>Always include your account number as reference</li>
                          <li>Your bank may charge a fee for international wire transfers</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  className="border-gray-300"
                  onClick={handleSkipDeposit}
                >
                  Skip Deposit (Use Demo)
                </Button>
                <Button 
                  className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white"
                  onClick={handleMoveToSetup}
                >
                  Next: Account Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-6">
          <Card className="shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#7497bd] to-[#5a7a9d] p-6">
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <Settings className="mr-2 h-6 w-6" />
                Real Account Setup
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-auto text-white hover:bg-white/20"
                  onClick={() => document.querySelector('[data-bubble-video="account"]')?.click()}
                >
                  <Play className="mr-1 h-4 w-4" />
                  Watch Video Guide
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <Alert className="bg-yellow-50 border-yellow-200">
                <InfoIcon className="h-5 w-5 text-yellow-600" />
                <AlertTitle className="text-yellow-800 font-medium">Account Configuration</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  Your account will be set up with the following parameters for optimal performance with our trading strategies.
                </AlertDescription>
              </Alert>
              
              <div className="bg-gray-50 p-6 rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border h-full flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-[#7497bd]">Account Type</h3>
                        <p className="text-2xl font-bold mb-2">MT4 Standard</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Standard account with market execution and competitive spreads
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border h-full flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-[#7497bd]">Leverage</h3>
                        <p className="text-2xl font-bold mb-2">1:500</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Optimal leverage for our trading strategies
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border h-full flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-[#7497bd]">Currency</h3>
                        <p className="text-2xl font-bold mb-2">USD</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Base currency for all transactions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
          {/*    <div className="flex flex-col space-y-5 mt-8">
                <div className="p-5 bg-gray-50 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-4">Choose Account Type</h3>
                  <RadioGroup defaultValue="live" className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-100 cursor-pointer">
                      <RadioGroupItem value="live" id="live" className="mt-1" />
                      <div>
                        <Label htmlFor="live" className="text-base font-medium flex items-center">
                          <BarChart3 className="mr-2 h-5 w-5 text-green-600" />
                          Live Trading Account
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">
                          I've deposited at least $650 and want to create a real money trading account.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-100 cursor-pointer">
                      <RadioGroupItem value="demo" id="demo" className="mt-1" />
                      <div>
                        <Label htmlFor="demo" className="text-base font-medium flex items-center">
                          <Clock className="mr-2 h-5 w-5 text-blue-600" />
                          Demo Account
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">
                          I want to practice first with a demo account before depositing real funds.
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>*/}
              
              <div className="flex justify-end mt-6">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 text-lg"
                  onClick={handleSetupLiveAccount}
                >
                  Complete Account Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {formData.depositVerified && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800 font-medium">Account Setup Complete</AlertTitle>
          <AlertDescription className="text-green-700">
            {formData.stayInDemo 
              ? "You've chosen to continue with a demo account. You can deposit funds and upgrade to a real account at any time."
              : "Your account settings have been saved. Your trading account will be ready once your deposit is confirmed."}
          </AlertDescription>
        </Alert>
      )}
      
      {/* Hidden buttons for video triggers */}
      <button 
        data-bubble-video="deposit" 
        className="hidden"
        aria-hidden="true"
      />
      <button 
        data-bubble-video="account" 
        className="hidden"
        aria-hidden="true"
      />
    </div>
  )
}