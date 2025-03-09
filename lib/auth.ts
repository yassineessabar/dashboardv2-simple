import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"
import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key"

export async function createToken(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(new TextEncoder().encode(JWT_SECRET))

  cookies().set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  })

  return token
}

export async function verifyToken() {
  const token = cookies().get("auth-token")?.value

  if (!token) return null

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))

    return verified.payload as { userId: string }
  } catch (error) {
    return null
  }
}

export async function getCurrentUser() {
  const payload = await verifyToken()

  if (!payload) return null

  const client = await clientPromise
  const db = client.db()

  const user = await db.collection("users").findOne({
    _id: new ObjectId(payload.userId),
  })

  if (!user) return null

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    // Add other user fields as needed
  }
}

export async function logout() {
  cookies().delete("auth-token")
}

