import { CheckCircle, User, DollarSign, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"

export function SummaryStep({ formData }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const robotDisplayNames = {
    "sigmatic-3.5": "Sigmatic 3.5 (Recommended)",
    "sigmatic-fx": "Sigmatic FX Pro",
    "sigmatic-gold": "Sigmatic Gold Trader"
  }

  // Fetch current user information when component mounts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/user')
        console.log('User API Response:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('User Data:', data)
          setCurrentUser(data.user)
        } else {
          console.log('Failed to fetch user:', await response.text())
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
  }, [])
  
  // Get user info from the fetched data or fallback to formData
  const userEmail = currentUser?.email || formData.email || "Please provide your email"
  const userName = currentUser?.name || formData.fullName || "Please provide your name"
  
  // Get deposit method information
  const depositMethod = formData.selectedDepositMethod === 'card' 
    ? "Credit/Debit Card" 
    : formData.selectedDepositMethod === 'wire' 
      ? "International Wire Transfer" 
      : "Not specified"

  if (loading) {
    return <div className="text-center p-6">Loading user information...</div>
  }
  
  // Debug information about current user
  console.log('Current User State:', currentUser)
  console.log('Form Data:', formData)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#7497bd]">Review Your Information</h2>
        <p className="text-gray-600 mb-8">
          Please review the details below before submitting your application.
        </p>
      </div>

      <Card className="shadow-md">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-xl font-semibold flex items-center">
            <User className="mr-2 h-5 w-5 text-blue-500" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p className="text-lg">{userName}</p>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="text-lg">{userEmail}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Settings className="mr-2 h-5 w-5 text-purple-500" />
            Trading Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Trading Robot</h3>
              <p className="text-lg">{robotDisplayNames[formData.selectedRobot] || "Sigmatic 3.5"}</p>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
              <p className="text-lg font-semibold">
                {formData.stayInDemo 
                  ? "Demo Account" 
                  : "Real Trading Account"}
              </p>
              {formData.stayInDemo && (
                <p className="text-xs text-yellow-600 mt-1">
                  You can upgrade to a live account anytime by making a deposit.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {!formData.stayInDemo && (
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-xl font-semibold flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-green-500" />
              Account Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                <p className="text-lg font-semibold">{formData.accountType || "MT4 Standard"}</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Leverage</h3>
                <p className="text-lg">{formData.leverage || "1:500"}</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Currency</h3>
                <p className="text-lg">{formData.currency || "USD"}</p>
              </div>
              {formData.depositAmount && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Deposit Amount</h3>
                    <p className="text-lg font-semibold">${formData.depositAmount}</p>
                  </div>
                </>
              )}
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Deposit Method</h3>
                <p className="text-lg">{depositMethod}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert className="bg-yellow-50 border-yellow-200">
        <AlertTitle className="text-yellow-800 font-medium">Please Confirm</AlertTitle>
        <AlertDescription className="text-yellow-700">
          By clicking "Submit" below, you acknowledge that you have:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Provided accurate information for account setup</li>
            <li>Selected your preferred trading robot</li>
            {!formData.stayInDemo && <li>Configured your live trading account with appropriate settings</li>}
            {formData.stayInDemo && <li>Chosen to start with a demo account for practice</li>}
            <li>Read and agreed to our terms of service and privacy policy</li>
          </ul>
        </AlertDescription>
      </Alert>
      
      <div className="text-center">
        <p className="text-sm text-gray-500">
          By submitting, you confirm that all provided information is accurate and you agree to our{" "}
          <a href="#" className="text-[#7497bd] hover:underline">
            terms of service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#7497bd] hover:underline">
            privacy policy
          </a>.
        </p>
      </div>
    </div>
  )
}