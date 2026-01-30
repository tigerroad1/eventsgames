import { AgentManager } from './agent-manager.js';
import { AgentTask } from '../types/agent.js';
import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const logger = pino({ name: 'orchestrator' });

export class MagicBuildOrchestrator {
  private agentManager: AgentManager;

  constructor() {
    this.agentManager = new AgentManager();
  }

  async startBuildPipeline(projectId: string, config: any) {
    logger.info(`Starting build pipeline for project ${projectId}`);

    // Step 1: Architect - Scaffolding
    const scaffoldTask: AgentTask = {
      id: uuidv4(),
      type: 'architect',
      command: 'scaffold_project',
      context: {
        projectId,
        config,
        path: `projects/${projectId}`
      },
      status: 'pending'
    };

    const scaffoldResult = await this.agentManager.dispatchTask(scaffoldTask);
    if (!scaffoldResult.success) {
      logger.error('Scaffolding failed', scaffoldResult.error);
      return;
    }

    // Step 2: Developer - Implementation
    const devTask: AgentTask = {
      id: uuidv4(),
      type: 'developer',
      command: 'implement_features',
      context: {
        projectId,
        features: config.features
      },
      status: 'pending'
    };

    await this.agentManager.dispatchTask(devTask);
    logger.info('Build pipeline instructions dispatched');
  }
}
