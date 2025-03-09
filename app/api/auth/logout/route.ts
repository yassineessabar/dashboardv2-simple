import { NextResponse } from "next/server"
import { logout } from "@/lib/auth"

// Mark this route as dynamic since it uses cookies
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await logout()

    return NextResponse.json({ message: "Logged out successfully" })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "Error during logout" }, { status: 500 })
  }
}