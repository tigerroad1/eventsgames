import React, { useEffect, useState } from 'react';
import { Layers, Box } from 'lucide-react';
import { useEditorStore } from '../store';
import { World, MeshComponent } from '../ecs';
import { defineQuery } from 'bitecs';

const Outliner: React.FC = () => {
  const { selectedEntity, selectEntity } = useEditorStore();

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      <div className="p-2 border-b border-border flex items-center gap-2">
        <Layers size={16} />
        <span className="text-xs font-semibold uppercase">Outliner</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <EntityList selected={selectedEntity} onSelect={selectEntity} />
      </div>
    </div>
  );
};

// Define query outside component to be consistent
const meshQuery = defineQuery([MeshComponent]);

const EntityList: React.FC<{ selected: number | null, onSelect: (id: number) => void }> = ({ selected, onSelect }) => {
    const [list, setList] = useState<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const entities = meshQuery(World);
            // entities is a TypedArray (ArrayLike), convert to regular array for map
            setList(Array.from(entities));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-1">
            {list.map(eid => (
                <div
                    key={eid}
                    onClick={() => onSelect(eid)}
                    className={`flex items-center gap-2 p-1 text-sm rounded cursor-pointer ${selected === eid ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                >
                    <Box size={14} />
                    <span>Entity {eid}</span>
                </div>
            ))}
            {list.length === 0 && <span className="text-xs text-muted-foreground p-2">No entities found.</span>}
        </div>
    );
};

export default Outliner;
