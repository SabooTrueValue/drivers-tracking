// middleware/authMiddleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("token");

  // Example: Check if token exists for protected routes
  if (!token && req.url.includes("/profile")) {
    return NextResponse.redirect("/login", 303);
  }

  // Continue with next middleware or route handler if no conditions are matched
  return NextResponse.next();
}
