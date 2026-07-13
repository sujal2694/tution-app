import express from "express";
import {
    markAttendance,
    markBulkAttendance,
    getAllAttendance,
    getAttendanceByStudentId,
    getAttendanceByDate,
    deleteAttendance
} from "../controller/attendenceController.js";

const attendanceRouter = express.Router();

attendanceRouter.post("/mark", markAttendance);
attendanceRouter.post("/mark-bulk", markBulkAttendance);
attendanceRouter.get("/get-attendance", getAllAttendance);
attendanceRouter.get("/student/:studentId", getAttendanceByStudentId); 
attendanceRouter.get("/date/:date", getAttendanceByDate);
attendanceRouter.delete("/:id", deleteAttendance);

export default attendanceRouter;