import React from 'react';

export const Terminal = () => {
  return (
    <div className="h-full p-2 bg-[#1e1e1e] text-white font-mono text-sm">
      <div className="border-b border-[#333333] pb-1 mb-2">
        <h2 className="text-base font-semibold">Terminal</h2>
      </div>
      <div>
        <span className="text-green-400">user@tigercli:~$</span> <span>npm run dev</span>
      </div>
      <div className="text-gray-400">> tiger-ide@0.1.0 dev</div>
      <div className="text-gray-400">> next dev</div>
      <br />
      <div className="text-cyan-400">ready - started server on 0.0.0.0:3000, url: http://localhost:3000</div>
    </div>
  );
};