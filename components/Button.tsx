"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import Link from "next/link"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border-primary text-primary hover:bg-primary/10",
        ghost: "bg-background hover:bg-accent",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10",
        sm: "h-8 text-xs",
        lg: "h-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export default function Button({
  children,
  className,
  variant,
  size,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: "default" | "outline" | "ghost" | "destructive" | "link"
  size?: "default" | "sm" | "lg"
}) {
  return (
    <Link href="/get-started" passHref>
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
        onClick={(e) => {
          e.preventDefault()
          window.location.href = "/get-started"
        }}
      >
        {children}
      </button>
    </Link>
  )
}

