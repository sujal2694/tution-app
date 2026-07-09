import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({
    char: {type: String, required: true}
}, {timestamps: true});

export const attendenceModel = mongoose.models.model || mongoose.model("attendence", attendenceSchema);