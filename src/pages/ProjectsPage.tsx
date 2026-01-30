import React, { useState } from 'react';
import { ProjectGrid } from '../components/projects/ProjectGrid.js';
import { ProjectWizard } from '../components/wizard/ProjectWizard.js';

export const ProjectsPage: React.FC = () => {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">My Projects</h1>
        <button
            onClick={() => setShowWizard(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
            + New Project
        </button>
      </div>

      <ProjectGrid />

      {showWizard && <ProjectWizard onClose={() => setShowWizard(false)} />}
    </div>
  );
};
