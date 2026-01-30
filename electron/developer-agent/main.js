const { app, BrowserWindow } = require('electron');
const express = require('express');
const cors = require('cors');

const PORT = 41243;
const server = express();
server.use(cors());
server.use(express.json());

// API Endpoints
server.get('/health', (req, res) => res.json({ status: 'ok', agent: 'developer' }));

server.post('/api/run', (req, res) => {
  const { id, command, context } = req.body;
  console.log(`[Developer] Received task ${id}: ${command}`);

  // Simulation of development work
  // In real implementation, this would watch files and run codemods

  setTimeout(() => {
    console.log(`[Developer] Completed task ${id}`);
  }, 3000);

  res.json({ taskId: id, success: true, status: 'started' });
});

// Start Express
server.listen(PORT, () => {
  console.log(`Developer Agent API listening on port ${PORT}`);
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
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
