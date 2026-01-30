export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  projectId?: string;
  isMagicBuildTrigger?: boolean;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}
