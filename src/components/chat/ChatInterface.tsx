import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../../store/chat';
import { Send, Bot, User, Cpu } from 'lucide-react';
import { clsx } from 'clsx';

export const ChatInterface = () => {
  const [input, setInput] = useState('');
  const { messages, addMessage, isTyping } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    addMessage(input, 'user');
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-700 flex items-center gap-2">
          <Bot size={20} className="text-blue-600" />
          Magic Architect
        </h2>
        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Online
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            <Cpu size={48} className="mx-auto mb-2 opacity-50" />
            <p>Ready to build. Describe your project idea.</p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx(
              "flex gap-3 max-w-[80%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              msg.role === 'user' ? "bg-blue-600 text-white" : "bg-purple-600 text-white"
            )}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div className={clsx(
              "p-3 rounded-lg text-sm",
              msg.role === 'user'
                ? "bg-blue-600 text-white rounded-tr-none"
                : "bg-gray-100 text-gray-800 rounded-tl-none"
            )}>
              <p>{msg.content}</p>
              {msg.isMagicBuildTrigger && (
                <button className="mt-3 w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-xs font-medium">
                  Launch Magic Build 🚀
                </button>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 items-center text-gray-400 text-sm ml-12">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-0"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your instructions..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
