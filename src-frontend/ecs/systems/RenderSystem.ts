import { defineQuery, enterQuery, exitQuery, IWorld } from 'bitecs';
import { Scene, Mesh, MeshBuilder, Vector3, AbstractMesh } from '@babylonjs/core';
import { TransformComponent, MeshComponent } from '../index';

// Map to store relationships between ECS entities (eid) and Babylon meshes
const entityMeshMap = new Map<number, AbstractMesh>();

export const createRenderSystem = (scene: Scene) => {
  // Queries
  const renderQuery = defineQuery([TransformComponent, MeshComponent]);
  const enterRenderQuery = enterQuery(renderQuery);
  const exitRenderQuery = exitQuery(renderQuery);

  return (world: IWorld) => {
    // 1. Handle New Entities (Enter)
    const entitesEntered = enterRenderQuery(world);
    for (let i = 0; i < entitesEntered.length; i++) {
      const eid = entitesEntered[i];
      const resourceId = MeshComponent.meshResourceId[eid];

      // For now, create a simple box or sphere based on ID.
      // In a real asset pipeline, this would look up a loaded asset.
      let mesh: Mesh;
      if (resourceId === 1) {
          mesh = MeshBuilder.CreateSphere(`entity_${eid}`, { diameter: 1 }, scene);
      } else {
          mesh = MeshBuilder.CreateBox(`entity_${eid}`, { size: 1 }, scene);
      }

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
