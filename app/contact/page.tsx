import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ContactUs } from "@/components/contact-us"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="bg-gray-50">
          <ContactUs />
        </main>
      </div>
    </div>
  )
}

