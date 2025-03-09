import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

export async function GET() {
  console.log("MongoDB debug route called")
  
  try {
    // Check environment variables
    const uri = process.env.MONGODB_URI
    console.log("MongoDB URI exists:", !!uri)
    
    if (!uri) {
      return NextResponse.json({
        success: false,
        message: "MONGODB_URI environment variable is not set",
        envVars: {
          NODE_ENV: process.env.NODE_ENV,
          hasMongoDBUri: !!process.env.MONGODB_URI,
          hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET
        }
      }, { status: 500 })
    }
    
    // Try direct connection
    console.log("Attempting direct MongoDB connection")
    const client = new MongoClient(uri)
    
    try {
      await client.connect()
      console.log("Direct connection successful")
      
      const db = client.db()
      console.log("Database:", db.databaseName)
      
      // List collections
      const collections = await db.listCollections().toArray()
      const collectionNames = collections.map(c => c.name)
      console.log("Collections:", collectionNames)
      
      // Check for users collection
      const hasUsersCollection = collectionNames.includes("users")
      console.log("Has users collection:", hasUsersCollection)
      
      // Sample user (if exists)
      let sampleUser = null
      if (hasUsersCollection) {
        sampleUser = await db.collection("users").findOne(
          {}, 
          { projection: { _id: 1, email: 1, name: 1 } }
        )
        console.log("Sample user exists:", !!sampleUser)
      }
      
      await client.close()
      
      return NextResponse.json({
        success: true,
        message: "MongoDB connection test successful",
        database: db.databaseName,
        collections: collectionNames,
        hasUsersCollection,
        hasSampleUser: !!sampleUser,
        sampleUser: sampleUser ? {
          id: sampleUser._id.toString(),
          email: sampleUser.email,
          hasPassword: !!sampleUser.password,
          hasName: !!sampleUser.name
        } : null
      })
    } catch (error) {
      console.error("Direct connection error:", error)
      return NextResponse.json({
        success: false,
        message: "MongoDB direct connection failed",
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      }, { status: 500 })
    } finally {
      try {
        await client.close()
      } catch (e) {
        console.error("Error closing MongoDB connection:", e)
      }
    }
  } catch (error) {
    console.error("MongoDB debug route error:", error)
    return NextResponse.json({
      success: false,
      message: "MongoDB debug route failed",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined 
    }, { status: 500 })
  }
}