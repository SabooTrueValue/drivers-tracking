import { connectDB } from "@/dbConfig/dbConfig";
import Driver from "@/models/driverModel";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
// import Journey from "@/models/modelJourny";
import bcrypt from "bcryptjs";
import Admin from "@/models/modelAdmin";

connectDB();

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
      const phoneExist = await Driver.findOne({ phone });
      if (phoneExist)
        return NextResponse.json(
          { message: "Phone number is already used" },
          // { message: "Reqired fields are missing" },
          { status: 400 }
        );
    }
    if (employeeId && employeeId !== "NA") {
      const employeeIdExist = await Driver.findOne({
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

    reqBody.totalDrives = 1;
    console.log(reqBody);


    let saveData = await Driver.create(reqBody);

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
    let data = await Driver.findOne(filter).sort({ createdAt: -1 });

    if (!data) {
      data = await Admin.findOne(filter);
    }
    // Check if users are found
    if (!data || data.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    // const journeyData = await Journey.find({ driversId: driverId }).sort({
    //   createdAt: -1,
    // });

    // console.log(journeyData);

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
