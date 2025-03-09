import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { AuthForm } from "@/components/auth-form"

export default async function AuthPage() {
  const user = await getCurrentUser()

  // If user is already logged in, redirect to dashboard
  if (user) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold">Welcome</h1>
          <p className="mt-2 text-gray-600">Sign in to access your dashboard</p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}