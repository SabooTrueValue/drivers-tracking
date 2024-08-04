import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const db = mongoose.connection;
    db.on("connected", () => {
      console.log("Connected to the database");
    });
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("error", (err) => {
      console.log("Error connecting to the database: ", err);
      process.exit(1);
    });
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
};
