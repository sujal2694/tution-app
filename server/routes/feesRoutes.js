import express from "express";
import {
    createFees,
    getAllFees,
    getFeesByStudentId,
    updateFees,
    updateFeesStatus
} from "../controller/feesController.js";

export const feesRouter = express.Router();

feesRouter.post("/save-fees", createFees);
feesRouter.get("/get-fees", getAllFees);
feesRouter.get("/student/:studentId", getFeesByStudentId);  
feesRouter.put("/:id", updateFees); 
feesRouter.patch("/:id/status", updateFeesStatus);          