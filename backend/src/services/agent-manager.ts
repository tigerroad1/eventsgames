import axios from 'axios';
import { AgentTask, AgentResponse } from '../types/agent.js';
import pino from 'pino';

const logger = pino({ name: 'agent-manager' });

export class AgentManager {
  private architectPort = process.env.ARCHITECT_AGENT_PORT || 41242;
  private developerPort = process.env.DEVELOPER_AGENT_PORT || 41243;

  private async sendToAgent(port: string | number, endpoint: string, data: any): Promise<AgentResponse> {
    try {
      const url = `http://localhost:${port}/api/${endpoint}`;
      logger.info(`Sending task to agent at ${url}`);
      const response = await axios.post(url, data);
      return response.data;
    } catch (error: any) {
      logger.error(`Failed to communicate with agent at port ${port}: ${error.message}`);
      return {
        taskId: data.id || 'unknown',
        success: false,
        error: error.message
      };
    }
  }

  async dispatchTask(task: AgentTask): Promise<AgentResponse> {
    const port = task.type === 'architect' ? this.architectPort : this.developerPort;
    return this.sendToAgent(port, 'run', task);
  }

  async getAgentStatus(type: 'architect' | 'developer'): Promise<boolean> {
    const port = type === 'architect' ? this.architectPort : this.developerPort;
    try {
      await axios.get(`http://localhost:${port}/health`);
      return true;
    } catch {
      return false;
    }
  }
}
