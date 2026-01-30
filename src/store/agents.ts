import { create } from 'zustand';

interface AgentStatus {
  id: string;
  name: string;
  status: 'idle' | 'working' | 'offline';
  currentTask?: string;
  port: number;
}

interface AgentState {
  agents: AgentStatus[];
  updateStatus: (id: string, status: AgentStatus['status'], task?: string) => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  agents: [
    { id: 'architect', name: 'Architect Agent', status: 'idle', port: 41242 },
    { id: 'developer', name: 'Developer Agent', status: 'idle', port: 41243 },
  ],
  updateStatus: (id, status, task) => set((state) => ({
    agents: state.agents.map(a =>
      a.id === id ? { ...a, status, currentTask: task } : a
    )
  }))
}));
