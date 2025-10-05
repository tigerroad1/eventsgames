import React from 'react';

export const Chat = () => {
  return (
    <div className="h-full flex flex-col bg-[#252525] p-2 text-white">
      <h2 className="text-lg font-semibold mb-2 border-b border-[#333333] pb-1">Chat IA</h2>
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {/* AI response */}
        <div className="flex">
          <div className="bg-[#3a3a3a] rounded-lg p-3 max-w-md">
            <p className="text-sm">Hello! How can I help you today?</p>
          </div>
        </div>
        {/* User message */}
        <div className="flex justify-end">
          <div className="bg-blue-600 rounded-lg p-3 max-w-md">
            <p className="text-sm">Generate a simple React component.</p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <input
          type="text"
          placeholder="Ask the AI assistant a question..."
          className="w-full p-2 rounded bg-[#3a3a3a] border border-[#444444] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};