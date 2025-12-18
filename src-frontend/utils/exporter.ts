import { Scene } from '@babylonjs/core';
import { GLTF2Export } from '@babylonjs/serializers/glTF';

export const exportSceneToGLB = async (scene: Scene, filename: string = "scene") => {
    try {
        const result = await GLTF2Export.GLBAsync(scene, filename, {
            shouldExportNode: (node) => {
                // Exclude system nodes or gizmos if needed
                // 'isVisible' is on AbstractMesh, but 'node' is type Node.
                // We should check if it's a mesh or cast it, or just ignore visibility for now/use enabled.
                return !node.name.includes("Gizmo");
            }
        });

        // result.glTFFiles is an object where keys are filenames and values are blobs
        const glbBlob = result.glTFFiles[`${filename}.glb`];

        if (glbBlob) {
            // Create a download link
            // Note: In Tauri, we might want to use the save dialog and file system API,
            // but for P3.4 (Frontend/3D), a browser download is a good first step or fallback.
            // Ideally we use tauri dialog.

            const url = URL.createObjectURL(glbBlob as Blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.glb`;
            a.click();
            URL.revokeObjectURL(url);

            console.log("Export successful");
        }
    } catch (e) {
        console.error("Export failed", e);
    }
};
