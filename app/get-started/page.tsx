import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { OnboardingForm } from "@/components/onboarding-form"

export default function GetStartedPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="bg-gray-50 min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <OnboardingForm />
        </main>
      </div>
    </div>
  )
}

