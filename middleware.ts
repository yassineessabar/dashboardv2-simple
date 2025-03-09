import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the token from the cookies
  const token = request.cookies.get("auth-token")?.value

  // Define public paths that don't require authentication
  const publicPaths = [
    "/auth", 
    "/api/auth/login", 
    "/api/auth/register",
    "/forgot-password",          // Allow access to forgot password
    "/reset-password",           // Allow access to reset password
    "/api/auth/forgot-password", // Allow access to forgot password API
    "/api/auth/reset-password"   // Allow access to reset password API
  ]
  
  // Check if the requested path is public
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(path)
  )
  
  // Allow access to static assets and API routes not specifically protected
  const isStaticAsset = 
    request.nextUrl.pathname.startsWith("/_next") || 
    request.nextUrl.pathname.startsWith("/static") ||
    (request.nextUrl.pathname.startsWith("/api/") && !request.nextUrl.pathname.includes("/api/protected/"))

  // If accessing a protected route without a token, redirect to login
  if (!isPublicPath && !isStaticAsset && !token) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }
  
  // If accessing login/register with a token, redirect to dashboard
  // But don't redirect for password reset routes even if logged in
  if (token && (request.nextUrl.pathname === "/auth")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all paths except static assets
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ],
}