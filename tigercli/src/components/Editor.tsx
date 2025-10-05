import React from 'react';

export const Editor = () => {
  return (
    <div className="h-full bg-[#1e1e1e] text-white p-2 font-mono text-sm">
        <div className="border-b border-[#333333] pb-1 mb-2">
            <h2 className="text-base font-semibold">Editor</h2>
        </div>
        <div>
            <span className="text-blue-400">import</span> React <span className="text-blue-400">from</span> <span className="text-green-400">'react'</span>;
        </div>
        <div>
            <span className="text-blue-400">export default function</span> <span className="text-yellow-400">Home</span>() {'{'}
        </div>
        <div className="pl-4">
            <span className="text-purple-400">return</span> {'('}
        </div>
        <div className="pl-8">
            {'<'}
            <span className="text-red-400">div</span>
            {'>'}Hello, TigerCLI!{'</'}
            <span className="text-red-400">div</span>
            {'>'}
        </div>
        <div className="pl-4">{')'}</div>
        <div>{'}'}</div>
    </div>
  );
};