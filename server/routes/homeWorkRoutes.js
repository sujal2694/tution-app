import express from 'express';
import { addHomeWork, deleteHomeWork, getHomeWork } from '../controller/homeWorkController.js';

export const homeWorkRouter = express.Router();

homeWorkRouter.post('/add-home-work', addHomeWork);
homeWorkRouter.get('/get-home-work', getHomeWork);
homeWorkRouter.post('/delete-home-work', deleteHomeWork);