import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Add your middleware code here. This function must return a response object.
  const cookie = req.cookies.get("token");
  console.log(req.url);
  console.log(cookie)
  if (!cookie && req.url.includes("/profile") ) {
   return NextResponse.redirect(new URL("/login", req.url).toString(), 303);
  }
}