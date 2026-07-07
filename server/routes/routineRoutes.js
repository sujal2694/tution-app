import e from "express";
import { addRoutine, getRoutines } from "../controller/routineController.js";

export const routineRouter = e.Router();

routineRouter.post("/add-routine", addRoutine);
routineRouter.get("/get-routine", getRoutines);