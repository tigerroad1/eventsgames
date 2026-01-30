import express from 'express';
import cors from 'cors';
import { spawn } from 'node-pty';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 41242;

app.post('/api/agents/run', (req, res) => {
  const { taskId, context } = req.body;
  console.log(`Architect Agent received task ${taskId}`);

  // Simulation of PTY process
  // In a real Electron app, we would spawn a terminal here
  res.json({ status: 'started', taskId });
});

app.get('/api/agents/status/:taskId', (req, res) => {
  res.json({ status: 'completed', outputFiles: ['architecture.md'] });
});

app.listen(PORT, () => {
  console.log(`Architect Agent running on port ${PORT}`);
});
