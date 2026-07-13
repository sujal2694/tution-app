import { noticeModel } from "../model/NoticeModel.js";


export const addNotice = async (req, res) => {
    const { title, details, date } = req.body;
    try {
        const newNotice = new noticeModel({
            title,
            details,
            date
        })
        await newNotice.save();
        return res.json({ success: true, newNotice, message: "Notice added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getNotices = async (req, res) => {
    try {
        const notices = await noticeModel.find();
        return res.json({ success: true, notices });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteNotice = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Notice id is required." });
        }

        const existing = await noticeModel.findById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: "Notice not found." });
        }

        await noticeModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Notice deleted." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error deleting notice." });
    }
}