import React from 'react';
import { File } from 'lucide-react';

const AssetBrowser: React.FC = () => {
  // Mock assets
  const assets = [
    { id: 1, name: 'Sphere (Mesh)', type: 'mesh', resourceId: 1 },
    { id: 2, name: 'Box (Mesh)', type: 'mesh', resourceId: 0 },
  ];

  const handleDragStart = (e: React.DragEvent, assetId: number) => {
      e.dataTransfer.setData('application/json', JSON.stringify({ type: 'asset', id: assetId }));
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      <div className="p-2 border-b border-border flex items-center gap-2">
        <File size={16} />
        <span className="text-xs font-semibold uppercase">Assets</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 grid grid-cols-2 gap-2">
        {assets.map(asset => (
            <div
                key={asset.id}
                draggable
                onDragStart={(e) => handleDragStart(e, asset.resourceId)}
                className="bg-accent p-2 rounded cursor-grab active:cursor-grabbing flex flex-col items-center gap-1 hover:bg-primary/20"
            >
                <div className="w-8 h-8 bg-muted rounded"></div>
                <span className="text-xs text-center">{asset.name}</span>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AssetBrowser;
