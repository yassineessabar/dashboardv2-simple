"use client"

import { useState } from "react"
import { Github, GitlabIcon, Mail, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function GetStarted() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLogin = (provider: string) => {
    setIsLoading(true)
    // Here you would typically initiate the OAuth flow with the selected provider
    console.log(`Logging in with ${provider}`)
    // Simulating an API call
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Get Started with Sigmatic</CardTitle>
          <CardDescription className="text-center">Choose a method to create your account or log in</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="outline" onClick={() => handleLogin("GitHub")} disabled={isLoading} className="w-full">
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
          <Button variant="outline" onClick={() => handleLogin("GitLab")} disabled={isLoading} className="w-full">
            <GitlabIcon className="mr-2 h-4 w-4" />
            Continue with GitLab
          </Button>
          <Button variant="outline" onClick={() => handleLogin("Email")} disabled={isLoading} className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            Continue with Email
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <Button variant="outline" onClick={() => handleLogin("SAML SSO")} disabled={isLoading} className="w-full">
            Continue with SAML SSO
          </Button>
          <Button variant="outline" onClick={() => handleLogin("Passkey")} disabled={isLoading} className="w-full">
            <Key className="mr-2 h-4 w-4" />
            Login with Passkey
          </Button>
        </CardContent>
        <CardFooter>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
