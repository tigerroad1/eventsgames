import fs from 'fs/promises';
import path from 'path';

export interface Skill {
    name: string;
    description: string;
    content: string;
}

export class SkillService {
    private skillsDir = process.env.SKILLS_DIR || path.resolve('skills');

    async loadSkill(technology: string): Promise<Skill | null> {
        const skillPath = path.join(this.skillsDir, technology, 'SKILL.md');
        try {
            const content = await fs.readFile(skillPath, 'utf-8');
            return {
                name: technology,
                description: `Skill for ${technology}`,
                content
            };
        } catch (error) {
            console.warn(`Skill ${technology} not found at ${skillPath}`);
            return null;
        }
    }
}
