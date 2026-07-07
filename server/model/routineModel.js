import mongoose from "mongoose";

export const routineSchema = new mongoose.Schema({
    day: { type: String, required: true },
    time: { type: String, required: true },
    subject: { type: String, required: true },
}, { timestamps: true });

export const routineModel = mongoose.models.model || mongoose.model("routine", routineSchema);