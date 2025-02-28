import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { LegalDocuments } from "@/components/legal-documents"

export default function LegalPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="bg-gray-50">
          <LegalDocuments />
        </main>
      </div>
    </div>
  )
}

