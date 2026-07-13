import express from "express";
import { addStudent, getStudentById, getStudents, removeStudent, updateStudent } from "../controller/AddStudentController.js";

export const studentRouter = express.Router();

studentRouter.post("/add-student", addStudent);
studentRouter.get("/students", getStudents);
studentRouter.get("/students/:studentId", getStudentById);
studentRouter.delete("/students/:studentId", removeStudent);
studentRouter.put("/students/:studentId", updateStudent);
