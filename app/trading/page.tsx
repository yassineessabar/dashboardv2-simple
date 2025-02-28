import { Header } from "@/components/header"
import { TradingAccounts } from "@/components/trading-accounts"

export default function TradingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="bg-gray-50">
        <TradingAccounts />
      </main>
    </div>
  )
}

