import { NextResponse } from "next/server"
import { randomUUID } from "crypto"
import clientPromise from "@/lib/mongodb"
import { SignJWT } from "jose"
import { sendPasswordResetEmail } from "@/lib/email"

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

// Environment variables
const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key"
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()
    const usersCollection = db.collection("users")

    // Find the user
    const user = await usersCollection.findOne({ email })

    // Only proceed with token generation if the user exists
    if (user) {
      // Generate a reset token (valid for 1 hour)
      const resetToken = await new SignJWT({ 
        userId: user._id.toString(),
        purpose: "password-reset" 
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .setJti(randomUUID())
        .sign(new TextEncoder().encode(JWT_SECRET))

      // Store the token in the database with expiration
      await db.collection("passwordResets").insertOne({
        userId: user._id,
        token: resetToken,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        used: false
      })

      // Generate the reset link
      const resetLink = `${BASE_URL}/reset-password?token=${resetToken}`
      
      // Log the link for backup/debug purposes
      console.log("Password reset link:", resetLink)
      
      // Send the password reset email
      try {
        await sendPasswordResetEmail(email, resetLink)
      } catch (emailError) {
        console.error("Failed to send email:", emailError)
        // Continue execution even if email fails
      }
    }

    // Return success response regardless of whether the user exists
    // This is a security best practice to prevent email enumeration
    return NextResponse.json({
      message: "If an account exists with this email, a password reset link has been sent",
      success: true
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { message: "Failed to process your request" },
      { status: 500 }
    )
  }
}