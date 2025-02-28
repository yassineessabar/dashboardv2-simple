import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-3">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <nav className="flex gap-4 text-sm text-gray-500">
            <Link href="https://www.sigmatic-trading.com/" className="hover:text-[#7497bd] transition-colors">
              About us
            </Link>
            <Link href="/faq" className="hover:text-[#7497bd] transition-colors">
              FAQ
            </Link>
            <Link href="/legal" className="hover:text-[#7497bd] transition-colors">
              Privacy policy
            </Link>
            <Link href="/legal" className="hover:text-[#7497bd] transition-colors">
              Terms and Conditions
            </Link>
          </nav>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Sigmatic Trading. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

