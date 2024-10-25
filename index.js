import 'dotenv/config'
import { fileRouter } from './routes.js';
import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views", 'index.html'));
});
app.use("/api/file", fileRouter)

app.listen(PORT, () => console.log(`Servidor en: http://localhost:${PORT}`))