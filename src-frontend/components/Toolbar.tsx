import React from 'react';
import { Play, Pause, Square, Download } from 'lucide-react';
import { useEditorStore } from '../store';
import { exportSceneToGLB } from '../utils/exporter';
import { Engine } from '@babylonjs/core';

// We need access to the scene to export.
// We can pass it as a prop or rely on a global accessor (less clean).
// For this task, we'll assume we can get it via `Engine.LastCreatedScene` (Babylon helper)
// or we should pass it from App -> Viewport -> Toolbar? No, Toolbar is usually outside Viewport.
// Using `Engine.LastCreatedScene` is a viable hack for a singleton editor scene.

const Toolbar: React.FC = () => {
    const { simulationState, setSimulationState } = useEditorStore();

    const handleExport = () => {
        const scene = Engine.LastCreatedScene;
        if (scene) {
            exportSceneToGLB(scene, "darkgame_scene");
        } else {
            console.warn("No scene found to export");
        }
    };

    return (
        <div className="h-10 border-b border-border bg-card flex items-center px-4 gap-4">
            <div className="flex items-center gap-1 bg-accent/50 rounded p-1">
                <button
                    onClick={() => setSimulationState('playing')}
                    className={`p-1 rounded hover:bg-primary/20 ${simulationState === 'playing' ? 'text-green-500' : ''}`}
                    title="Play"
                >
                    <Play size={16} fill={simulationState === 'playing' ? "currentColor" : "none"} />
                </button>
                <button
                    onClick={() => setSimulationState('paused')}
                    className={`p-1 rounded hover:bg-primary/20 ${simulationState === 'paused' ? 'text-yellow-500' : ''}`}
                    title="Pause"
                >
                    <Pause size={16} fill={simulationState === 'paused' ? "currentColor" : "none"} />
                </button>
                <button
                    onClick={() => setSimulationState('stopped')}
                    className={`p-1 rounded hover:bg-primary/20 ${simulationState === 'stopped' ? 'text-red-500' : ''}`}
                    title="Stop"
                >
                    <Square size={16} fill={simulationState === 'stopped' ? "currentColor" : "none"} />
                </button>
            </div>

            <div className="w-px h-6 bg-border mx-2" />

            <button
                onClick={handleExport}
                className="flex items-center gap-2 text-xs font-semibold hover:text-primary transition-colors"
                title="Export to GLB"
            >
                <Download size={16} />
                <span>Export GLB</span>
            </button>
        </div>
    );
};

export default Toolbar;
