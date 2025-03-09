import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { createToken } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  console.log("Login API route called")
  
  try {
    // Parse request body
    let body
    try {
      body = await request.json()
      console.log("Request body parsed:", JSON.stringify(body))
    } catch (parseError) {
      console.error("Error parsing request body:", parseError)
      return NextResponse.json({ 
        success: false,
        message: "Invalid request format" 
      }, { status: 400 })
    }
    
    const { email, password } = body

    if (!email || !password) {
      console.log("Missing email or password")
      return NextResponse.json({ 
        success: false,
        message: "Email and password are required" 
      }, { status: 400 })
    }

    // Connect to database
    console.log("Connecting to MongoDB")
    let client
    try {
      client = await clientPromise
      console.log("MongoDB connection successful")
    } catch (dbError) {
      console.error("MongoDB connection error:", dbError)
      return NextResponse.json({ 
        success: false,
        message: "Database connection error" 
      }, { status: 500 })
    }
    
    const db = client.db()
    console.log(`Using database: ${db.databaseName}`)

    // Find user
    console.log(`Looking for user with email: ${email}`)
    const user = await db.collection("users").findOne({ email })

    if (!user) {
      console.log("User not found")
      return NextResponse.json({ 
        success: false,
        message: "Invalid email or password" 
      }, { status: 401 })
    }

    console.log("User found, checking password")
    
    // Compare passwords
    let isPasswordValid
    try {
      isPasswordValid = await bcrypt.compare(password, user.password)
      console.log("Password validation result:", isPasswordValid)
    } catch (pwError) {
      console.error("Password comparison error:", pwError)
      return NextResponse.json({ 
        success: false,
        message: "Authentication error" 
      }, { status: 500 })
    }

    if (!isPasswordValid) {
      console.log("Invalid password provided")
      return NextResponse.json({ 
        success: false,
        message: "Invalid email or password" 
      }, { status: 401 })
    }

    // Create and set JWT token
    console.log("Creating JWT token")
    try {
      const token = await createToken(user._id.toString())
      console.log("Token created successfully")
      
      return NextResponse.json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      })
    } catch (tokenError) {
      console.error("Token creation error:", tokenError)
      return NextResponse.json({ 
        success: false,
        message: "Authentication error" 
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ 
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    }, { status: 500 })
  }
}