import homeworkModel from "../models/homeworkModel.js";

// Add homework for an entire standard
const addHomeWork = async (req, res) => {
    try {
        const { subject, description, date, standard } = req.body;

        if (!subject || !date || !standard) {
            return res.json({
                success: false,
                message: "Subject, date, and standard are required.",
            });
        }

        const homework = new homeworkModel({
            subject,
            description,
            date,
            standard,
        });

        await homework.save();

        res.json({ success: true, message: "Homework added", data: homework });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding homework" });
    }
};

// Get all homework (admin view)
const getHomeWork = async (req, res) => {
    try {
        const homeWorks = await homeworkModel.find({}).sort({ date: -1 });
        res.json({ success: true, homeWorks });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching homework" });
    }
};

// Get homework for a specific student's standard (student view)
const getHomeWorkByStandard = async (req, res) => {
    try {
        const { standard } = req.params;

        if (!standard) {
            return res.json({ success: false, message: "Standard is required" });
        }

        const homeWorks = await homeworkModel
            .find({ standard })
            .sort({ date: -1 });

        res.json({ success: true, homeWorks });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching homework" });
    }
};

// Mark homework as submitted by a specific student
const submitHomeWork = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId } = req.body;

        if (!studentId) {
            return res.json({ success: false, message: "studentId is required" });
        }

        const homework = await homeworkModel.findById(id);
        if (!homework) {
            return res.json({ success: false, message: "Homework not found" });
        }

        // avoid duplicate entries if the student double-submits
        if (!homework.submittedBy.includes(studentId)) {
            homework.submittedBy.push(studentId);
            await homework.save();
        }

        res.json({ success: true, message: "Homework marked as submitted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error submitting homework" });
    }
};

// Delete homework
const deleteHomeWork = async (req, res) => {
    try {
        const { id } = req.body;
        await homeworkModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Homework deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error deleting homework" });
    }
};

export {
    addHomeWork,
    getHomeWork,
    getHomeWorkByStandard,
    submitHomeWork,
    deleteHomeWork,
};