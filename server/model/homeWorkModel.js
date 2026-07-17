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
        }
    },
    { timestamps: true }
);

const homeworkModel = mongoose.models.model || mongoose.model("homework", homeworkSchema);

export default homeworkModel;