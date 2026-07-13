import express from 'express';
import { addNotice, deleteNotice, getNotices } from '../controller/noticeController.js';

export const noticeRouter = express.Router();

noticeRouter.post("/add-notice", addNotice);
noticeRouter.get("/get-notices", getNotices);
noticeRouter.post("/delete-notice", deleteNotice);