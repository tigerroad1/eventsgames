import { Scene, GizmoManager, AbstractMesh } from '@babylonjs/core';
import { useEditorStore } from '../../store';
import { TransformComponent } from '../index';

export const createGizmoSystem = (scene: Scene, getMeshByEid: (eid: number) => AbstractMesh | undefined) => {
  const gizmoManager = new GizmoManager(scene);
  gizmoManager.positionGizmoEnabled = true;
  gizmoManager.rotationGizmoEnabled = true;
  gizmoManager.scaleGizmoEnabled = true;
  gizmoManager.usePointerToAttachGizmos = false;

  // Sync Gizmo movement back to ECS
  // We can subscribe to the store to know when selection changes
  useEditorStore.subscribe((state) => {
    const selectedEid = state.selectedEntity;
    if (selectedEid !== null) {
        const mesh = getMeshByEid(selectedEid);
        if (mesh) {
            gizmoManager.attachToMesh(mesh);
        } else {
            gizmoManager.attachToMesh(null);
        }
    } else {
        gizmoManager.attachToMesh(null);
    }
  });

  // Function to manually sync the Gizmo-modified mesh transform back to ECS.
  // This should be called BEFORE the RenderSystem (ECS->Mesh) runs.
  const syncGizmosToECS = () => {
    if (gizmoManager.attachedMesh && gizmoManager.attachedMesh.name.startsWith("entity_")) {
         // Parse ID from name "entity_123"
         const eidStr = gizmoManager.attachedMesh.name.split('_')[1];
         const eid = parseInt(eidStr);

         if (!isNaN(eid)) {
             // Update ECS from Mesh (Gizmo -> ECS)
             TransformComponent.posX[eid] = gizmoManager.attachedMesh.position.x;
             TransformComponent.posY[eid] = gizmoManager.attachedMesh.position.y;
             TransformComponent.posZ[eid] = gizmoManager.attachedMesh.position.z;

             if (gizmoManager.attachedMesh.rotationQuaternion) {
                 const euler = gizmoManager.attachedMesh.rotationQuaternion.toEulerAngles();
                 TransformComponent.rotX[eid] = euler.x;
                 TransformComponent.rotY[eid] = euler.y;
                 TransformComponent.rotZ[eid] = euler.z;
             } else {
                 TransformComponent.rotX[eid] = gizmoManager.attachedMesh.rotation.x;
                 TransformComponent.rotY[eid] = gizmoManager.attachedMesh.rotation.y;
                 TransformComponent.rotZ[eid] = gizmoManager.attachedMesh.rotation.z;
             }

             TransformComponent.sclX[eid] = gizmoManager.attachedMesh.scaling.x;
             TransformComponent.sclY[eid] = gizmoManager.attachedMesh.scaling.y;
             TransformComponent.sclZ[eid] = gizmoManager.attachedMesh.scaling.z;
         }
    }
  };

  return { gizmoManager, syncGizmosToECS };
};
