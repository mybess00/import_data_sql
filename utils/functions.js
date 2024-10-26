import xlsx from 'xlsx';
import z from "zod"

export const parseExcelData = (bufferFile) => {
    const workbook = xlsx.read(bufferFile, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    return data
}

export const getColumnData = (bufferFile) => {
    const workbook = xlsx.read(bufferFile, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    return data[0]
}

export const validateDataDB = (input) => {
    const dbScheme = z.object({
        nombre: z.string().min(1).max(50),
        apellidos: z.string().min(1).max(50),
        fecha: z.date(),
        pasaporte: z.string().min(1).max(50),
        email: z.string().min(1).max(50),
    })
    
    return z.array(dbScheme).safeParse(input)
}