import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const documents = {
  "Terms and Agreements": [
    {
      title: "Terms of Service",
      description: "General terms and conditions for using our platform",
      lastUpdated: "2024-02-15",
      version: "2.1.0",
    },
    {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information",
      lastUpdated: "2024-02-10",
      version: "1.8.0",
    },
    {
      title: "User Agreement",
      description: "Detailed agreement between users and Sigmatic Trading",
      lastUpdated: "2024-01-25",
      version: "3.0.1",
    },
  ],
  "Trading Policies": [
    {
      title: "Risk Disclosure",
      description: "Important information about trading risks and responsibilities",
      lastUpdated: "2024-02-01",
      version: "2.3.0",
    },
    {
      title: "Trading Rules",
      description: "Platform trading rules and guidelines",
      lastUpdated: "2024-02-05",
      version: "1.5.0",
    },
    {
      title: "Order Execution Policy",
      description: "How we handle and execute your trading orders",
      lastUpdated: "2024-01-30",
      version: "2.0.0",
    },
  ],
  "Compliance Documents": [
    {
      title: "AML Policy",
      description: "Anti-Money Laundering policy and procedures",
      lastUpdated: "2024-02-12",
      version: "2.2.0",
    },
    {
      title: "KYC Guidelines",
      description: "Know Your Customer verification process and requirements",
      lastUpdated: "2024-02-08",
      version: "1.9.0",
    },
    {
      title: "Data Protection Policy",
      description: "How we ensure the security of your data",
      lastUpdated: "2024-01-28",
      version: "2.4.0",
    },
  ],
}

export function LegalDocuments() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-[#7497bd]">Legal Documents</h1>
        <p className="text-gray-600">Important legal documents and policies governing the use of Sigmatic Trading</p>
      </div>

      <div className="space-y-6">
        {Object.entries(documents).map(([category, docs]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-[#7497bd]">{category}</CardTitle>
              <CardDescription>Essential {category.toLowerCase()} for platform usage</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {docs.map((doc, index) => (
                  <AccordionItem value={`${category}-${index}`} key={index}>
                    <AccordionTrigger className="hover:no-underline group">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-[#7497bd]" />
                        <div className="text-left">
                          <div className="font-medium group-hover:text-[#7497bd] transition-colors">{doc.title}</div>
                          <div className="text-sm text-gray-500">Version {doc.version}</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 pb-4">
                        <p className="text-gray-600 mb-4">{doc.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">Last updated: {doc.lastUpdated}</div>
                          <Button className="bg-[#7497bd] hover:bg-[#5a7a9d] transition-colors">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

