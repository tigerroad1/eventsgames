import React, { useState } from 'react';
import { Layers, Box, Globe, Gamepad2, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export const ProjectWizard = () => {
  const [step, setStep] = useState(1);
  const [selectedStack, setSelectedStack] = useState<string | null>(null);

  const stacks = [
    { id: 'react', name: 'React App', icon: Globe, desc: 'Vite + React + TS' },
    { id: 'node', name: 'Node API', icon: Box, desc: 'Express + TS' },
    { id: 'solar2d', name: 'Game', icon: Gamepad2, desc: 'Solar2D Lua Engine' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 max-w-2xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Create New Project</h2>
        <div className="flex items-center gap-2 text-sm opacity-80">
          <span className={clsx("w-6 h-6 rounded-full flex items-center justify-center border", step >= 1 ? "bg-white text-blue-600 border-white" : "border-white")}>1</span>
          <span>Context</span>
          <div className="w-8 h-px bg-white/50" />
          <span className={clsx("w-6 h-6 rounded-full flex items-center justify-center border", step >= 2 ? "bg-white text-blue-600 border-white" : "border-white")}>2</span>
          <span>Stack</span>
          <div className="w-8 h-px bg-white/50" />
          <span className={clsx("w-6 h-6 rounded-full flex items-center justify-center border", step >= 3 ? "bg-white text-blue-600 border-white" : "border-white")}>3</span>
          <span>Review</span>
        </div>
      </div>

      <div className="p-8">
        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Describe your project goal</label>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="I want to build a CRM dashboard for..."
            />
            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                Next Step <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">Select Technology Stack</h3>
            <div className="grid grid-cols-3 gap-4">
              {stacks.map((stack) => (
                <div
                  key={stack.id}
                  onClick={() => setSelectedStack(stack.id)}
                  className={clsx(
                    "p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-3",
                    selectedStack === stack.id
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300"
                  )}
                >
                  <stack.icon size={32} />
                  <div>
                    <div className="font-bold">{stack.name}</div>
                    <div className="text-xs opacity-70">{stack.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700">Back</button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedStack}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Review Config
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
