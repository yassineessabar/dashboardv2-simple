import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AffiliateContent } from "@/components/affiliate-content"

export default function AffiliatePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="bg-gray-50">
          <AffiliateContent />
        </main>
      </div>
    </div>
  )
}

