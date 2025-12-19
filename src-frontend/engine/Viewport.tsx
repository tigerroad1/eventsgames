import React, { useEffect, useRef } from 'react';
import { Engine, Scene, Vector3, HemisphericLight, FreeCamera, MeshBuilder } from '@babylonjs/core';
import { World, createGameEntity, TransformComponent, addScript } from '../ecs';
import { createRenderSystem, entityMeshMap } from '../ecs/systems/RenderSystem';
import { createGizmoSystem } from '../ecs/systems/GizmoSystem';
import { createScriptSystem } from '../ecs/systems/ScriptSystem';
import { createInputSystem } from '../ecs/systems/InputSystem';
import { useEditorStore } from '../store';

const Viewport: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simStateRef = useRef(useEditorStore.getState().simulationState);

  useEffect(() => {
      return useEditorStore.subscribe(state => {
          simStateRef.current = state.simulationState;
      });
  }, []);

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
    const scriptSystem = createScriptSystem();
    const inputSystem = createInputSystem();

    // Initialize Gizmo System
    const { syncGizmosToECS } = createGizmoSystem(scene, (eid) => entityMeshMap.get(eid));

    // Create a demo entity to verify ECS is working
    const sphereEid = createGameEntity(World, [0, 1, 0], 1); // Sphere at 0,1,0
    createGameEntity(World, [2, 1, 0], 0); // Box at 2,1,0

    // Add Player Script to Sphere (ID 2 = Player)
    addScript(World, sphereEid, 2);

    // Built-in 'ground' shape.
    MeshBuilder.CreateGround('ground1', { width: 6, height: 6, subdivisions: 2 }, scene);

    engine.runRenderLoop(() => {
      const delta = engine.getDeltaTime() / 1000.0;

      // 1. Sync Gizmo changes (Mesh -> ECS)
      if (simStateRef.current !== 'playing') {
         syncGizmosToECS();
      }

      // 2. Gameplay Logic (Simulation)
      if (simStateRef.current === 'playing') {
          inputSystem(World);
          scriptSystem(World, delta);

          // TPS Camera Logic (Basic Follow)
          // Find player entity (sphereEid is captured in closure, but we should look it up dynamically ideally)
          // For now use captured sphereEid.
          const px = TransformComponent.posX[sphereEid];
          const py = TransformComponent.posY[sphereEid];
          const pz = TransformComponent.posZ[sphereEid];

          // Smooth follow
          const targetPos = new Vector3(px, py + 5, pz - 10);
          camera.position = Vector3.Lerp(camera.position, targetPos, 0.1);
          camera.setTarget(new Vector3(px, py, pz));
      }

      // 3. Run ECS Systems (ECS Logic & ECS -> Mesh)
      renderSystem(World);

      // 4. Render Scene
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
