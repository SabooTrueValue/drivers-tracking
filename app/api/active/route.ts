import { connectDB } from "@/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    return NextResponse.json({ message: "Connected to DB" }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during database query or processing
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
