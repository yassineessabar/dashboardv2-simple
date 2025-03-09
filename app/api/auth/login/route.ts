import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { createToken } from "@/lib/auth"
import bcrypt from "bcryptjs"

// Mark this route as dynamic since it uses cookies
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    const user = await db.collection("users").findOne({ email })

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Create and set JWT token
    const token = await createToken(user._id.toString())

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}