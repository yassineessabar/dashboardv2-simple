"use client"

import { 
  CheckCircle, 
  InfoIcon, 
  ArrowRight, 
  DollarSign, 
  CreditCard, 
  Settings,
  Play,
  CreditCard as CardIcon,
  Building,
  AlertTriangle,
  ChevronDown,
  ExternalLink,
  HelpCircle
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { VideoInstructionBubble } from "./video-instruction-bubble"
import { WhatsAppContactBubble } from "./whatsapp-contact-bubble"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function StepThree({ formData, updateFormData }) {
  const [selectedDepositMethod, setSelectedDepositMethod] = useState("card")
  const [depositGuideExpanded, setDepositGuideExpanded] = useState(false)
  const [accountSetupExpanded, setAccountSetupExpanded] = useState(false)
  
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
    // Modified to not trigger completion state
    console.log("Skip deposit selected");
    // If you want to save the demo preference without triggering completion:
    // updateFormData({ 
    //   stayInDemo: true,
    //   accountType: "MT4 Standard",
    //   leverage: "1:500",
    //   currency: "USD"
    // });
  }
  
  const handleSetupLiveAccount = () => {
    // Updated to avoid triggering completion state
    console.log("Account settings would be applied here");
    // If you want to save settings without triggering completion:
    // updateFormData({
    //   accountType: "MT4 Standard",
    //   leverage: "1:500",
    //   currency: "USD"
    // });
  }
  
  const handleSelectDepositMethod = (method) => {
    setSelectedDepositMethod(method);
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 p-2 sm:p-4" 
      initial="initial" 
      animate="animate" 
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      // Add event stopPropagation on main container
      onClick={(e) => e.stopPropagation()}
    >
      {/* WhatsApp contact bubble - hidden on mobile, visible on larger screens */}
      <div className="hidden sm:block">
        <WhatsAppContactBubble 
          phoneNumber="447700000000" 
          message={`Hi, I need help with funding my account. I'm using the ${selectedDepositMethod === 'card' ? 'credit card' : 'wire transfer'} method.`}
          position="bottom-right" 
        />
      </div>
      
      {/* Video bubbles */}
      {depositGuideExpanded && (
        <VideoInstructionBubble 
          title={videoInstructions.deposit.title}
          videoSrc={videoInstructions.deposit.videoSrc}
          position="bottom-right"
        />
      )}
      
      {accountSetupExpanded && (
        <VideoInstructionBubble 
          title={videoInstructions.account.title}
          videoSrc={videoInstructions.account.videoSrc}
          position="bottom-right"
        />
      )}
      
      {/* Header Section */}
      <motion.div 
        className="text-center mb-4 sm:mb-6"
        variants={fadeInUp}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Fund Your Trading Account</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md mx-auto">
          Deposit a minimum of $650 to start trading with real funds
        </p>
      </motion.div>
      
      {/* Main Deposit Card */}
      <motion.div variants={fadeInUp}>
        <Card className="border-0 shadow-sm rounded-md overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-100 p-3 sm:p-4">
            <CardTitle className="text-base sm:text-lg font-medium text-gray-900">Start Trading</CardTitle>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Fund your account to access our AI trading strategies
            </p>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4 bg-white">
            <div className="space-y-3">
              <Alert className="bg-blue-50 border-0 shadow-sm rounded-md p-2 sm:p-3">
                <InfoIcon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                <AlertDescription className="text-[10px] sm:text-xs text-blue-700 ml-2">
                  Minimum $650 deposit recommended for optimal strategy performance
                </AlertDescription>
              </Alert>
              
              <div className="pt-2 flex justify-center">
                <Button
                  className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-md shadow-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Just open the deposit page without triggering completion
                    window.open("https://my.xmglobal.com/payment/deposit", "_blank");
                  }}
                >
                  Go to Deposit Page
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Collapsible Deposit Guide Section */}
      <motion.div variants={fadeInUp} className="mt-2">
        <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
          <div 
            className="bg-gray-50 p-2.5 sm:p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDepositGuideExpanded(!depositGuideExpanded);
            }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-[#7497bd]" />
              <h3 className="text-sm sm:text-base font-medium text-gray-900">Deposit Guide</h3>
            </div>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{
                rotate: depositGuideExpanded ? 180 : 0,
                transition: { duration: 0.3 }
              }}
            >
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
            </motion.div>
          </div>
          
          <AnimatePresence>
            {depositGuideExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-200"
              >
                <div className="p-2 sm:p-3 space-y-3">
                  <Card className="border border-gray-200 shadow-sm rounded-md overflow-hidden">
                    <CardHeader className="bg-white border-b border-gray-100 py-2 px-3 sm:p-3">
                      <CardTitle className="text-sm sm:text-base font-medium text-gray-900 flex items-center">
                        <DollarSign className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-[#7497bd]" />
                        Deposit Instructions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-3 space-y-2 sm:space-y-3 bg-white">
                      <div className="space-y-2 sm:space-y-3">
                        {/* Deposit Methods Selection */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <Button
                            variant={selectedDepositMethod === 'card' ? 'default' : 'outline'} 
                            className={`text-[10px] sm:text-sm py-1.5 px-2 sm:py-2 sm:px-3 ${selectedDepositMethod === 'card' ? 'bg-[#7497bd] hover:bg-[#5a7a9d]' : 'border-gray-200'}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSelectDepositMethod('card');
                            }}
                          >
                            <CardIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Credit/Debit Card</span>
                            <span className="inline sm:hidden">Card</span>
                          </Button>
                          
                          <Button
                            variant={selectedDepositMethod === 'wire' ? 'default' : 'outline'} 
                            className={`text-[10px] sm:text-sm py-1.5 px-2 sm:py-2 sm:px-3 ${selectedDepositMethod === 'wire' ? 'bg-[#7497bd] hover:bg-[#5a7a9d]' : 'border-gray-200'}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSelectDepositMethod('wire');
                            }}
                          >
                            <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Wire Transfer</span>
                            <span className="inline sm:hidden">Wire</span>
                          </Button>
                        </div>
                        
                        <div className="flex justify-center mb-1.5 sm:mb-3">
                          <div className="border border-gray-100 rounded-md overflow-hidden shadow-sm w-full sm:w-auto">
                            <img 
                              src={selectedDepositMethod === 'card' 
                                ? "https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce13aebb8ec5925b8c4d2e_Screen%20Shot%202025-03-10%20at%209.17.15%20am.png"
                                : "https://cdn.prod.website-files.com/67872a3e14306e08566145ab/67ce13b16041daac25e410c3_Screen%20Shot%202025-03-10%20at%209.17.24%20am.png"
                              }
                              alt={selectedDepositMethod === 'card' ? "Credit card deposit form" : "Wire transfer deposit information"} 
                              className="max-w-full h-auto w-auto max-h-[150px] sm:max-h-none"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-1.5 sm:space-y-2">
                          <div className="flex items-center">
                            <span className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#7497bd] text-white font-medium mr-1.5 sm:mr-2 text-[10px] sm:text-xs">1</span>
                            <h3 className="text-xs sm:text-sm font-medium text-gray-900">Select Amount ($650 minimum)</h3>
                          </div>
                          <div className="flex items-center">
                            <span className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#7497bd] text-white font-medium mr-1.5 sm:mr-2 text-[10px] sm:text-xs">2</span>
                            <h3 className="text-xs sm:text-sm font-medium text-gray-900">Enter Payment Details</h3>
                          </div>
                          <div className="flex items-center">
                            <span className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#7497bd] text-white font-medium mr-1.5 sm:mr-2 text-[10px] sm:text-xs">3</span>
                            <h3 className="text-xs sm:text-sm font-medium text-gray-900">Confirm Transaction</h3>
                          </div>
                        </div>
                        
                        {selectedDepositMethod === 'card' && (
                          <Alert className="bg-yellow-50 border-0 shadow-sm rounded-md p-1.5 sm:p-2">
                            <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-600 flex-shrink-0" />
                            <AlertDescription className="text-yellow-700 text-[10px] sm:text-xs ml-1.5 sm:ml-2">
                              Ensure your card is enabled for international transactions
                            </AlertDescription>
                          </Alert>
                        )}
                        
                        {selectedDepositMethod === 'wire' && (
                          <Alert className="bg-yellow-50 border-0 shadow-sm rounded-md p-1.5 sm:p-2">
                            <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-600 flex-shrink-0" />
                            <AlertDescription className="text-yellow-700 text-[10px] sm:text-xs ml-1.5 sm:ml-2">
                              Include your account number as reference in wire transfers
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* Collapsible Account Setup Section */}
      <motion.div variants={fadeInUp} className="mt-2">
        <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
          <div 
            className="bg-gray-50 p-2.5 sm:p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setAccountSetupExpanded(!accountSetupExpanded);
            }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Settings className="h-3 w-3 sm:h-4 sm:w-4 text-[#7497bd]" />
              <h3 className="text-sm sm:text-base font-medium text-gray-900">Account Setup</h3>
            </div>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{
                rotate: accountSetupExpanded ? 180 : 0,
                transition: { duration: 0.3 }
              }}
            >
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
            </motion.div>
          </div>
          
          <AnimatePresence>
            {accountSetupExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-200"
              >
                <div className="p-2 sm:p-3 space-y-3">
                  <Card className="border border-gray-200 shadow-sm rounded-md overflow-hidden">
                    <CardHeader className="bg-white border-b border-gray-100 py-2 px-3 sm:p-3">
                      <CardTitle className="text-sm sm:text-base font-medium text-gray-900 flex items-center">
                        <Settings className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-[#7497bd]" />
                        Account Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-3 space-y-2 sm:space-y-3 bg-white">
                      <Alert className="bg-blue-50 border-0 shadow-sm rounded-md p-1.5 sm:p-2">
                        <InfoIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-600 flex-shrink-0" />
                        <AlertDescription className="text-blue-700 text-[10px] sm:text-xs ml-1.5 sm:ml-2">
                          Recommended settings for optimal strategy performance
                        </AlertDescription>
                      </Alert>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="bg-gray-50 p-2 rounded-md border border-gray-200 text-center">
                          <div className="text-xs text-gray-500">Account Type</div>
                          <div className="font-medium text-sm">MT4 Standard</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md border border-gray-200 text-center">
                          <div className="text-xs text-gray-500">Leverage</div>
                          <div className="font-medium text-sm">1:100</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md border border-gray-200 text-center">
                          <div className="text-xs text-gray-500">Currency</div>
                          <div className="font-medium text-sm">USD</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Success Message */}
      {formData.depositVerified && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="bg-green-50 border-0 shadow-sm rounded-md p-2 sm:p-3">
            <div className="flex">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <AlertTitle className="text-green-800 font-medium text-xs sm:text-sm">Account Setup Complete</AlertTitle>
                <AlertDescription className="text-green-700 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
                  {formData.stayInDemo 
                    ? "You've chosen to continue with a demo account. You can deposit funds later."
                    : "Your account settings have been saved. Your trading account will be ready once your deposit is confirmed."}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        </motion.div>
      )}
      
      {/* Mobile WhatsApp fixed button */}
      <div className="fixed bottom-4 right-4 sm:hidden z-50">
        <Button
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(`https://wa.me/447700000000?text=${encodeURIComponent(`Hi, I need help with funding my account. I'm using the ${selectedDepositMethod === 'card' ? 'credit card' : 'wire transfer'} method.`)}`, "_blank");
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </Button>
      </div>
      
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
    </motion.div>
  )
}