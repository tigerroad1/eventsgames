import React, { useEffect, useRef } from 'react';
import { Engine, Scene, Vector3, HemisphericLight, FreeCamera, MeshBuilder } from '@babylonjs/core';

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

    // Built-in 'sphere' shape.
    const sphere = MeshBuilder.CreateSphere('sphere1', { segments: 16, diameter: 2 }, scene);
    sphere.position.y = 1;

    // Built-in 'ground' shape.
    MeshBuilder.CreateGround('ground1', { width: 6, height: 6, subdivisions: 2 }, scene);

    engine.runRenderLoop(() => {
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

  return <canvas ref={canvasRef} className="w-full h-full touch-none" />;
};

export default Viewport;
