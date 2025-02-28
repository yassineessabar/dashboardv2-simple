import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AboutUsContent } from "@/components/about-us-content"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="bg-gray-50">
          <AboutUsContent />
        </main>
      </div>
    </div>
  )
}

