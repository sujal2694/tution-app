import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

export const userModel = mongoose.models.user || mongoose.model("user",userSchema);