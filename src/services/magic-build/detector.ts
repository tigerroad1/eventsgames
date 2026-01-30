import { MagicBuildIntent, ProjectConfig } from '../../types/orchestrator';

export class MagicBuildDetector {
  private static patterns = [
    { type: 'react', keywords: ['react', 'frontend', 'vite', 'interface'] },
    { type: 'node', keywords: ['node', 'backend', 'api', 'express', 'server'] },
    { type: 'fullstack', keywords: ['fullstack', 'complet', 'entire system'] },
    { type: 'game', keywords: ['game', 'jeu', 'solar2d', 'lua'] }
  ];

  static detectIntent(message: string): MagicBuildIntent {
    const lowerMsg = message.toLowerCase();

    // Basic heuristic for detection
    const isBuildRequest =
      lowerMsg.includes('create') ||
      lowerMsg.includes('créer') ||
      lowerMsg.includes('build') ||
      lowerMsg.includes('génère') ||
      lowerMsg.includes('projet');

    if (!isBuildRequest) {
      return { detected: false, confidence: 0 };
    }

    // Determine stack
    let detectedStack = 'unknown';
    let maxMatches = 0;

    this.patterns.forEach(pattern => {
      const matches = pattern.keywords.filter(k => lowerMsg.includes(k)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedStack = pattern.type;
      }
    });

    const config: ProjectConfig = {
      name: 'New Project', // meaningful name extraction would go here
      description: message,
      stack: detectedStack,
      features: []
    };

    return {
      detected: true,
      confidence: maxMatches > 0 ? 0.8 : 0.5,
      projectConfig: config
    };
  }
}
