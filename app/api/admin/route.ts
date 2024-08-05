import { connectDB } from "@/dbConfig/dbConfig";
import Admin from "@/models/modelAdmin";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Driver from "@/models/driverModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const reqBody = await req.json();
    const { phone, employeeId } = reqBody;
    console.log(reqBody);
    if (!phone) {
      return NextResponse.json(
        { message: "Phone number is missing" },
        // { message: "Reqired fields are missing" },
        { status: 400 }
      );
    } else {
      const phoneExist = await Admin.findOne({ phone });
      if (phoneExist)
        return NextResponse.json(
          { message: "Phone number is already used" },
          // { message: "Reqired fields are missing" },
          { status: 400 }
        );
    }
    if (!employeeId) {
      return NextResponse.json(
        { message: "EmployeeId is missing" },
        // { message: "Reqired fields are missing" },
        { status: 400 }
      );
    } else {
      const employeeIdExist = await Admin.findOne({
        employeeId,
      });
      if (employeeIdExist)
        return NextResponse.json(
          { message: "EmployeeId already exists" },
          // { message: "Reqired fields are missing" },
          { status: 400 }
        );
    }
    const encryptPass = await bcrypt.hash(reqBody.password, 10);
    reqBody.password = encryptPass;

    let saveData = await Admin.create(reqBody);

    // Return users with success status
    return NextResponse.json(
      { data: saveData, message: "success" },
      { status: 201 }
    );
  } catch (error) {
    // Handle any errors that occur during database query or processing
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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
    const data = await Driver.find().sort({ createdAt: -1 });

    // Check if users are found
    if (!data || data.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    // Return users with success status
    return NextResponse.json({ data, message: "success" }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during database query or processing
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
