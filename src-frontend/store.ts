import { create } from 'zustand';

export type SimulationState = 'stopped' | 'playing' | 'paused';

interface EditorState {
  selectedEntity: number | null;
  selectEntity: (eid: number | null) => void;
  simulationState: SimulationState;
  setSimulationState: (state: SimulationState) => void;
  snapToGrid: boolean;
  toggleSnapToGrid: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  selectedEntity: null,
  selectEntity: (eid) => set({ selectedEntity: eid }),
  simulationState: 'stopped',
  setSimulationState: (state) => set({ simulationState: state }),
  snapToGrid: false,
  toggleSnapToGrid: () => set((state) => ({ snapToGrid: !state.snapToGrid })),
}));
