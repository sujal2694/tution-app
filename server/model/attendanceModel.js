import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    date: { type: String, required: true }, // store as "YYYY-MM-DD"
    status: { type: String, enum: ["P", "A"], required: true }
}, { timestamps: true });

// one attendance record per student per day
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export const attendanceModel = mongoose.models.attendance || mongoose.model("attendance", attendanceSchema);