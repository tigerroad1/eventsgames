import React from 'react';
import { ChatInterface } from './components/chat/ChatInterface';
import { ProjectGrid } from './components/projects/ProjectGrid';
import { useAgentStore } from './store/agents';
import { Activity, Server } from 'lucide-react';

function App() {
  const { agents } = useAgentStore();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Magic Build</h1>
        </div>

        <div className="flex items-center gap-4">
          {agents.map(agent => (
            <div key={agent.id} className="flex items-center gap-2 text-xs bg-gray-100 px-3 py-1.5 rounded-full">
              <Server size={14} className="text-gray-500" />
              <span className="font-medium text-gray-700">{agent.name}</span>
              <span className={`w-2 h-2 rounded-full ${agent.status === 'idle' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full">
        {/* Left Column: Chat & Wizard */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 h-[calc(100vh-100px)]">
          <div className="flex-1 min-h-0">
            <ChatInterface />
          </div>
        </div>

        {/* Right Column: Projects & Status */}
        <div className="col-span-12 lg:col-span-8 overflow-y-auto">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Activity size={20} className="text-blue-600" />
              Active Projects
            </h2>
            <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
          </div>

          <ProjectGrid />

          {/* Quick Stats or Agent Log could go here */}
          <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">System Journal</h3>
            <div className="font-mono text-xs text-gray-500 space-y-2">
              <div>[10:42:01] Architect Agent initialized on port 41242</div>
              <div>[10:42:02] Developer Agent initialized on port 41243</div>
              <div>[10:42:05] Magic Build Orchestrator ready</div>
              <div className="text-green-600">[10:45:00] System healthy. Waiting for instructions.</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
