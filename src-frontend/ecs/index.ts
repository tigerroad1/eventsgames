import { createWorld, defineComponent, Types, addEntity, addComponent, IWorld } from 'bitecs';

// Create the BitECS world
export const World = createWorld();

// --- Components ---

// TransformComponent: Standard position, rotation, scale
// We use explicit x, y, z fields for clarity and simpler access.
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

// --- Helper Functions ---

/**
 * Creates a new entity with TransformComponent and MeshComponent.
 * @param world The BitECS world
 * @param position Optional initial position [x, y, z]
 * @param meshResId Optional mesh resource ID
 * @returns The new entity ID
 */
export const createGameEntity = (
  world: IWorld,
  position: [number, number, number] = [0, 0, 0],
  meshResId: number = 0
): number => {
  const eid = addEntity(world);

  // Add components
  addComponent(world, TransformComponent, eid);
  addComponent(world, MeshComponent, eid);

  // Set initial values
  TransformComponent.posX[eid] = position[0];
  TransformComponent.posY[eid] = position[1];
  TransformComponent.posZ[eid] = position[2];

  TransformComponent.rotX[eid] = 0;
  TransformComponent.rotY[eid] = 0;
  TransformComponent.rotZ[eid] = 0;

  // Default scale to 1,1,1
  TransformComponent.sclX[eid] = 1;
  TransformComponent.sclY[eid] = 1;
  TransformComponent.sclZ[eid] = 1;

  MeshComponent.meshResourceId[eid] = meshResId;
  MeshComponent.isVisible[eid] = 1;

  return eid;
};
