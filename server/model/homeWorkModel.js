import mongoose from "mongoose";

const homeworkSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        date: {
            type: Date,
            required: true,
        },
        standard: {
            type: String,
            required: true,
        },
        // tracks which students (by studentId) have marked this as submitted
        submittedBy: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const homeworkModel =
    mongoose.models.homework || mongoose.model("homework", homeworkSchema);

export default homeworkModel;