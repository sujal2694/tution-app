import { attendenceModel } from "../model/attendenceModel";



export const addAttendence = (req, res) => {
    const { char, index } = req.body;
    if (!char || index === undefined) {
      return res.status(400).json({ success: false, message: "Day and index are required" });
    }

    const attendence = new attendenceModel
}