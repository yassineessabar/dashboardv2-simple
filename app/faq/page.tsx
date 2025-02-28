import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { FAQContent } from "@/components/faq-content"

export default function FAQPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="bg-gray-50">
          <FAQContent />
        </main>
      </div>
    </div>
  )
}

