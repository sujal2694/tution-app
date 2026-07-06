import express from "express"
import { loginUser } from "../controller/userController.js";

export const userRouter = express.Router();

userRouter.post("/user-login", loginUser)