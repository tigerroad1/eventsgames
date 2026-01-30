const { app, BrowserWindow } = require('electron');
const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = 41242;
const server = express();
server.use(cors());
server.use(express.json());

// API Endpoints
server.get('/health', (req, res) => res.json({ status: 'ok', agent: 'architect' }));

server.post('/api/run', (req, res) => {
  const { id, command, context } = req.body;
  console.log(`[Architect] Received task ${id}: ${command}`);

  // Simulation of architectural scaffolding
  // In real implementation, this would spawn a PTY process

  setTimeout(() => {
    console.log(`[Architect] Completed task ${id}`);
  }, 2000);

  res.json({ taskId: id, success: true, status: 'started' });
});

// Start Express
server.listen(PORT, () => {
  console.log(`Architect Agent API listening on port ${PORT}`);
});

// Electron Window (Hidden or Status)
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false, // Headless mode usually
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
