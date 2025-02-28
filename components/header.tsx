"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Header({ isKYCCompleted }: { isKYCCompleted: boolean }) {
  const router = useRouter()

  const handleLogout = () => {
    // TODO: Implement actual logout logic here (e.g., clear tokens, user data)
    // For now, we'll just redirect to the login page
    router.push("/auth")
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="https://www.sigmatic-trading.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OdqvhWAczTo9SekUcq2CMulpjmwoJx.png"
              alt="Sigmatic Trading Logo"
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
            />
            <span className="text-sm md:text-lg font-semibold text-[#7497bd] hidden sm:inline">
              AI-powered trading, smarter earnings.
            </span>
          </Link>
          <div className="flex items-center">
            <Link href={isKYCCompleted ? "/deposit" : "/get-started"}>
              <div className="bg-[#7497bd] hover:bg-[#5a7a9d] text-white transition-colors text-xs md:text-sm px-4 py-2 rounded-md">
                {isKYCCompleted ? "Deposit" : "Get Started"}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

