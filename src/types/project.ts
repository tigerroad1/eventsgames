export type ProjectStatus = 'creating' | 'active' | 'error' | 'paused';

export interface Project {
  id: string;
  name: string;
  description: string;
  path: string;
  status: ProjectStatus;
  technology: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  metadata?: Record<string, any>;
}

export interface ProjectConfig {
  name: string;
  description: string;
  stack: string;
  features: string[];
}
