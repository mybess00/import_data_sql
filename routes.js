import { Router } from "express";
import { FileController } from "./controller.js";
import multer from 'multer'

export const fileRouter = Router()
const upload = multer()

fileRouter.post("/excel", upload.single('file'), FileController.processExcel)
fileRouter.post("/database", upload.none(), FileController.insertDB)