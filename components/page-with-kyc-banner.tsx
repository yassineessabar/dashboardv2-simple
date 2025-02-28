import type { ReactNode } from "react"
import { KYCBanner } from "@/components/kyc-banner"

interface PageWithKYCBannerProps {
  children: ReactNode
  isKYCCompleted: boolean
  isDepositCompleted: boolean
}

export function PageWithKYCBanner({ children, isKYCCompleted, isDepositCompleted }: PageWithKYCBannerProps) {
  return (
    <>
      <KYCBanner isKYCCompleted={isKYCCompleted} isDepositCompleted={isDepositCompleted} />
      {children}
    </>
  )
}

