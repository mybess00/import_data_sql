import { insertData } from './utils/database.js';
import { parseExcelData } from "./utils/functions.js"

export class FileModels {
    static async processExcel (file) {
        try {
            const data = parseExcelData(file)
            const promises = insertData(data)

            const responseSql = await Promise.allSettled(promises);
            if (responseSql.some(promise => promise.status === "rejected")) {
                return { status: 207, response: {data, error: null}}       
            }
            const responseData = responseSql.map(el => el.value)
            return { status: 200, response: {data: responseData, error: null}}   
        } catch (err) {
            console.log(err)
            return { status: 500, response: {data: null, error: err}}
        }
    }
}