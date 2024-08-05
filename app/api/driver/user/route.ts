import { connectDB } from "@/dbConfig/dbConfig";
import Driver from "@/models/driverModel";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Journey from "@/models/modelJourny";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    interface Values {
      _id?: string | mongoose.Types.ObjectId;
      isDeleted: boolean;
    }
    // Initialize filter to find non-deleted users
    let filter: Values = { isDeleted: false };

    // Extract query parameters from req.url
    // const queryParams = new URLSearchParams(req.url.split("?")[1]);
    const driverId = cookies().get("_id")?.value;

    // Check if driverId query parameter is provided
    if (driverId) {
      filter._id = driverId;
    }

    // Query database for users based on filter
    const data = await Driver.findOne(filter).sort({ createdAt: -1 });

    // Check if users are found
    if (!data || data.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    const journeyData = await Journey.find({ driverId }).sort({
      createdAt: -1,
    });

    // Return users with success status
    return NextResponse.json({ data,journeyData, message: "success" }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during database query or processing
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}