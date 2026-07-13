import { homeWorkModel } from "../model/homeWorkModel.js";



export const addHomeWork = async (req, res) => {
    try {
        const { subject, description, date } = req.body;

        const newHomeWork = new homeWorkModel({
            subject,
            description,
            date
        });
        await newHomeWork.save();

        res.status(201).json({ success: true, message: 'Homework added successfully', homeWork: newHomeWork });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error adding homework', error: error.message });
    }
}

export const getHomeWork = async (req, res) => {
    try {
        const homeWorks = await homeWorkModel.find();
        res.status(200).json({ success: true, message: 'Homework retrieved successfully', homeWorks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error retrieving homework', error: error.message });
    }
}

export const deleteHomeWork = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Homework id is required." });
        }

        const existing = await homeWorkModel.findById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: "Homework not found." });
        }

        await homeWorkModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Homework deleted." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error deleting homework." });
    }
}