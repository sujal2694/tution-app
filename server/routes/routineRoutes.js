import express from "express";
import {
    createSchedule,
    getAllSchedules,
    getScheduleByDay,
    getScheduleById,
    updateSchedule,
    addItemToSchedule,
    removeItemFromSchedule,
    deleteItem,
} from "../controller/routineController.js";

export const routineRouter = express.Router();

routineRouter.post("/add-routine", createSchedule);       
routineRouter.get("/get-routine", getAllSchedules);        
routineRouter.post("/delete-item", deleteItem);             
routineRouter.get("/day/:day", getScheduleByDay);
routineRouter.get("/:id", getScheduleById);  
routineRouter.put("/:id", updateSchedule);                  
routineRouter.post("/:id/items", addItemToSchedule);        
routineRouter.delete("/:id/items/:itemId", removeItemFromSchedule); 
