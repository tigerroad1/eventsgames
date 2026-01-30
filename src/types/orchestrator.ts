import { ProjectConfig } from './project';

export interface MagicBuildIntent {
  detected: boolean;
  confidence: number;
  projectConfig?: ProjectConfig;
  missingInfo?: string[];
}

export interface AgentTask {
  id: string;
  type: 'architect' | 'developer';
  command: string;
  context: Record<string, any>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  output?: string;
  error?: string;
}
