import { createWorld, defineComponent, Types } from 'bitecs';

export const World = createWorld();

export const TransformComponent = defineComponent({
  position: [Types.f32, 3],
  rotation: [Types.f32, 3],
  scale: [Types.f32, 3],
});

export const MeshComponent = defineComponent({
  meshId: Types.eid, // Placeholder for Babylon Mesh ID mapping
});

// Basic system setup
export const movementSystem = (world: typeof World) => {
  // Logic to update transforms would go here
  return world;
};
