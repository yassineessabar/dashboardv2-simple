import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { createToken } from "@/lib/auth"
import { sendWelcomeEmail } from "@/lib/email"

// Mark this route as dynamic since it uses cookies
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Name, email, and password are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Create and set JWT token
    const token = await createToken(result.insertedId.toString())

    // Send emails asynchronously - don't await the result
    // This allows the registration to complete faster
    sendWelcomeEmail({
      name,
      email
    }).catch(error => {
      console.error('Failed to send welcome emails:', error);
    });

    return NextResponse.json({
      message: "User registered successfully",
      userId: result.insertedId,
      user: {
        id: result.insertedId,
        name,
        email
      }
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}