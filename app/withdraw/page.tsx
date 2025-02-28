import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { WithdrawForm } from "@/components/withdraw-form"

export default function WithdrawPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="bg-gray-50">
          <WithdrawForm />
        </main>
      </div>
    </div>
  )
}

