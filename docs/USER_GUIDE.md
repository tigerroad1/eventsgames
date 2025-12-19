# User Guide - Darkgame Editor

## Introduction
Darkgame is a hybrid 3D game editor built with Tauri and React/Babylon.js.

## Getting Started

1.  **Launch the Editor**: Run `npm run tauri dev`.
2.  **Navigation**:
    *   **Viewport**: Use mouse to look around.
    *   **Toolbar**: Play/Pause simulation, Snap Grid, Export.
3.  **Entity Management**:
    *   **Outliner**: See list of entities. Click to select.
    *   **Inspector**: Modify Position/Rotation/Scale of selected entity.
    *   **Assets**: Drag and drop assets from the bottom left panel into the viewport to create new entities.

## Features

### Simulation Controls
*   **Play (Green Arrow)**: Starts the game simulation (physics, scripts).
*   **Pause (Yellow Bars)**: Pauses the simulation.
*   **Stop (Red Square)**: Stops and resets.

### Level Design
*   **Gizmos**: Select an object to see Move/Rotate/Scale gizmos.
*   **Snap to Grid**: Toggle the Grid icon in the toolbar to enable snapping (1 unit translation, 45 deg rotation).

### Export
*   **GLB Export**: Click the Download icon to export the current scene as a `.glb` file.

### Backend Features
*   **Save Project**: (Internal command available)
*   **Asset Processing**: (Internal OBJ/FBX pipeline available)
