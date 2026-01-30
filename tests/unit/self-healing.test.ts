import { SelfHealingValidator } from '../../backend/src/services/self-healing-validator.js';

const validator = new SelfHealingValidator();

async function runTest() {
    console.log('Running SelfHealingValidator Test...');
    const result = await validator.validate('/tmp/mock-project');
    console.log('Validation Result:', result);

    if (result.errors.length > 0) {
        const fixed = await validator.attemptFix(result.errors[0], '/tmp/mock-project');
        console.log('Fix attempted:', fixed);
    }
}

runTest();
