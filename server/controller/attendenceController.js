import { attendanceModel } from "../model/attendanceModel.js";

// Mark/update attendance for a single student on a given date
export const markAttendance = async (req, res) => {
    try {
        const { studentId, date, status } = req.body;

        if (!studentId || !date || !status) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (!["P", "A"].includes(status)) {
            return res.status(400).json({ success: false, message: "Status must be 'P' or 'A'" });
        }

        const attendance = await attendanceModel.findOneAndUpdate(
            { studentId, date },
            { studentId, date, status },
            { new: true, upsert: true, runValidators: true }
        );

        return res.status(200).json({ success: true, message: "Attendance saved successfully", data: attendance });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Mark attendance for multiple students at once (e.g. submitting the whole day's list)
export const markBulkAttendance = async (req, res) => {
    try {
        const { date, records } = req.body; // records = [{ studentId, status }, ...]

        if (!date || !Array.isArray(records) || records.length === 0) {
            return res.status(400).json({ success: false, message: "Date and records are required" });
        }

        const invalid = records.find(r => !r.studentId || !["P", "A"].includes(r.status));
        if (invalid) {
            return res.status(400).json({ success: false, message: "Each record needs a valid studentId and status" });
        }

        const operations = records.map(({ studentId, status }) => ({
            updateOne: {
                filter: { studentId, date },
                update: { studentId, date, status },
                upsert: true
            }
        }));

        await attendanceModel.bulkWrite(operations);

        return res.status(200).json({ success: true, message: "Attendance saved for all students" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getAllAttendance = async (req, res) => {
    try {
        const attendance = await attendanceModel.find().sort({ date: -1 });
        return res.status(200).json({ success: true, count: attendance.length, data: attendance });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get every attendance record for one student (their full history)
export const getAttendanceByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;
        const attendance = await attendanceModel.find({ studentId }).sort({ date: -1 });

        if (!attendance || attendance.length === 0) {
            return res.status(404).json({ success: false, message: "No attendance found for this student" });
        }

        return res.status(200).json({ success: true, data: attendance });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get every student's attendance for one specific date
export const getAttendanceByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const attendance = await attendanceModel.find({ date });

        return res.status(200).json({ success: true, data: attendance });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await attendanceModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Attendance record not found" });
        }

        return res.status(200).json({ success: true, message: "Attendance record deleted", data: deleted });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};