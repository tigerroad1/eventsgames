import { create } from 'zustand';
import { ProjectConfig } from '../types/index.js';

interface ProjectsStore {
  projects: ProjectConfig[];
  addProject: (project: ProjectConfig) => void;
  updateProject: (id: string, updates: Partial<ProjectConfig>) => void;
}

export const useProjectsStore = create<ProjectsStore>((set) => ({
  projects: [],
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
}));
