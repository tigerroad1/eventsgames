import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Viewport from './engine/Viewport';
import Outliner from './components/Outliner';
import Inspector from './components/Inspector';
import AssetBrowser from './components/AssetBrowser';

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-col overflow-hidden dark">
      {/* Top Bar / Menu (Placeholder) */}
      <header className="h-10 border-b border-border flex items-center px-4 bg-card">
        <span className="font-bold text-sm">Darkgame Editor</span>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Left Sidebar (Explorer/Outliner) */}
          <Panel defaultSize={20} minSize={15}>
             <PanelGroup direction="vertical">
                 <Panel defaultSize={60} minSize={30}>
                    <Outliner />
                 </Panel>
                 <PanelResizeHandle className="h-1 bg-border hover:bg-primary transition-colors" />
                 <Panel defaultSize={40} minSize={20}>
                    <AssetBrowser />
                 </Panel>
             </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors" />

          {/* Center (Viewport) */}
          <Panel defaultSize={60} minSize={30}>
             <div className="h-full relative bg-black">
                <Viewport />
                <div className="absolute top-2 left-2 flex gap-2">
                   {/* Overlay Tools */}
                </div>
             </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors" />

          {/* Right Sidebar (Inspector) */}
          <Panel defaultSize={20} minSize={15}>
            <Inspector />
          </Panel>
        </PanelGroup>
      </div>

      {/* Bottom Bar (Status/Console) */}
      <footer className="h-6 border-t border-border bg-card flex items-center px-2 text-xs text-muted-foreground">
        Ready
      </footer>
    </div>
  );
};

export default App;
