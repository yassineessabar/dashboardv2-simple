import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

// Mark this route as dynamic since it uses cookies
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    console.error("Profile API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
