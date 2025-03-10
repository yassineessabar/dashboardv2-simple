"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Wallet,
  LogOut,
  Users2,
  HelpCircle,
  MessageSquare,
  Shield,
  FileCheck,
  LineChart,
  ChevronRight,
  Menu,
  PlayCircle,
  AlertCircle,
  X,
  Info,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DemoTutorial } from "@/components/demo-tutorial"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"

// Add the logout menu item directly to your menu items array
const menuItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/get-started", icon: PlayCircle, label: "Create Real Account" },
  { href: "/trading", icon: LineChart, label: "Trading Accounts", hidden: true },
  { href: "/deposit", icon: Wallet, label: "Deposit", hidden: true },
  { href: "/withdraw", icon: LogOut, label: "Withdraw", hidden: true },
  { href: "/kyc", icon: FileCheck, label: "KYC Verification", hidden: true },
  { href: "/affiliate", icon: Users2, label: "Affiliate", hidden: true },
  { href: "https://www.sigmatic-trading.com/", icon: Info, label: "About Us", linkProps: { target: "_blank", rel: "noopener noreferrer" } },
  { href: "/faq", icon: HelpCircle, label: "FAQ" },
  { href: "/contact", icon: MessageSquare, label: "Contact us" },
  { href: "/legal", icon: Shield, label: "Legal Documents" },
]

const SidebarContext = createContext<
  | {
      isCollapsed: boolean
      isMobileOpen: boolean
      toggleSidebar: () => void
      setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
  | undefined
>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    if (window.innerWidth >= 768) {
      setIsCollapsed(!isCollapsed)
    } else {
      setIsMobileOpen(!isMobileOpen)
    }
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, isMobileOpen, toggleSidebar, setIsMobileOpen }}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div
          className={cn("flex-1 transition-all duration-300 ease-in-out", isCollapsed ? "md:ml-[80px]" : "md:ml-64")}
        >
          <div className="p-4 pt-14 md:pt-4 max-w-full overflow-x-hidden">{children}</div>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar() {
  const { isCollapsed, isMobileOpen, toggleSidebar, setIsMobileOpen } = useSidebar()
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [showDemoTutorial, setShowDemoTutorial] = useState(false)

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Logout failed")
      }

      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      })

      // Redirect to login
      router.push("/auth")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log out",
        variant: "destructive",
      })
    }
  }

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-4">
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <Link href="https://www.sigmatic-trading.com/" target="_blank" className="flex items-center justify-center w-full">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/67984b56824e29d4d17f7d98_image__1_-removebg-preview-p-500-dCWeUC1cV6JJXGdpegIPj1wRHoCEgn.png"
                  alt="Sigmatic Trading Logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map(
          (item) =>
            !item.hidden && (
              <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
                <motion.div
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  )}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", isCollapsed ? "mr-0" : "mr-3")} />
                  <AnimatePresence initial={false}>
                    {(!isCollapsed || isMobileOpen) && (
                      <motion.span
                        className="flex-1"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {item.isPending && (
                    <AlertCircle
                      className={cn("h-4 w-4 text-yellow-500", isCollapsed && !isMobileOpen ? "ml-0" : "ml-2")}
                    />
                  )}
                  {pathname === item.href && !isCollapsed && <ChevronRight className="h-4 w-4 text-blue-600" />}
                </motion.div>
              </Link>
            ),
        )}
        
        {/* Logout Button - Added as a direct item in the navigation */}
        <motion.div
          className={cn(
            "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer mt-2 bg-red-50 text-red-600 hover:bg-red-100"
          )}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
        >
          <LogOut className={cn("h-5 w-5 flex-shrink-0", isCollapsed ? "mr-0" : "mr-3")} />
          <AnimatePresence initial={false}>
            {(!isCollapsed || isMobileOpen) && (
              <motion.span
                className="flex-1"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>

      <div className="mt-auto px-4 pb-4">
        <Button
          variant="default"
          size="lg"
          className={cn(
            "w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105",
            isCollapsed && !isMobileOpen ? "px-2" : "px-4",
          )}
          onClick={() => setShowDemoTutorial(true)}
        >
          <PlayCircle className={cn("h-5 w-5 flex-shrink-0", isCollapsed && !isMobileOpen ? "mr-0" : "mr-2")} />
          <AnimatePresence initial={false}>
            {(!isCollapsed || isMobileOpen) && (
              <motion.span
                className="flex-1 whitespace-nowrap"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                Try Demo Account
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </>
  )

  return (
    <>
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn("fixed top-0 left-0 z-40 h-screen bg-white shadow-lg flex flex-col hidden md:flex")}
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile burger menu - fixed position and always visible */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white md:hidden flex items-center p-2 shadow-sm border-b border-gray-100">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-700"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        <div className="flex-1 flex justify-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/67984b56824e29d4d17f7d98_image__1_-removebg-preview-p-500-dCWeUC1cV6JJXGdpegIPj1wRHoCEgn.png"
            alt="Sigmatic Trading Logo"
            className="h-8 w-auto object-contain"
          />
        </div>
        
        <div className="w-10"></div> {/* Empty space to balance the layout */}
      </div>
      
      <DemoTutorial open={showDemoTutorial} onOpenChange={setShowDemoTutorial} />
    </>
  )
}

export { Sidebar }