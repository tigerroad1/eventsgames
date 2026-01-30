export interface AgentTask {
  id: string;
  type: 'architect' | 'developer';
  command: string;
  context: Record<string, any>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  output?: string;
  error?: string;
}

export interface AgentResponse {
  taskId: string;
  success: boolean;
  data?: any;
  error?: string;
}
