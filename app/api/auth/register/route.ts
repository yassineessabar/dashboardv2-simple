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

    // Trigger email sending in the background without awaiting
    // This makes the registration process faster
    console.log(`Triggering welcome email process for new user: ${email}`);
    Promise.resolve().then(async () => {
      try {
        const emailSent = await sendWelcomeEmail({
          name,
          email
        });
        console.log(`Welcome email process completed with status: ${emailSent ? 'Success' : 'Failed'}`);
        
        if (!emailSent) {
          console.warn(`Welcome email could not be sent to ${email}. User was still registered successfully.`);
        }
      } catch (emailError) {
        console.error('Failed to send welcome emails:', emailError);
        
        if (emailError instanceof Error) {
          console.error('Email error details:', {
            name: emailError.name,
            message: emailError.message,
            stack: emailError.stack
          });
        }
      }
    });

    // Return response immediately without waiting for email to send
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
    console.error("Registration error:", error);
    
    if (error instanceof Error) {
      console.error('Registration error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}