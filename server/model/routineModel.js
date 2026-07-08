import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    }
  },
  { _id: false } 
);

const daySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
    items: {
      type: [itemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const routineModel = mongoose.models.model || mongoose.model("routine", daySchema);