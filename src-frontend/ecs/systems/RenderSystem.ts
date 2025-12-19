import { defineQuery, enterQuery, exitQuery, IWorld } from 'bitecs';
import { Scene, Mesh, MeshBuilder, Vector3, AbstractMesh } from '@babylonjs/core';
import { TransformComponent, MeshComponent } from '../index';

// Map to store relationships between ECS entities (eid) and Babylon meshes
export const entityMeshMap = new Map<number, AbstractMesh>();

// Cache for source meshes (for instancing)
const sourceMeshes = new Map<number, Mesh>();

export const createRenderSystem = (scene: Scene) => {
  // Queries
  const renderQuery = defineQuery([TransformComponent, MeshComponent]);
  const enterRenderQuery = enterQuery(renderQuery);
  const exitRenderQuery = exitQuery(renderQuery);

  // Initialize Source Meshes (Hidden)
  // In a real system, these are loaded from Asset Manager.
  // ID 0 = Box, ID 1 = Sphere
  if (!sourceMeshes.has(0)) {
      const box = MeshBuilder.CreateBox("source_box", { size: 1 }, scene);
      box.isVisible = false;
      sourceMeshes.set(0, box);
  }
  if (!sourceMeshes.has(1)) {
      const sphere = MeshBuilder.CreateSphere("source_sphere", { diameter: 1 }, scene);
      sphere.isVisible = false;
      sourceMeshes.set(1, sphere);
  }

  return (world: IWorld) => {
    // 1. Handle New Entities (Enter)
    const entitesEntered = enterRenderQuery(world);
    for (let i = 0; i < entitesEntered.length; i++) {
      const eid = entitesEntered[i];
      const resourceId = MeshComponent.meshResourceId[eid];

      const source = sourceMeshes.get(resourceId);

      let mesh: AbstractMesh;

      if (source) {
          // Use InstancedMesh for performance (P5.2)
          mesh = source.createInstance(`entity_${eid}`);
      } else {
          // Fallback
          mesh = MeshBuilder.CreateBox(`entity_${eid}_fallback`, { size: 1 }, scene);
      }

      // We must handle metadata or something to ensure we can identify it later if needed.
      // Instances share geometry/material.

      entityMeshMap.set(eid, mesh);
    }

    // 2. Handle Removed Entities (Exit)
    const entitiesExited = exitRenderQuery(world);
    for (let i = 0; i < entitiesExited.length; i++) {
      const eid = entitiesExited[i];
      const mesh = entityMeshMap.get(eid);
      if (mesh) {
        mesh.dispose();
        entityMeshMap.delete(eid);
      }
    }

    // 3. Update Transforms (Sync ECS -> Babylon)
    const entities = renderQuery(world);
    for (let i = 0; i < entities.length; i++) {
      const eid = entities[i];
      const mesh = entityMeshMap.get(eid);

      if (mesh) {
        // Position
        mesh.position.x = TransformComponent.posX[eid];
        mesh.position.y = TransformComponent.posY[eid];
        mesh.position.z = TransformComponent.posZ[eid];

        // Rotation (Euler)
        if (!mesh.rotation) {
            mesh.rotation = new Vector3();
        }
        mesh.rotation.x = TransformComponent.rotX[eid];
        mesh.rotation.y = TransformComponent.rotY[eid];
        mesh.rotation.z = TransformComponent.rotZ[eid];

        // Scale
        mesh.scaling.x = TransformComponent.sclX[eid];
        mesh.scaling.y = TransformComponent.sclY[eid];
        mesh.scaling.z = TransformComponent.sclZ[eid];

        // Visibility
        mesh.setEnabled(MeshComponent.isVisible[eid] === 1);
      }
    }

    return world;
  };
};
