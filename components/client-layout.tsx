"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { SidebarProvider, Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/auth" || pathname === "/forgot-password"

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

