import { connectDB } from "@/dbConfig/dbConfig";
import Driver from "@/models/driverModel";
import Journey from "@/models/modelJourny";
import moment from "moment";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const data = await req.json();
    // const { phone, password } = reqBody;
    console.log(data);
    if (!data) {
      return NextResponse.json(
        { message: "Reqired fields are missing" },
        { status: 400 }
      );
    }

    const date = moment().format("DD/MM/YYYY");
    const time = moment().format("HH:mm:ss");

    data.date = date;
    data.time = time;
    data.location[0].time = time;
    data.location[0].date = date;

    const driverId = cookies().get("_id")?.value;

    //check if user exists
    let saveData = await Journey.create(data);
    console.log(saveData);
    let saveDriver = await Driver.updateOne(
      { _id: driverId },
      { $set: { isDriving: true } },
      { new: true, upsert: true }
    );

    if (!saveData || !saveDriver) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    //check if password is correct

    return NextResponse.json({
      status: true,
      data: saveData,
      message: "Journey created successfully",
    }, { status: 201 });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
