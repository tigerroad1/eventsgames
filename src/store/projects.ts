import { create } from 'zustand';
import { Project, ProjectConfig } from '../types/project';
import api from '../services/api/client';

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (config: ProjectConfig) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock data for now if backend isn't ready
      // const response = await api.get('/projects');
      // set({ projects: response.data, isLoading: false });

      // Temporary mock
      setTimeout(() => {
        set({
          projects: [
            { id: '1', name: 'Demo Game', description: 'A Solar2D game', status: 'active', technology: 'solar2d', path: '/projects/p1', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
          ],
          isLoading: false
        });
      }, 500);

    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createProject: async (config) => {
    set({ isLoading: true, error: null });
    try {
      await api.post('/projects/create', config);
      // In a real app, we'd refetch or append to list
      set((state) => ({ isLoading: false }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  }
}));
