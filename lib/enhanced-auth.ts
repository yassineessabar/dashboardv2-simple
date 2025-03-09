import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"
import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key"

export async function createToken(userId: string) {
  console.log("Creating token for user ID:", userId)
  
  try {
    console.log("Using JWT_SECRET length:", JWT_SECRET.length)
    
    // Create the JWT token
    const token = await new SignJWT({ userId })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(JWT_SECRET))
    
    console.log("Token created successfully")
    
    // Set the cookie
    try {
      const cookieStore = cookies()
      cookieStore.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      })
      console.log("Cookie set successfully")
    } catch (cookieError) {
      console.error("Error setting cookie:", cookieError)
      // Continue even if cookie fails - might be in a context where cookies can't be set
    }
    
    return token
  } catch (error) {
    console.error("Token creation error:", error)
    throw error
  }
}

export async function verifyToken() {
  console.log("Verifying token")
  
  try {
    const token = cookies().get("auth-token")?.value
    console.log("Token exists:", !!token)
    
    if (!token) return null
    
    try {
      const verified = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
      console.log("Token verified successfully")
      
      return verified.payload as { userId: string }
    } catch (verifyError) {
      console.error("Token verification error:", verifyError)
      return null
    }
  } catch (error) {
    console.error("Token verification process error:", error)
    return null
  }
}

export async function getCurrentUser() {
  console.log("Getting current user")
  
  try {
    const payload = await verifyToken()
    console.log("Token payload:", payload)
    
    if (!payload) return null
    
    try {
      const client = await clientPromise
      const db = client.db()
      
      console.log("Looking up user with ID:", payload.userId)
      
      try {
        const objectId = new ObjectId(payload.userId)
        
        const user = await db.collection("users").findOne({
          _id: objectId,
        })
        
        console.log("User found:", !!user)
        
        if (!user) return null
        
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        }
      } catch (objectIdError) {
        console.error("Invalid ObjectId format:", objectIdError)
        return null
      }
    } catch (dbError) {
      console.error("Database error in getCurrentUser:", dbError)
      return null
    }
  } catch (error) {
    console.error("Error in getCurrentUser:", error)
    return null
  }
}

export async function logout() {
  console.log("Logging out")
  
  try {
    cookies().delete("auth-token")
    console.log("Cookie deleted successfully")
  } catch (error) {
    console.error("Error during logout:", error)
    throw error
  }
}