import { defineQuery, IWorld } from 'bitecs';
import { InputComponent, ScriptComponent } from '../index';

// We need to capture global keyboard events and map them to the InputComponent of the "Player" entity.
// Since we don't know *which* entity is the player easily without a tag, we will query for entities with ScriptId = 2 (Player).

const playerQuery = defineQuery([InputComponent, ScriptComponent]);

// State to hold current keys
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
};

// Setup listeners once
if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (e) => {
        switch(e.key.toLowerCase()) {
            case 'w': keys.w = true; break;
            case 'a': keys.a = true; break;
            case 's': keys.s = true; break;
            case 'd': keys.d = true; break;
            case ' ': keys.space = true; break;
        }
    });

    window.addEventListener('keyup', (e) => {
        switch(e.key.toLowerCase()) {
            case 'w': keys.w = false; break;
            case 'a': keys.a = false; break;
            case 's': keys.s = false; break;
            case 'd': keys.d = false; break;
            case ' ': keys.space = false; break;
        }
    });
}

export const createInputSystem = () => {
  return (world: IWorld) => {
    const entities = playerQuery(world);
    for (let i = 0; i < entities.length; i++) {
        const eid = entities[i];

        // Filter for Player Script (ID 2)
        if (ScriptComponent.scriptId[eid] === 2) {
            let moveX = 0;
            let moveY = 0;

            if (keys.w) moveY += 1; // Forward (Z+)
            if (keys.s) moveY -= 1; // Backward (Z-)
            if (keys.a) moveX -= 1; // Left (X-)
            if (keys.d) moveX += 1; // Right (X+)

            InputComponent.moveX[eid] = moveX;
            InputComponent.moveY[eid] = moveY;
            InputComponent.jump[eid] = keys.space ? 1 : 0;
        }
    }
    return world;
  };
};
