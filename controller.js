import { FileModels } from "./models.js";

export class FileController {
    static async processExcel (req, res) {
        const { file } = req;
        if (!file) {
            return res.status(401).json({ data: null, error: "File is missing" })
        }
        const { status, response } = await FileModels.processExcel(file.buffer)
        return res.status(status).json(response)
    }
    static async insertDB (req, res) {
        const { body } = req;
        if (!body) {
            return res.status(401).json({ data: null, error: "Body is missing" })
        }
        const { status, response } = await FileModels.insertDB(body)
        return res.status(status).json(response)
    }
}