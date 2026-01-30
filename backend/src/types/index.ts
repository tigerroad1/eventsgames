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

export interface AgentResponse {
    status: string;
    taskId: string;
    outputFiles?: string[];
}
