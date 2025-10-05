import React from 'react';

export const FileExplorer = () => {
  return (
    <div className="h-full p-2 bg-[#252525] rounded-tl-md">
      <h2 className="text-lg font-semibold mb-2 border-b border-[#333333] pb-1 text-white">Explorateur</h2>
      <ul className="text-sm text-gray-300 space-y-1">
        {/* Placeholder content */}
        <li>- tigercli-project/</li>
        <li className="pl-4">- src/</li>
        <li className="pl-8">- components/</li>
        <li className="pl-8">- app/</li>
        <li className="pl-12">- page.tsx</li>
        <li>- package.json</li>
      </ul>
    </div>
  );
};