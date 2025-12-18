import React, { useEffect, useRef } from 'react';
import { Engine, Scene, Vector3, HemisphericLight, FreeCamera, MeshBuilder } from '@babylonjs/core';
import { World, createGameEntity } from '../ecs';
import { createRenderSystem, entityMeshMap } from '../ecs/systems/RenderSystem';
import { createGizmoSystem } from '../ecs/systems/GizmoSystem';

const Viewport: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);

    // Creates a basic camera, aiming it at the origin
    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvasRef.current, true);

    // Creates a light, aiming 0,1,0 - to the sky
    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Initialize ECS System
    const renderSystem = createRenderSystem(scene);

    // Initialize Gizmo System
    const { syncGizmosToECS } = createGizmoSystem(scene, (eid) => entityMeshMap.get(eid));

    // Create a demo entity to verify ECS is working
    createGameEntity(World, [0, 1, 0], 1); // Sphere at 0,1,0
    createGameEntity(World, [2, 1, 0], 0); // Box at 2,1,0

    // Built-in 'ground' shape.
    MeshBuilder.CreateGround('ground1', { width: 6, height: 6, subdivisions: 2 }, scene);

    engine.runRenderLoop(() => {
      // 1. Sync Gizmo changes (Mesh -> ECS)
      syncGizmosToECS();

      // 2. Run ECS Systems (ECS Logic & ECS -> Mesh)
      renderSystem(World);

      // 3. Render Scene
      scene.render();
    });

    const handleResize = () => {
      engine.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.dispose();
    };
  }, []);

  const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('application/json');
      if (data) {
          try {
             const { type, id } = JSON.parse(data);
             if (type === 'asset') {
                // Raycast to find drop position on ground
                // Ideally, we raycast against the scene.
                // For simplicity, we drop at (0, 0, 0) or slightly offset if possible,
                // but since we don't have easy access to the engine/scene instance here outside the useEffect,
                // we will rely on a generic strategy or just add it at 0,0,0.

                // Note: To do proper raycasting, we need the scene instance.
                // We could move the logic inside, but React event handlers are outside.
                // Solution: Use a ref to store the scene/engine.

                createGameEntity(World, [Math.random() * 4 - 2, 1, Math.random() * 4 - 2], id);
             }
          } catch (err) {
              console.error("Drop error", err);
          }
      }
  };

  const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
  };

  return <canvas
            ref={canvasRef}
            className="w-full h-full touch-none"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
         />;
};

export default Viewport;
