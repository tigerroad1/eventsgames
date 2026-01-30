import path from 'path';
import fs from 'fs/promises';
import { AgentManager } from './agent-manager.js';
import { SkillService } from './skill-service.js';
import { AgentTask } from '../types/index.js';

export class MagicBuildOrchestrator {
    private agentManager: AgentManager;
    private skillService: SkillService;
    private projectsDir = process.env.PROJECTS_DIR || path.resolve('projects');

    constructor() {
        this.agentManager = new AgentManager();
        this.skillService = new SkillService();
    }

    async runFullMagicBuild(params: { technology: string; description: string; projectId?: string }) {
        const projectId = params.projectId || `proj_${Date.now()}`;
        const projectPath = path.join(this.projectsDir, projectId);

        console.log(`Starting Magic Build for ${projectId}...`);

        // 1. Create Folder
        await fs.mkdir(projectPath, { recursive: true });
        console.log(`Created project folder: ${projectPath}`);

        // 2. Load Skill
        const skill = await this.skillService.loadSkill(params.technology);
        const skillContext = skill ? skill.content : '';
        console.log(`Loaded skill: ${params.technology}`);

        // 3. Delegate to Architect
        const architectTask: AgentTask = {
            taskId: `task_arch_${projectId}`,
            projectId,
            projectPath,
            role: 'architect',
            context: {
                userPrompt: params.description,
                skillContext
            }
        };

        const archResult = await this.agentManager.sendTask('architect', architectTask);
        console.log('Architect started:', archResult);

        // 4. Delegate to Developer
        const developerTask: AgentTask = {
            taskId: `task_dev_${projectId}`,
            projectId,
            projectPath,
            role: 'developer',
            context: {
                architecturePath: path.join(projectPath, 'architecture.md'),
                ragContext: ''
            }
        };

        const devResult = await this.agentManager.sendTask('developer', developerTask);
        console.log('Developer started:', devResult);

        return {
            projectId,
            projectPath,
            status: 'in_progress'
        };
    }
}
