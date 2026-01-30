import express from 'express';
import dotenv from 'dotenv';
import { MagicBuildOrchestrator } from './services/magic-build-orchestrator.js';

dotenv.config();

const app = express();
app.use(express.json());

const orchestrator = new MagicBuildOrchestrator();

app.post('/api/magic-build/trigger', async (req, res) => {
    try {
        const { technology, description } = req.body;
        const result = await orchestrator.runFullMagicBuild({ technology, description });
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.BACKEND_PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
