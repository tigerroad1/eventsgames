import { createWorld, defineComponent, Types, addEntity, addComponent, IWorld } from 'bitecs';

// Create the BitECS world
export const World = createWorld();

// --- Components ---

// TransformComponent: Standard position, rotation, scale
// Note: Rotation is stored as Euler angles (x, y, z) in radians for simplicity in this iteration,
// but Quaternions (x, y, z, w) might be preferred for advanced physics/animation later.
export const TransformComponent = defineComponent({
  position: [Types.f32, 3], // x, y, z
  rotation: [Types.f32, 3], // x, y, z (Euler angles)
  scale: [Types.f32, 3],    // x, y, z
});

// MeshComponent: Links an ECS entity to a visual mesh
// Since BitECS components only store primitive types, we use an ID/Index approach.
// - meshResourceId: Could be an index into an array of loaded Mesh assets or a unique ID.
// - isVisible: Boolean flag (0 or 1).
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
  TransformComponent.position[eid][0] = position[0];
  TransformComponent.position[eid][1] = position[1];
  TransformComponent.position[eid][2] = position[2];

  // Default scale to 1,1,1
  TransformComponent.scale[eid][0] = 1;
  TransformComponent.scale[eid][1] = 1;
  TransformComponent.scale[eid][2] = 1;

  MeshComponent.meshResourceId[eid] = meshResId;
  MeshComponent.isVisible[eid] = 1;

  return eid;
};
