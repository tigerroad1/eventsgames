import React, { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import { useEditorStore } from '../store';
import { TransformComponent } from '../ecs';

const Inspector: React.FC = () => {
  const { selectedEntity } = useEditorStore();

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      <div className="p-2 border-b border-border flex items-center gap-2">
        <Settings size={16} />
        <span className="text-xs font-semibold uppercase">Inspector</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {selectedEntity !== null ? (
          <TransformEditor eid={selectedEntity} />
        ) : (
          <div className="text-sm text-muted-foreground text-center mt-10">
            Select an entity to view properties.
          </div>
        )}
      </div>
    </div>
  );
};

const TransformEditor: React.FC<{ eid: number }> = ({ eid }) => {
    // We need local state to handle input, synchronized with ECS
    // We force re-render on interval to catch up with physics/game loop changes
    // But for editing, we push changes immediately.

    // Simplification: Just read on render. Since React renders on state change/parent render.
    // We might need a "forceUpdate" or a subscription loop if values change externally.
    // For now, let's assume valid state on mount and update when user types.

    const [, forceUpdate] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => forceUpdate(n => n + 1), 200);
        return () => clearInterval(interval);
    }, [eid]);

    const handleChange = (field: 'posX' | 'posY' | 'posZ' | 'rotX' | 'rotY' | 'rotZ' | 'sclX' | 'sclY' | 'sclZ', value: number) => {
        TransformComponent[field][eid] = value;
        forceUpdate(n => n + 1);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="space-y-2">
                <h3 className="text-xs font-bold text-muted-foreground uppercase">Transform</h3>

                <div className="grid grid-cols-[50px_1fr] gap-2 items-center">
                    <span className="text-xs font-mono">Pos X</span>
                    <input
                        type="number"
                        step="0.1"
                        className="bg-input text-foreground text-xs p-1 rounded border border-border"
                        value={TransformComponent.posX[eid] || 0}
                        onChange={(e) => handleChange('posX', parseFloat(e.target.value))}
                    />

                    <span className="text-xs font-mono">Pos Y</span>
                    <input
                        type="number"
                        step="0.1"
                        className="bg-input text-foreground text-xs p-1 rounded border border-border"
                        value={TransformComponent.posY[eid] || 0}
                        onChange={(e) => handleChange('posY', parseFloat(e.target.value))}
                    />

                    <span className="text-xs font-mono">Pos Z</span>
                    <input
                        type="number"
                        step="0.1"
                        className="bg-input text-foreground text-xs p-1 rounded border border-border"
                        value={TransformComponent.posZ[eid] || 0}
                        onChange={(e) => handleChange('posZ', parseFloat(e.target.value))}
                    />
                </div>

                <div className="h-px bg-border my-2" />

                <div className="grid grid-cols-[50px_1fr] gap-2 items-center">
                    <span className="text-xs font-mono">Rot X</span>
                    <input
                        type="number"
                        step="0.1"
                        className="bg-input text-foreground text-xs p-1 rounded border border-border"
                        value={TransformComponent.rotX[eid] || 0}
                        onChange={(e) => handleChange('rotX', parseFloat(e.target.value))}
                    />
                     {/* Y and Z ... shortcutting for brevity, but let's do it properly */}
                    <span className="text-xs font-mono">Rot Y</span>
                    <input
                        type="number"
                        step="0.1"
                        className="bg-input text-foreground text-xs p-1 rounded border border-border"
                        value={TransformComponent.rotY[eid] || 0}
                        onChange={(e) => handleChange('rotY', parseFloat(e.target.value))}
                    />
                    <span className="text-xs font-mono">Rot Z</span>
                    <input
                        type="number"
                        step="0.1"
                        className="bg-input text-foreground text-xs p-1 rounded border border-border"
                        value={TransformComponent.rotZ[eid] || 0}
                        onChange={(e) => handleChange('rotZ', parseFloat(e.target.value))}
                    />
                </div>

                <div className="h-px bg-border my-2" />

                <div className="grid grid-cols-[50px_1fr] gap-2 items-center">
                    <span className="text-xs font-mono">Scale</span>
                    <div className="grid grid-cols-3 gap-1">
                        <input type="number" step="0.1" className="bg-input text-xs p-1 rounded" value={TransformComponent.sclX[eid] || 1} onChange={(e) => handleChange('sclX', parseFloat(e.target.value))} />
                        <input type="number" step="0.1" className="bg-input text-xs p-1 rounded" value={TransformComponent.sclY[eid] || 1} onChange={(e) => handleChange('sclY', parseFloat(e.target.value))} />
                        <input type="number" step="0.1" className="bg-input text-xs p-1 rounded" value={TransformComponent.sclZ[eid] || 1} onChange={(e) => handleChange('sclZ', parseFloat(e.target.value))} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inspector;
