import { create } from 'zustand';
import { ChatMessage, ChatSession } from '../types/chat';
import { v4 as uuidv4 } from 'uuid';
import { MagicBuildDetector } from '../services/magic-build/detector';

interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isTyping: false,

  addMessage: (content, role) => {
    const newMessage: ChatMessage = {
      id: uuidv4(),
      role,
      content,
      timestamp: Date.now(),
    };

    set((state) => ({ messages: [...state.messages, newMessage] }));

    // Simulate assistant response & intent detection
    if (role === 'user') {
      set({ isTyping: true });

      // Check for magic build intent
      const intent = MagicBuildDetector.detectIntent(content);

      setTimeout(() => {
        if (intent.detected) {
          const responseMsg: ChatMessage = {
            id: uuidv4(),
            role: 'assistant',
            content: `I detected a request to build a **${intent.projectConfig?.stack}** project. Shall we start the Magic Build process?`,
            timestamp: Date.now(),
            isMagicBuildTrigger: true
          };
          set((state) => ({
            messages: [...state.messages, responseMsg],
            isTyping: false
          }));
        } else {
          const responseMsg: ChatMessage = {
            id: uuidv4(),
            role: 'assistant',
            content: "I'm here to help you build software. Try asking me to create a project.",
            timestamp: Date.now(),
            isMagicBuildTrigger: false
          };
          set((state) => ({
            messages: [...state.messages, responseMsg],
            isTyping: false
          }));
        }
      }, 1000);
    }
  },

  clearChat: () => set({ messages: [] })
}));
