import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import ClientLayout from "@/components/client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sigmatic Trading Dashboard | AI Trading for Smarter Earnings",
  description: "Discover AI-powered trading with Sigmatic Trading. Earn $33 to $157 daily with automated, low-risk trading. Start in 20 minutes!",
  generator: 'v0.dev',
  icons: {
    icon: [
      {
        url: 'https://cdn.prod.website-files.com/67872a3e14306e08566145ab/6796fc65ef2c9fdb4c4a4f80_favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="icon" 
          href="https://cdn.prod.website-files.com/67872a3e14306e08566145ab/6796fc65ef2c9fdb4c4a4f80_favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
        <Toaster />
      </body>
    </html>
  )
}