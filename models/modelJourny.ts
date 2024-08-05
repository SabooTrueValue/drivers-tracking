import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const locationSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  formattedLocation: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  detail: {
    type: String,
    default: "driving to destination",
  },
});

const journeySchema = new mongoose.Schema(
  {
    driversId: {
      type: ObjectId,
      ref: "driversDetails",
      required: true,
      trim: true,
    },
    employeeId: {
      type: String,
      required: true,
      trim: true,
      default:'NA'
    },
    driverName: {
      type: String,
      trim: true,
    },
    pickupOrDrop: {
      index: {
        type: Number,
      },
      isPickup: {
        type: Boolean,
      },
    },
    location: [locationSchema],
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      trim: true,
      set: (value: string) => value.toUpperCase(),
    },
    modeOfTransport: {
      type: String,
      trim: true,
    },
    totalTime: {
      type: String,
    },
    status: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const JourneyModel = mongoose.models.journeyDetails || mongoose.model("journeyDetails", journeySchema);

export default JourneyModel;
