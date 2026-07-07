import { routineModel } from "../model/routineModel.js";

export const addRoutine = async (req, res) => {
    const { day, time, subject } = req.body;

    try {
        const newRoutine = new routineModel({
            day,
            time,
            subject
        });

        await newRoutine.save();
        return res.status(201).json({
            success: true,
            message: "Routine added successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Routine not added"
        });
    }
};

export const getRoutines = async (req, res) => {
    try {
        const routines = await routineModel.find({}).sort({ createdAt: -1 });
        return res.json({
            success: true,
            routines
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch routines"
        });
    }
};