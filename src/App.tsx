import React from 'react';
import { ChatInterface } from './components/chat/ChatInterface.js';
import { ProjectsPage } from './pages/ProjectsPage.js';

function App() {
  const [view, setView] = React.useState<'chat' | 'projects'>('chat');

  return (
    <div className="flex h-screen bg-gray-950 text-white font-sans">
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-4 text-xl font-bold bg-gray-800">Magic Build 🧙‍♂️</div>
        <nav className="flex-1 p-2 space-y-1">
            <button
                onClick={() => setView('chat')}
                className={`w-full text-left p-2 rounded ${view === 'chat' ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}
            >
                💬 Chat
            </button>
            <button
                onClick={() => setView('projects')}
                className={`w-full text-left p-2 rounded ${view === 'projects' ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}
            >
                🚀 Projects
            </button>
        </nav>
      </div>

      <main className="flex-1 overflow-hidden">
        {view === 'chat' ? <ChatInterface /> : <ProjectsPage />}
      </main>
    </div>
  );
}

export default App;
