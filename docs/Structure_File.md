# Structure de Dossiers et Fichiers - Darkgame

| Information | Détail |
| :--- | :--- |
| **Nom du Projet** | Darkgame |
| **Version** | 1.2 (Structure de Fichiers) |
| **Date** | 17 Décembre 2025 |
| **Auteur** | Manus AI (Directeur de Projet) |
| **Objectif** | Définir une structure de projet claire et hiérarchique pour l'application hybride Tauri/Rust/React/ECS. |

## 1. Vue d'Ensemble de la Structure Racine

La structure de base suit le modèle standard d'une application Tauri, où le *frontend* est contenu dans un sous-dossier (ici `src-frontend`) et le *backend* Rust dans le dossier `src-tauri`.

```
darkgame/
├── .git/
├── node_modules/
├── src-frontend/             # Code source de l'interface utilisateur (React/TS)
├── src-tauri/                # Code source du backend natif (Rust)
├── public/                   # Assets statiques (icônes, images de base)
├── target/                   # Dossier de compilation Rust
├── dist/                     # Dossier de build final (Vite)
├── package.json              # Dépendances Node.js (React, Tailwind, Tauri CLI)
├── pnpm-lock.yaml            # Fichier de verrouillage des dépendances
├── tsconfig.json             # Configuration TypeScript
├── vite.config.ts            # Configuration du build Frontend
└── README.md                 # Documentation de base du projet
```

## 2. Structure Détaillée du Frontend (`src-frontend/`)

Le *frontend* est le cœur de l'éditeur visuel. Son organisation est cruciale pour la maintenabilité de l'interface utilisateur (React) et de la logique de jeu (ECS/Babylon.js).

```
src-frontend/
├── assets/                   # Fichiers d'assets locaux (textures, sons, icônes UI)
├── components/               # Composants React réutilisables (boutons, inputs, etc.)
│   ├── ui/                   # Composants génériques (boutons, inputs)
│   └── editor/               # Composants spécifiques à l'éditeur (InspectorPanel, OutlinerItem)
├── hooks/                    # Hooks React personnalisés (useECSQuery, useTauriInvoke)
├── styles/                   # Fichiers de configuration Tailwind et CSS global
├── stores/                   # Fichiers de gestion d'état (Zustand, Jotai)
│   ├── globalStore.ts        # État global de l'application (Zustand)
│   └── atoms/                # Atomes Jotai/Valtio pour l'état granulaire
├── ecs/                      # Architecture Entity Component System (BitECS)
│   ├── components/           # Définitions des Composants (TransformComponent.ts, MeshComponent.ts)
│   ├── systems/              # Logique de jeu (RenderSystem.ts, PhysicsSystem.ts)
│   ├── entities/             # Fonctions de création d'entités (createPlayer.ts)
│   └── index.ts              # Initialisation du monde ECS
├── engine/                   # Moteur 3D (Babylon.js)
│   ├── scenes/               # Configuration des scènes Babylon.js
│   ├── utils/                # Fonctions utilitaires 3D (maths, conversions)
│   └── Viewport.tsx          # Composant React qui contient le canvas Babylon.js
├── pages/                    # Vues principales de l'application
│   └── Editor.tsx            # La vue principale de l'éditeur
└── App.tsx                   # Composant racine de l'application
```

## 3. Structure Détaillée du Backend (`src-tauri/`)

Le *backend* Rust gère les opérations natives critiques, notamment le traitement des assets 3D et l'accès au système de fichiers.

```
src-tauri/
├── src/
│   ├── commands/             # Fonctions Rust appelables depuis le frontend (tauri::command)
│   │   ├── file_system.rs    # Commandes de sauvegarde/chargement de projet (.ZIP)
│   │   └── asset_processor.rs # Commandes pour le traitement FBX/OBJ
│   ├── asset_pipeline/       # Logique Rust pour la lecture et la normalisation des assets 3D
│   │   ├── fbx_parser.rs     # Logique de parsing FBX
│   │   └── retargeting.rs    # Logique de normalisation du squelette
│   ├── main.rs               # Point d'entrée de l'application Tauri
│   └── models.rs             # Structures de données partagées entre Rust et TypeScript
├── Cargo.toml                # Dépendances Rust (crates)
└── tauri.conf.json           # Configuration de l'application Tauri
```

## 4. Dossiers de Documentation et de Configuration

Pour une gestion de projet complète, il est recommandé de conserver les documents de gestion à la racine du projet ou dans un dossier dédié.

```
darkgame/
├── docs/                     # Documentation de gestion de projet
│   ├── Charte_Projet.md      # Charte de Projet
│   ├── SRS.md                # Spécifications des Exigences Logiciel
│   ├── SFD.md                # Spécifications Fonctionnelles Détaillées
│   ├── STD.md                # Spécifications Techniques Détaillées
│   ├── Plan_Tests.md         # Plan de Tests
│   ├── Roadmap.md            # Plan de Développement et Roadmap
│   ├── Guide_Dev.md          # Guide de Développement
│   ├── Livre_Blanc.md        # Livre Blanc Technique et Stratégique
│   └── Task_List.md          # Liste des Tâches (Task.md)
└── assets/                   # Assets de projet (modèles de test, images de référence)
    └── test_models/          # Modèles 3D pour les tests d'intégration
```

## 5. Justification de la Structure

Cette structure hiérarchique est conçue pour :

1.  **Séparation des Préoccupations :** Le code *frontend* (UI/ECS/3D) est clairement séparé du code *backend* (Rust/Tauri), ce qui facilite le travail des développeurs spécialisés.
2.  **Clarté de l'ECS :** L'architecture ECS est isolée dans son propre dossier (`src-frontend/ecs`), garantissant que la logique de jeu est bien structurée et facile à maintenir.
3.  **Performance Native :** Le code Rust est organisé pour refléter ses responsabilités (commandes, pipeline d'assets), permettant une identification rapide des goulots d'étranglement de performance.
4.  **Gouvernance :** Un dossier `docs/` centralise tous les livrables de gestion de projet, assurant que la documentation est toujours accessible et à jour.

***

## Références

[1] Spécifications Techniques Détaillées (STD) - Darkgame (Version 1.1).
[2] Guide de Développement - Darkgame (Version 1.1).
[3] Liste des Tâches (Task List) - Darkgame.
