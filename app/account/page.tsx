import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AccountForm } from "@/components/account-form"

export default function AccountPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="bg-gray-50">
          <AccountForm />
        </main>
      </div>
    </div>
  )
}

