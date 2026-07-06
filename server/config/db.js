import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URL;

    if (!mongoURI) {
        console.error("MongoDB URI is missing. Please set MONGODB_URL in your .env file.");
        return;
    }

    try {
        await mongoose.connect(mongoURI);
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection failed:", error.message);
        throw error;
    }
};