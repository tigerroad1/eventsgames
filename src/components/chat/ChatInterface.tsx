import React, { useState } from 'react';
import { MagicBuildIntent } from '../../types/index.js';
import { MagicBuildDetector } from '../../services/magic-build-detector.js';

const detector = new MagicBuildDetector();

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const intent = detector.detectIntent(input);
    const newMessages = [...messages, { role: 'user', content: input }];

    if (intent.isMagicBuild) {
        newMessages.push({
            role: 'system',
            content: `🧙‍♂️ Magic Build Detected! Starting project: ${intent.technology} (${intent.projectType})`
        });
        // Trigger backend (mocked for frontend-only view)
    }

    setMessages(newMessages);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`p-2 rounded ${m.role === 'user' ? 'bg-blue-600 self-end' : 'bg-gray-700 self-start'}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded bg-gray-800 border border-gray-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type 'Create a solar2d game'..."
        />
        <button onClick={handleSend} className="bg-indigo-600 px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
};
