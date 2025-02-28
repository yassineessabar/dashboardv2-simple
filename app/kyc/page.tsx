import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { KYCForm } from "@/components/kyc-form"
import { PageWithKYCBanner } from "@/components/page-with-kyc-banner"

export default function KYCPage() {
  // In a real application, you would fetch these values from your backend or state management
  const isKYCCompleted = false
  const isDepositCompleted = false

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="bg-gray-50">
          <PageWithKYCBanner isKYCCompleted={isKYCCompleted} isDepositCompleted={isDepositCompleted}>
            <KYCForm />
          </PageWithKYCBanner>
        </main>
      </div>
    </div>
  )
}

