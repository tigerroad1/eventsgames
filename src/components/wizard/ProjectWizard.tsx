import React, { useState } from 'react';

export const ProjectWizard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [context, setContext] = useState('');
  const [stack, setStack] = useState('');

  const handleComplete = () => {
    console.log('Wizard Complete:', { context, stack });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-96 text-white">
        <h2 className="text-xl mb-4">New Project Wizard (Step {step}/2)</h2>

        {step === 1 ? (
          <div>
            <label className="block mb-2">Project Context</label>
            <textarea
              className="w-full p-2 bg-gray-700 rounded h-32"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Describe your project..."
            />
            <button
              onClick={() => setStep(2)}
              className="mt-4 w-full bg-blue-600 p-2 rounded"
              disabled={context.length < 10}
            >
              Next: Select Stack
            </button>
          </div>
        ) : (
          <div>
            <label className="block mb-2">Technology Stack</label>
            <select
              className="w-full p-2 bg-gray-700 rounded mb-4"
              value={stack}
              onChange={(e) => setStack(e.target.value)}
            >
              <option value="">Select Stack</option>
              <option value="solar2d">Solar2D (Lua)</option>
              <option value="react">React + Vite</option>
              <option value="node">Node.js API</option>
            </select>
            <div className="flex gap-2">
                <button onClick={() => setStep(1)} className="flex-1 bg-gray-600 p-2 rounded">Back</button>
                <button onClick={handleComplete} className="flex-1 bg-green-600 p-2 rounded" disabled={!stack}>Create Project</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
