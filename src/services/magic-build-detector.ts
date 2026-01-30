import { MagicBuildIntent } from '../types/index.js';

export class MagicBuildDetector {
  private patterns = {
    trigger: /(crée|fais|génère|build|make|create)/i,
    tech: /(solar2d|react|node|python|express)/i,
    projectType: {
      game: /(game|jeu|casse-brique|platformer)/i,
      api: /(api|backend|rest|endpoint)/i,
      web: /(site|web|page|dashboard)/i,
      mobile: /(app|mobile|android|ios)/i
    }
  };

  detectIntent(message: string): MagicBuildIntent {
    const isTrigger = this.patterns.trigger.test(message);
    const techMatch = message.match(this.patterns.tech);

    let projectType: MagicBuildIntent['projectType'] = 'unknown';
    if (this.patterns.projectType.game.test(message)) projectType = 'game';
    else if (this.patterns.projectType.api.test(message)) projectType = 'api';
    else if (this.patterns.projectType.web.test(message)) projectType = 'web';
    else if (this.patterns.projectType.mobile.test(message)) projectType = 'mobile';

    const confidence = isTrigger ? (techMatch ? 0.9 : 0.7) : 0.0;

    return {
      isMagicBuild: confidence > 0.6,
      confidence,
      projectType,
      technology: techMatch ? techMatch[0].toLowerCase() : 'unknown',
      description: message,
      extractedParams: {
          originalMessage: message
      }
    };
  }
}
