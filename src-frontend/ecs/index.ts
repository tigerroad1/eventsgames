import { createWorld, defineComponent, Types, addEntity, addComponent, IWorld } from 'bitecs';

// Create the BitECS world
export const World = createWorld();

// --- Components ---

// TransformComponent: Standard position, rotation, scale
export const TransformComponent = defineComponent({
  posX: Types.f32, posY: Types.f32, posZ: Types.f32,
  rotX: Types.f32, rotY: Types.f32, rotZ: Types.f32, // Euler angles in radians
  sclX: Types.f32, sclY: Types.f32, sclZ: Types.f32,
});

// MeshComponent: Links an ECS entity to a visual mesh
export const MeshComponent = defineComponent({
  meshResourceId: Types.ui32, // ID referencing the loaded Babylon mesh (mapped externally)
  isVisible: Types.ui8,       // 0 = hidden, 1 = visible
});

// ScriptComponent: Defines behavior attached to entity
// scriptId maps to a registry of behaviors (e.g., 1 = Rotator, 2 = PlayerController)
export const ScriptComponent = defineComponent({
    scriptId: Types.ui8,
});

// InputComponent: Stores input state for controlled entities
export const InputComponent = defineComponent({
    moveX: Types.f32, // -1 to 1 (A/D)
    moveY: Types.f32, // -1 to 1 (W/S)
    jump: Types.ui8,  // 0 or 1
});

// AnimationComponent: Stores animation state
export const AnimationComponent = defineComponent({
    currentClipId: Types.ui8,
    speed: Types.f32,
    isPlaying: Types.ui8,
});

// --- Helper Functions ---

/**
 * Creates a new entity with basic components.
 */
export const createGameEntity = (
  world: IWorld,
  position: [number, number, number] = [0, 0, 0],
  meshResId: number = 0
): number => {
  const eid = addEntity(world);

  addComponent(world, TransformComponent, eid);
  addComponent(world, MeshComponent, eid);

  TransformComponent.posX[eid] = position[0];
  TransformComponent.posY[eid] = position[1];
  TransformComponent.posZ[eid] = position[2];

  TransformComponent.rotX[eid] = 0;
  TransformComponent.rotY[eid] = 0;
  TransformComponent.rotZ[eid] = 0;

  TransformComponent.sclX[eid] = 1;
  TransformComponent.sclY[eid] = 1;
  TransformComponent.sclZ[eid] = 1;

  MeshComponent.meshResourceId[eid] = meshResId;
  MeshComponent.isVisible[eid] = 1;

  return eid;
};

export const addScript = (world: IWorld, eid: number, scriptId: number) => {
    addComponent(world, ScriptComponent, eid);
    ScriptComponent.scriptId[eid] = scriptId;

    // If it's a player controller (ID 2), add input component
    if (scriptId === 2) {
        addComponent(world, InputComponent, eid);
    }
};
