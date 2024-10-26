import { insertData } from './utils/database.js';
import { parseExcelData, getColumnData, validateDataDB } from "./utils/functions.js"

export class FileModels {
    static async processExcel (file) {
        try {
            const data = parseExcelData(file)
            const column = getColumnData(file)
            return { status: 200, response: {data: { data, column }, error: null}}   
        } catch (err) {
            console.error(err)
            return { status: 500, response: {data: null, error: err}}
        }
    }
    static async insertDB (body) {
        try {
            const { data, ...columns } = body
            // Parseando el body
            const parseData = JSON.parse(data).map(row => {
                return {
                    nombre: row[`${columns.nombre}`],
                    apellidos: row[columns.apellidos],
                    email: row[columns.email],
                    fecha: new Date((parseInt(row[columns.fecha]) - 25569) * 86400000),
                    pasaporte: (row[columns.pasaporte]).toString()
                }
            })
            // Validando los datos
            const newData = validateDataDB(parseData)
            if (!newData.success) {
                return { status: 400, response: {data: null, error: newData.error}}              
            }
            // Creando las consultas
            const promises = insertData(newData.data)
            const responseSql = await Promise.allSettled(promises);
            // Verificando la validez de las consultas
            if (responseSql.some(promise => promise.status === "rejected")) {
                return { status: 207, response: {data: newData.data, error: null}}       
            }
            const responseData = responseSql.map(el => el.value)
            return { status: 200, response: {data: responseData, error: null}}              
        } catch (err) {
            console.error(err)
            return { status: 500, response: {data: null, error: err}}
        }
    }
}