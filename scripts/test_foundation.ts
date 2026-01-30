import { MagicBuildOrchestrator } from '../backend/src/services/magic-build-orchestrator.js';

async function main() {
  const orchestrator = new MagicBuildOrchestrator();

  console.log("Running Magic Build Foundation Test...");
  const result = await orchestrator.runFullMagicBuild({
    technology: 'solar2d',
    description: 'Test project'
  });

  console.log("Result:", result);

  if (result.status === 'in_progress' && result.projectPath) {
     console.log("Foundation Test Passed!");
  } else {
     console.error("Foundation Test Failed!");
     process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
