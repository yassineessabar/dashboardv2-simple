"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"

const countries = [
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
]

export function AccountForm() {
  const [date, setDate] = useState<Date>()
  const [country, setCountry] = useState(countries[0])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#7497bd] mb-6">Profile Details</h1>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:text-[#7497bd] data-[state=active]:border-b-2 data-[state=active]:border-[#7497bd] rounded-none px-6 pb-2"
          >
            PERSONAL DATA
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="data-[state=active]:text-[#7497bd] data-[state=active]:border-b-2 data-[state=active]:border-[#7497bd] rounded-none px-6 pb-2"
          >
            PASSWORD
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-gray-600">Full Name</label>
              <Input placeholder="Yassine E" />
            </div>

            <div className="space-y-2">
              <label className="text-gray-600">Email Address</label>
              <Input type="email" placeholder="anthoy2327@gmail.com" disabled className="bg-gray-100" />
            </div>

            <div className="space-y-2">
              <label className="text-gray-600">Mobile Number</label>
              <div className="flex">
                <Select onValueChange={(value) => setCountry(countries.find((c) => c.code === value) || countries[0])}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder={country.flag} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        <span className="mr-2">{c.flag}</span>
                        <span>{c.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input className="flex-1" placeholder="Enter Mobile Number" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-600">Date of Birth</label>
              <div className="flex">
                <Input
                  type="date"
                  value={date ? format(date, "yyyy-MM-dd") : ""}
                  onChange={(e) => setDate(new Date(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-gray-600">Nationality</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      <span className="mr-2">{c.flag}</span>
                      <span>{c.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="mt-8 px-8 py-6 bg-[#7497bd] hover:bg-[#5a7a9d] text-white">Update Profile</Button>
        </TabsContent>

        <TabsContent value="password" className="mt-6">
          <div className="max-w-xl space-y-6">
            <div className="space-y-2">
              <label className="text-gray-600">Old Password</label>
              <Input type="password" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-600">New Password</label>
                <Input type="password" />
              </div>

              <div className="space-y-2">
                <label className="text-gray-600">Confirm New Password</label>
                <Input type="password" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 text-[#7497bd]">
                <Info className="w-5 h-5 mt-0.5" />
                <p className="text-sm">
                  Password should be a minimum of 6 digits and include lower and uppercase letter.
                </p>
              </div>
              <div className="flex items-start gap-2 text-red-500">
                <Info className="w-5 h-5 mt-0.5" />
                <p className="text-sm">Your password will only change after your confirmation by email.</p>
              </div>
            </div>

            <Button className="px-8 py-6 bg-[#7497bd] hover:bg-[#5a7a9d] text-white">Update</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

