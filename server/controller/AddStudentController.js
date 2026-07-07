import bcrypt from "bcrypt";
import { studentModel } from "../model/studentModel.js";

export const addStudent = async (req, res) => {
    const { fullName, studentId, standard, phone, password } = req.body;

    if (!fullName || !studentId || !standard || !phone) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields"
        });
    }

    try {
        const exists = await studentModel.findOne({ studentId: studentId.trim() });
        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Student already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const student = await studentModel.create({
            fullName: fullName.trim(),
            studentId: studentId.trim(),
            standard: standard.trim(),
            phone: phone.trim(),
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Student added successfully",
            student: {
                _id: student._id,
                fullName: student.fullName,
                studentId: student.studentId,
                standard: student.standard,
                phone: student.phone,
                password: hashedPassword
            }
        });
    } catch (error) {
        console.error("Add student error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add student"
        });
    }
};

export const getStudents = async (req, res) => {
    try {
        const students = await studentModel.find({}, { password: 0 }).sort({ createdAt: -1 });
        res.json({
            success: true,
            students
        });
    } catch (error) {
        console.error("Get students error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch students"
        });
    }
};

export const removeStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const removedStudent = await studentModel.findOneAndDelete({ studentId });

        if (!removedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.json({
            success: true,
            message: "Student removed successfully",
            studentId
        });
    } catch (error) {
        console.error("Remove student error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to remove student"
        });
    }
};

export const updateStudent = async (req, res) => {
    const { studentId } = req.params;
    const { fullName, standard, phone } = req.body;

    try {
        const updatedStudent = await studentModel.findOneAndUpdate(
            { studentId },
            { $set: { fullName, standard, phone } },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.json({
            success: true,
            message: "Student updated successfully",
            student: updatedStudent
        });
    } catch (error) {
        console.error("Update student error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update student"
        });
    }
};
