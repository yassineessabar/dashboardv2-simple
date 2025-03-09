import { NextResponse } from "next/server"
import { jwtVerify } from "jose"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongodb"

// Environment variables
const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and password are required" },
        { status: 400 }
      )
    }

    // Verify token
    let payload
    try {
      payload = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      )
    } catch (verifyError) {
      console.error("Token verification failed:", verifyError)
      return NextResponse.json(
        { message: "Invalid or expired reset link" },
        { status: 400 }
      )
    }

    // Check if the token is meant for password reset
    if (payload.payload.purpose !== "password-reset") {
      return NextResponse.json(
        { message: "Invalid token purpose" },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()
    
    // Find the reset token in the database
    const resetRecord = await db.collection("passwordResets").findOne({
      token,
      used: false,
      expiresAt: { $gt: new Date() }
    })

    if (!resetRecord) {
      return NextResponse.json(
        { message: "Invalid or expired reset link" },
        { status: 400 }
      )
    }

    // Get the userId from the token payload
    const userId = payload.payload.userId as string

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update the user's password
    const updateResult = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          password: hashedPassword,
          updatedAt: new Date()
        } 
      }
    )

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Failed to update password" },
        { status: 500 }
      )
    }

    // Mark the reset token as used
    await db.collection("passwordResets").updateOne(
      { _id: resetRecord._id },
      { $set: { used: true } }
    )

    return NextResponse.json({
      message: "Password has been reset successfully",
      success: true
    })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json(
      { message: "Failed to reset password" },
      { status: 500 }
    )
  }
}