import express from "express";
import { addStudent, getStudents, removeStudent, updateStudent } from "../controller/AddStudentController.js";

export const studentRouter = express.Router();

studentRouter.post("/add-student", addStudent);
studentRouter.get("/students", getStudents);
studentRouter.get("/", getStudents);
studentRouter.delete("/students/:studentId", removeStudent);
studentRouter.put("/students/:studentId", updateStudent);
