import mongoose from "mongoose";

const adminSchema = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    
    unique: true,
    trim: true,
    lowercase: true,
    //   match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
};


const adminModel = new mongoose.Schema(adminSchema, { timestamps: true });


const Admin = mongoose.models.adminDetails || mongoose.model("adminDetails", adminModel);
export default Admin