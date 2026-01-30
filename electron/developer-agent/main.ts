import express from 'express';
import cors from 'cors';
import { spawn } from 'node-pty';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 41243;

app.post('/api/agents/run', (req, res) => {
  const { taskId, context } = req.body;
  console.log(`Developer Agent received task ${taskId}`);

  // Simulation of PTY process
  res.json({ status: 'started', taskId });
});

app.get('/api/agents/status/:taskId', (req, res) => {
  res.json({ status: 'completed', outputFiles: ['src/index.js'] });
});

app.listen(PORT, () => {
  console.log(`Developer Agent running on port ${PORT}`);
});
