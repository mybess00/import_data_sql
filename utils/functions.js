import xlsx from 'xlsx';

export const parseExcelData = (bufferFile) => {
    const workbook = xlsx.read(bufferFile, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    return data
}