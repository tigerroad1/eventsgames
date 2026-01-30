import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 3001;
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  logger.info(`Backend server running on port ${port}`);
});
