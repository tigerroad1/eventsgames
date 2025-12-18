# Plan de Développement et Roadmap - Darkgame

| Information | Détail |
| :--- | :--- |
| **Nom du Projet** | Darkgame |
| **Version** | 1.1 (Révision Technique) |
| **Date** | 17 Décembre 2025 |
| **Auteur** | Manus AI (Directeur de Projet) |
| **Documents de Référence** | SRS v1.1, SFD v1.1, STD v1.1 |

## 1. TODO List - Phases de Développement

Le développement de Darkgame est structuré en cinq phases principales, chacune se concentrant sur un ensemble de fonctionnalités critiques.

### Phase 0 : Initialisation & Setup (Durée Estimée : 2 Semaines)

| Tâche (TODO) | Exigence Ciblée | Statut |
| :--- | :--- | :--- |
| **0.1** Configurer le monorepo (si applicable) et l'environnement de développement (Vite, React, TypeScript). | STD v1.1 | À faire |
| **0.2** Installer et configurer **Tauri v1.6.0** et le *crate* Rust associé. | STD v1.1 | À faire |
| **0.3** Mettre en place la structure de base de l'application (fenêtre principale, communication *frontend-backend* de base). | STD v1.1 | À faire |
| **0.4** Intégrer les bibliothèques de gestion d'état (Zustand, Jotai, Valtio). | STD v1.1 | À faire |

### Phase 1 : Core 3D Engine & ECS (Durée Estimée : 4 Semaines)

| Tâche (TODO) | Exigence Ciblée | Statut |
| :--- | :--- | :--- |
| **1.1** Intégrer **Babylon.js v6.0.0** dans le Viewport React. | STD v1.1 | À faire |
| **1.2** Configurer le rendu 3D de base (caméra, lumière par défaut, scène vide). | FR-001 | À faire |
| **1.3** Intégrer et configurer **BitECS** pour la gestion des entités. | FR-003, NFR-M01 | À faire |
| **1.4** Créer les composants ECS de base (`TransformComponent`, `MeshComponent`). | FR-003 | À faire |
| **1.5** Développer le système de rendu ECS (synchronisation BitECS -> Babylon.js). | FR-003 | À faire |

### Phase 2 : Core Editor UI & Interaction (Durée Estimée : 5 Semaines)

| Tâche (TODO) | Exigence Ciblée | Statut |
| :--- | :--- | :--- |
| **2.1** Implémenter l'interface utilisateur avec les panneaux redimensionnables (Viewport, Outliner, Inspector, Asset Browser). | NFR-UI01 | À faire |
| **2.2** Développer l'**Outliner** (Zone B) pour afficher la hiérarchie des entités. | FR-001 | À faire |
| **2.3** Développer l'**Inspector** (Zone D) pour afficher et modifier les Composants ECS. | FR-003 | À faire |
| **2.4** Implémenter les Gizmos de manipulation (Move, Rotate, Scale) dans le Viewport. | FR-002 | À faire |
| **2.5** Développer la fonctionnalité de glisser-déposer d'un asset simple du Asset Browser vers le Viewport. | FR-001 | À faire |

### Phase 3 : Asset Pipeline & Import (Durée Estimée : 6 Semaines)

| Tâche (TODO) | Exigence Ciblée | Statut |
| :--- | :--- | :--- |
| **3.1** Développer le *crate* Rust pour la lecture et le traitement des fichiers **FBX/OBJ**. | FR-005, STD v1.1 | À faire |
| **3.2** Implémenter la communication Tauri pour l'importation de fichiers volumineux. | FR-005 | À faire |
| **3.3** Développer la logique de normalisation du squelette et de correction d'échelle/orientation. | FR-005 | À faire |
| **3.4** Implémenter la fonctionnalité d'exportation au format **GLTF/GLB**. | FR-009 | À faire |
| **3.5** Implémenter la sauvegarde et le chargement du projet au format `.ZIP` propriétaire. | FR-009 | À faire |

### Phase 4 : Gameplay & Logic (Durée Estimée : 7 Semaines)

| Tâche (TODO) | Exigence Ciblée | Statut |
| :--- | :--- | :--- |
| **4.1** Implémenter les contrôles de simulation (Lecture/Pause/Étape suivante). | FR-004 | À faire |
| **4.2** Développer le système de **Retargeting Intelligent** pour les animations. | FR-006 | À faire |
| **4.3** Implémenter le **Binding d'Animations** aux entrées utilisateur (clavier/manette) avec gestion du *cross-fading*. | FR-006 | À faire |
| **4.4** Développer le mode de simulation **TPS** (contrôleur de personnage, caméra TPS). | FR-008 | À faire |
| **4.5** Intégrer le composant `ScriptComponent` de base (pour l'ajout de comportements simples). | FR-003 | À faire |

### Phase 5 : Advanced Features & Polish (Durée Estimée : 4 Semaines)

| Tâche (TODO) | Exigence Ciblée | Statut |
| :--- | :--- | :--- |
| **5.1** Développer le module de **Level Design Modulaire** (grille de *snapping*, placement de murs/sols). | FR-007 | À faire |
| **5.2** Implémenter le **rendu instancié** pour les objets répétitifs. | NFR-P01 | À faire |
| **5.3** Optimisation finale des performances pour atteindre l'objectif de **60 FPS**. | NFR-P01 | À faire |
| **5.4** Tests Système et UAT (basés sur le Plan de Tests v1.1). | Tous | À faire |
| **5.5** Finalisation de la documentation utilisateur et technique. | Tous | À faire |

## 2. Roadmap de Développement (Gantt Simplifié)

La *Roadmap* suivante présente une vue d'ensemble du calendrier de développement, basée sur les estimations de durée des phases.

| Phase | Durée (Semaines) | Début (Estimé) | Fin (Estimée) | Jalons Clés |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 0 : Initialisation & Setup** | 2 | S1 | S2 | Environnement de développement fonctionnel (Tauri/React/Rust). |
| **Phase 1 : Core 3D Engine & ECS** | 4 | S3 | S6 | Scène 3D de base rendue via ECS (BitECS/Babylon.js). |
| **Phase 2 : Core Editor UI & Interaction** | 5 | S7 | S11 | Interface utilisateur complète (Outliner, Inspector, Gizmos) et fonctionnelle. |
| **Phase 3 : Asset Pipeline & Import** | 6 | S12 | S17 | Importation FBX/OBJ et Exportation GLTF/GLB fonctionnelles. |
| **Phase 4 : Gameplay & Logic** | 7 | S18 | S24 | Contrôle de personnage TPS et système de *Binding* d'animations opérationnels. |
| **Phase 5 : Advanced Features & Polish** | 4 | S25 | S28 | Module de Level Design Modulaire terminé, objectif 60 FPS atteint, UAT réussi. |
| **TOTAL** | **28 Semaines** | | | |

**Note sur la Roadmap :** Cette estimation de 28 semaines (environ 7 mois) est un calendrier de référence. Elle n'inclut pas les temps de stabilisation après chaque phase ni les délais potentiels dus à la résolution de bugs majeurs.

***

## Références

[1] Spécifications des Exigences Logiciel (SRS) - Darkgame (Version 1.1).
[2] Spécifications Fonctionnelles Détaillées (SFD) - Darkgame (Version 1.1).
[3] Spécifications Techniques Détaillées (STD) - Darkgame (Version 1.1).
