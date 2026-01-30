export interface MagicBuildIntent {
  isMagicBuild: boolean;
  confidence: number;
  projectType: 'game' | 'api' | 'web' | 'mobile' | 'unknown';
  technology: string;
  description: string;
  extractedParams?: Record<string, any>;
}

export interface ProjectConfig {
  id: string;
  name: string;
  description: string;
  technology: string;
  path: string;
  status: 'creating' | 'active' | 'error' | 'paused';
  createdAt: number;
  updatedAt: number;
}

export interface AgentTask {
  taskId: string;
  projectId: string;
  projectPath: string;
  role: 'architect' | 'developer';
  context: {
    userPrompt?: string;
    skillContext?: string;
    architecturePath?: string;
    ragContext?: string;
  };
}

export interface Skill {
  name: string;
  description: string;
  content: string;
}
