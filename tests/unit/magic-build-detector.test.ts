import { MagicBuildDetector } from '../../src/services/magic-build-detector.js';

const detector = new MagicBuildDetector();

const testCases = [
  { input: "Crée un jeu solar2d", expected: true, tech: "solar2d" },
  { input: "Fais une api node", expected: true, tech: "node" },
  { input: "Hello world", expected: false, tech: "unknown" }
];

let failed = false;
testCases.forEach(({ input, expected, tech }) => {
  const result = detector.detectIntent(input);
  if (result.isMagicBuild !== expected) {
    console.error(`FAILED: ${input} -> expected ${expected}, got ${result.isMagicBuild}`);
    failed = true;
  }
  if (expected && result.technology !== tech) {
    console.error(`FAILED: ${input} -> expected tech ${tech}, got ${result.technology}`);
    failed = true;
  }
});

if (!failed) console.log("MagicBuildDetector Tests Passed!");
else process.exit(1);
