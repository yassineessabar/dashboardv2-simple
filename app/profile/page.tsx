import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { AuthForm } from "@/components/auth-form"

export default async function AuthPage() {
  const user = await getCurrentUser()

  // If user is already logged in, redirect to dashboard
  if (user) {
    redirect("/")
  }
}
