import mongoose from "mongoose";

const driversSchema = {
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  employeeId: {
    type: String,
    trim: true,
    default:'NA'
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    // required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
  },

  isDriving: {
    type: Boolean,
    default: false,
  },
  lastDrivingTime: String,

  totalDrives: {
    type: Number,
    default: 0,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
};

const driverSchema = new mongoose.Schema(driversSchema, { timestamps: true });
const Driver =
  mongoose.models.driversDetails ||
  mongoose.model("driversDetails", driverSchema);

export default Driver;

// export default mongoose.model("driversDetails", driverSchema);
