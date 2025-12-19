import { defineQuery, IWorld } from 'bitecs';
import { TransformComponent, ScriptComponent, InputComponent } from '../index';

// Script IDs
const SCRIPT_ROTATOR = 1;
const SCRIPT_PLAYER = 2;

const scriptQuery = defineQuery([TransformComponent, ScriptComponent]);

export const createScriptSystem = () => {
  return (world: IWorld, delta: number) => {
    const entities = scriptQuery(world);

    for (let i = 0; i < entities.length; i++) {
      const eid = entities[i];
      const scriptId = ScriptComponent.scriptId[eid];

      if (scriptId === SCRIPT_ROTATOR) {
          // Simple rotation behavior
          TransformComponent.rotY[eid] += 1.0 * delta;
      } else if (scriptId === SCRIPT_PLAYER) {
          // Player Controller Logic
          // Read from InputComponent
          // Note: InputComponent might not be present if we didn't add it, but addScript helper does.
          // In strict ECS we should query [Transform, Script, Input].

          // Let's assume InputComponent exists or check manually (unoptimized access)
          // Ideally we use a separate system for PlayerControl matching [Input, Transform]
          // But here we dispatch by Script ID.

          // Simple movement
          const speed = 5.0 * delta;
          // Check if InputComponent is attached (BitECS doesn't have hasComponent easily on array without query check or helper)
          // We'll trust the setup.

          // We need to verify how to access InputComponent.
          // If we didn't use a query that includes InputComponent, we can still access the arrays if the entity has it.
          // Accessing arrays for an entity that doesn't have the component returns 0 usually, which is fine for inputs.

          const dx = InputComponent.moveX[eid] || 0;
          const dy = InputComponent.moveY[eid] || 0; // In 3D, this maps to Z usually

          TransformComponent.posX[eid] += dx * speed;
          TransformComponent.posZ[eid] += dy * speed;
      }
    }

    return world;
  };
};
