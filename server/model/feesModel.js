import mongoose from "mongoose";


const feesSchema = new mongoose.Schema({
    studentId: {type: String, required: true, unique: true},
    month: {type: String, required: true},
    amount: {type: String, required: true},
    status: {type: String, required: true}
})

export const feesModel = mongoose.models.fees || mongoose.model("fees", feesSchema);