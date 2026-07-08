import e from "express";
import { createSchedule, deleteItem, getAllSchedules, getScheduleByDay } from "../controller/routineController.js";

export const routineRouter = e.Router();

routineRouter.post("/add-routine", createSchedule);
routineRouter.get("/get-routine", getAllSchedules);
routineRouter.get("/day/:day", getScheduleByDay);
routineRouter.post('/delete-item', deleteItem);