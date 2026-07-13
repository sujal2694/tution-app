import { feesModel } from "../model/feesModel.js";

export const createFees = async (req, res) => {
    try {
        const { studentId, month, amount, status } = req.body;

        if (!studentId || !month || !amount || !status) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newFees = new feesModel({ studentId, month, amount, status });
        const savedFees = await newFees.save();

        return res.status(201).json({ success: true, message: "Fees record created successfully", data: savedFees });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: "Fees record already exists for this student" });
        }
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getAllFees = async (req, res) => {
    try {
        const fees = await feesModel.find();
        return res.status(200).json({ success: true, count: fees.length, data: fees });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getFeesByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;
        const fees = await feesModel.find({ studentId });

        if (!fees || fees.length === 0) {
            return res.status(404).json({ success: false, message: "No fees record found for this student" });
        }

        return res.status(200).json({ success: true, data: fees });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const updateFees = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId, month, amount, status } = req.body;

        const updatedFees = await feesModel.findByIdAndUpdate(
            id,
            { studentId, month, amount, status },
            { new: true, runValidators: true }
        );

        if (!updatedFees) {
            return res.status(404).json({ success: false, message: "Fees record not found" });
        }

        return res.status(200).json({ success: true, message: "Fees record updated successfully", data: updatedFees });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const updateFeesStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }

        const updatedFees = await feesModel.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

        if (!updatedFees) {
            return res.status(404).json({ success: false, message: "Fees record not found" });
        }

        return res.status(200).json({ success: true, message: "Fees status updated successfully", data: updatedFees });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
