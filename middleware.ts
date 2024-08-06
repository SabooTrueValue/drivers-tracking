import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";

export async function middleware(req: NextRequest) {
  // Add your middleware code here. This function must return a response object.
  const cookie = req.cookies.get("token");
  await connectDB();
  console.log(req.url);
  console.log(cookie)
  if (!cookie && req.url.includes("/profile") ) {
   return NextResponse.redirect(new URL("/login", req.url).toString(), 303);
  }
}