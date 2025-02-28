import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function SummaryStep({ formData }) {
  const sections = [
    {
      title: "Basic Information",
      items: [
        { label: "Full Name", value: formData.fullName },
        { label: "Email", value: formData.email },
        { label: "Identity Document", value: formData.identityDocument ? "Uploaded" : "Not uploaded" },
        { label: "Proof of Address", value: formData.proofOfAddress ? "Uploaded" : "Not uploaded" },
      ],
    },
    {
      title: "Account Setup",
      items: [
        { label: "Setup Method", value: formData.setupChoice === "automatic" ? "Automatic" : "Manual" },
        { label: "Trading Robot", value: "Sigmatic 3.5" },
        { label: "Minimum Deposit Acknowledged", value: formData.minimumDepositAcknowledged ? "Yes" : "No" },
        { label: "Consent Given", value: formData.consentGiven ? "Yes" : "No" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#7497bd]">Review Your Information</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Please verify all details before submitting.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.title} className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg flex items-center mb-4 text-[#7497bd]">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.label} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-gray-600">{item.label}:</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 mt-6 max-w-2xl mx-auto">
          By submitting, you confirm that all provided information is accurate and you agree to our{" "}
          <a href="#" className="text-[#7497bd] hover:underline">
            terms of service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#7497bd] hover:underline">
            privacy policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}

