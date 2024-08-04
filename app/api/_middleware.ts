// pages/api/_middleware.ts

import { authMiddleware } from "@/middleware/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export default async function middlewareHandler(req: NextRequest) {
  const response = await authMiddleware(req);
  if (response) {
    return response;
  }

  // If no response from middleware, continue to the next handler
  return NextResponse.next();
}
