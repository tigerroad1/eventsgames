import { create } from 'zustand';

interface EditorState {
  selectedEntity: number | null;
  selectEntity: (eid: number | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  selectedEntity: null,
  selectEntity: (eid) => set({ selectedEntity: eid }),
}));
