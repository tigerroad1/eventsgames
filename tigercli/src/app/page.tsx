'use client'

// I cannot be sure that the alias @ is configured, so I will use relative paths.
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../components/resizable'
import { FileExplorer } from '../components/FileExplorer';
import { Terminal } from '../components/Terminal';
import { Editor } from '../components/Editor';
import { Preview } from '../components/Preview';
import { Chat } from '../components/Chat';


// Mock MenuBar to avoid breaking the layout
const MockMenuBar = () => (
  <div className="h-10 border-b flex items-center px-4 text-sm bg-[#252525] text-[#e0e0e0] border-[#333333]">
    <span>Fichier</span>
    <span className="ml-4">Édition</span>
    <span className="ml-4">Vue</span>
    <span className="ml-4">Aller</span>
    <span className="ml-4">Exécuter</span>
    <span className="ml-4">Terminal</span>
    <span className="ml-4">Aide</span>
  </div>
)

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-[#1a1a1a] text-[#e0e0e0]">
      {/* Top Menu Bar */}
      <MockMenuBar />

      {/* Main Layout: IDE panels on top, Chat on bottom */}
      <ResizablePanelGroup direction="vertical" className="flex-1">

        {/* Top Section: IDE (Explorer, Editor, Preview) */}
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="horizontal">

            {/* Left Panel: Explorer + Terminal */}
            <ResizablePanel defaultSize={20} minSize={15}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={60} minSize={20}>
                  <FileExplorer />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={40} minSize={20}>
                  <Terminal />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Center Panel: Code Editor */}
            <ResizablePanel defaultSize={55} minSize={30}>
              <Editor />
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right Panel: Preview */}
            <ResizablePanel defaultSize={25} minSize={15}>
              <Preview />
            </ResizablePanel>

          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Bottom Section: AI Chat */}
        <ResizablePanel defaultSize={25} minSize={15}>
          <Chat />
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>
  )
}