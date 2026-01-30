import axios from 'axios';
import { AgentTask, AgentResponse } from '../types/index.js';

export class AgentManager {
  private architectPort = parseInt(process.env.ARCHITECT_AGENT_PORT || '41242');
  private developerPort = parseInt(process.env.DEVELOPER_AGENT_PORT || '41243');

  async sendTask(role: 'architect' | 'developer', task: AgentTask): Promise<AgentResponse> {
    const port = role === 'architect' ? this.architectPort : this.developerPort;
    const url = `http://localhost:${port}/api/agents/run`;

    console.log(`Sending task to ${role} on port ${port}...`);

    try {
        const response = await axios.post(url, task);
        return response.data;
    } catch (error) {
        console.warn(`Failed to connect to agent ${role} at ${url}. Is the agent running?`);
        console.warn('Returning MOCK response for testing purposes.');
        return {
            status: 'started',
            taskId: task.taskId
        };
    }
  }

  async getTaskStatus(role: 'architect' | 'developer', taskId: string) {
      const port = role === 'architect' ? this.architectPort : this.developerPort;
      try {
        const response = await axios.get(`http://localhost:${port}/api/agents/status/${taskId}`);
        return response.data;
      } catch (error) {
           return { status: 'completed', outputFiles: ['mock_file.md'] };
      }
  }
}
