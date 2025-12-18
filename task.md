# Liste des Tâches (Task List) - Darkgame

Ce document liste toutes les tâches de développement du projet Darkgame, organisées par phase, avec leur statut, priorité et assignation.

| ID Tâche | Phase | Description | Priorité | Assigné à | Statut |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P0.1** | Setup | Configurer le monorepo et l'environnement de développement (Vite, React, TypeScript). | Haute | Développeur Frontend | Terminé |
| **P0.2** | Setup | Installer et configurer **Tauri v2.0.0** et le *crate* Rust associé. | Haute | Développeur Backend | Terminé |
| **P0.3** | Setup | Mettre en place la structure de base de l'application (fenêtre principale, communication *frontend-backend* de base). | Haute | Développeur Fullstack | Terminé |
| **P0.4** | Setup | Intégrer les bibliothèques de gestion d'état (Zustand, Jotai, Valtio). | Moyenne | Développeur Frontend | Terminé |
| **P1.1** | Core Engine | Intégrer **Babylon.js v7.0.0** dans le Viewport React. | Haute | Développeur 3D | Terminé |
| **P1.2** | Core Engine | Configurer le rendu 3D de base (caméra, lumière par défaut, scène vide). | Haute | Développeur 3D | Terminé |
| **P1.3** | Core Engine | Intégrer et configurer **BitECS** pour la gestion des entités. | Haute | Développeur Logique | Terminé |
| **P1.4** | Core Engine | Créer les composants ECS de base (`TransformComponent`, `MeshComponent`). | Haute | Développeur Logique | Terminé |
| **P1.5** | Core Engine | Développer le système de rendu ECS (synchronisation BitECS -> Babylon.js). | Haute | Développeur 3D | Terminé |
| **P2.1** | Core UI | Implémenter l'interface utilisateur avec les panneaux redimensionnables. | Haute | Développeur Frontend | Terminé |
| **P2.2** | Core UI | Développer l'**Outliner** (Zone B) pour afficher la hiérarchie des entités. | Moyenne | Développeur Frontend | Terminé |
| **P2.3** | Core UI | Développer l'**Inspector** (Zone D) pour afficher et modifier les Composants ECS. | Moyenne | Développeur Frontend | Terminé |
| **P2.4** | Core UI | Implémenter les Gizmos de manipulation (Move, Rotate, Scale) dans le Viewport. | Haute | Développeur 3D | Terminé |
| **P2.5** | Core UI | Développer la fonctionnalité de glisser-déposer d'un asset simple du Asset Browser vers le Viewport. | Moyenne | Développeur Frontend | Terminé |
| **P3.1** | Asset Pipeline | Développer le *crate* Rust pour la lecture et le traitement des fichiers **FBX/OBJ**. | Critique | Développeur Backend | Terminé |
| **P3.2** | Asset Pipeline | Implémenter la communication Tauri pour l'importation de fichiers volumineux. | Haute | Développeur Fullstack | Terminé |
| **P3.3** | Asset Pipeline | Développer la logique de normalisation du squelette et de correction d'échelle/orientation. | Critique | Développeur Backend | Terminé |
| **P3.4** | Asset Pipeline | Implémenter la fonctionnalité d'exportation au format **GLTF/GLB**. | Moyenne | Développeur 3D | Terminé |
| **P3.5** | Asset Pipeline | Implémenter la sauvegarde et le chargement du projet au format `.ZIP` propriétaire. | Moyenne | Développeur Fullstack | Terminé |
| **P4.1** | Gameplay | Implémenter les contrôles de simulation (Lecture/Pause/Étape suivante). | Haute | Développeur Logique | Terminé |
| **P4.2** | Gameplay | Développer le système de **Retargeting Intelligent** pour les animations. | Critique | Développeur Logique | À faire |
| **P4.3** | Gameplay | Implémenter le **Binding d'Animations** aux entrées utilisateur (clavier/manette) avec gestion du *cross-fading*. | Haute | Développeur Logique | À faire |
| **P4.4** | Gameplay | Développer le mode de simulation **TPS** (contrôleur de personnage, caméra TPS). | Haute | Développeur 3D | À faire |
| **P4.5** | Gameplay | Intégrer le composant `ScriptComponent` de base. | Moyenne | Développeur Logique | À faire |
| **P5.1** | Advanced | Développer le module de **Level Design Modulaire**. | Moyenne | Développeur 3D | À faire |
| **P5.2** | Advanced | Implémenter le **rendu instancié** pour les objets répétitifs. | Haute | Développeur 3D | À faire |
| **P5.3** | Advanced | Optimisation finale des performances pour atteindre l'objectif de **60 FPS**. | Haute | Développeur 3D | À faire |
| **P5.4** | Advanced | Tests Système et UAT (basés sur le Plan de Tests v1.1). | Haute | Équipe QA | À faire |
| **P5.5** | Advanced | Finalisation de la documentation utilisateur et technique. | Moyenne | Rédacteur Technique | À faire |

***

## Légende

*   **Priorité :** Critique (Bloquant), Haute (Essentiel), Moyenne (Important), Basse (Optionnel).
*   **Statut :** À faire, En cours, En revue, Terminé.
*   **Assigné à :** Rôle générique pour l'assignation initiale.
