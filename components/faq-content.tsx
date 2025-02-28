"use client"
import { Plus, Minus } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is AI trading and how does Sigmatic Trading use it?",
    answer:
      "AI trading uses artificial intelligence to analyze markets, spot trading opportunities, and automatically place trades. Sigmatic Trading’s AI bot is built by finance and data experts, leveraging advanced algorithms with over 90% accuracy to help you trade smarter and faster without manual effort.",
  },
  {
    question: "Do I need trading experience to use Sigmatic Trading?",
    answer:
      "Not at all! Sigmatic Trading is designed for both beginners and experienced traders. Our easy-to-use platform gets you started in under 20 minutes, and the AI handles the complex analysis and trading for you.",
  },
  {
    question: "How does Sigmatic Trading’s AI bot work?",
    answer:
      "Our AI bot continuously scans the forex market for high-probability trades, based on proven strategies and real-time data analysis. It automatically places trades when conditions are right, helping you stay active 24/5, even when you're offline.",
  },
  {
    question: "Is AI trading with Sigmatic Trading safe?",
    answer:
      "While no trading system can completely eliminate risk, Sigmatic Trading’s AI bot uses strict risk management to minimize potential losses. Our system only trades when conditions align with tested strategies, reducing unnecessary exposure.",
  },
  {
    question: "Do I need to place trades myself with Sigmatic Trading?",
    answer:
        "No, you don’t need to do anything. Sigmatic Trading’s AI bot automatically analyzes the market, enters trades when conditions are right, and closes them for you — all without any manual input. You can simply monitor your results whenever you like.",
},
  {
    question: "Can Sigmatic Trading guarantee profits?",
    answer:
      "No trading system can guarantee profits, and anyone claiming otherwise isn’t being honest. Sigmatic Trading’s AI bot is designed to maximize your chances of success with consistent, data-driven strategies, but all trading carries risk.",
  },
  {
    question: "How much money do I need to start?",
    answer:
      "You can start trading with Sigmatic Trading for as little as $650. Plus, you can try the demo version for free to see how it works before investing real money.",
  },
  {
    question: "How long does it take to set up my account?",
    answer:
      "You can set up your demo or live account in less than 20 minutes. Our team is available to guide you every step of the way if needed.",
  },
  {
    question: "What kind of returns can I expect?",
    answer:
      "Our AI bot has historically delivered daily returns between 0.5% and 5%. Performance can vary depending on market conditions, but the system is designed for consistency over time.",
  },
  {
    question: "Is Sigmatic Trading a copy trading service?",
    answer:
      "No. Unlike copy trading, where you follow other traders’ decisions, Sigmatic Trading’s AI bot makes trades independently based on its own market analysis and proven strategies.",
  },
  {
    question: "Can I monitor the trades placed by the AI?",
    answer:
      "Yes, you’ll have full transparency. You can monitor all trades in real-time directly on your trading platform, with detailed insights into why each trade was placed.",
  },
  {
    question: "What markets does Sigmatic Trading cover?",
    answer:
      "Our AI bot focuses primarily on the forex market — the largest and most liquid financial market in the world. This allows the bot to find opportunities 24 hours a day, 5 days a week.",
  },
  {
    question: "How do I get started with Sigmatic Trading?",
    answer:
      "You can start with a free demo to see how the AI bot works, or go straight to a live account. Simply contact our team to set up your account and verify your ID — it takes less than 20 minutes to get started.",
  },
  {
    question: "What support does Sigmatic Trading offer?",
    answer:
      "Our support team is available to help you every step of the way, from setting up your account to answering any questions about trades or performance. You can contact us directly via Telegram or WhatsApp.",
  },
]


export function FAQContent() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-[#7497bd]">Frequently Asked Questions</h1>
        <p className="text-gray-600">Find answers to common questions about AI Trading</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0 px-4 py-2">
              <AccordionTrigger className="hover:no-underline group">
                <div className="flex items-center justify-between w-full">
                  <span className="text-base font-semibold text-gray-900">{faq.question}</span>
                  <div className="relative flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white shrink-0 ml-4">
                    <Plus className="h-4 w-4 text-[#7497bd] absolute transition-opacity opacity-100 group-data-[state=open]:opacity-0" />
                    <Minus className="h-4 w-4 text-[#7497bd] absolute transition-opacity opacity-0 group-data-[state=open]:opacity-100" />
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

