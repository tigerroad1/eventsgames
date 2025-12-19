# Livre Blanc Technique et Stratégique - Darkgame

| Information | Détail |
| :--- | :--- |
| **Nom du Projet** | Darkgame |
| **Version** | 1.2 (Intégration Stratégique) |
| **Date** | 17 Décembre 2025 |
| **Auteur** | Manus AI (Directeur de Projet) |
| **Public Cible** | Direction, Investisseurs, Partenaires Techniques |

## Table des Matières

1.  **Résumé Exécutif**
2.  **Cadrage Stratégique du Projet**
    2.1. Justification et Vision
    2.2. Objectifs Mesurables (SMART)
    2.3. Portée du Projet (Inclusions et Exclusions)
3.  **Architecture Technique Approfondie**
    3.1. Modèle d'Architecture Hybride Zero-Server
    3.2. Stack Technologique Détaillée (Versions Stables)
    3.3. Le Rôle Critique de l'Architecture ECS (BitECS)
    3.4. Le Pipeline d'Assets Natif (Tauri/Rust)
4.  **Spécifications Fonctionnelles Clés**
    4.1. L'Expérience Utilisateur de l'Éditeur (SFD)
    4.2. Les Fonctionnalités de Prototypage (FR)
    4.3. Les Règles Métier et Contraintes
5.  **Planification et Gestion du Projet**
    5.1. Roadmap de Développement (28 Semaines)
    5.2. Phases de Développement et Jalons Critiques (M1-M4)
    5.3. Indicateurs de Performance Clés (KPI)
    5.4. Risques de Haut Niveau et Stratégies d'Atténuation
6.  **Gouvernance et Qualité**
    6.1. Stratégie de Test (Plan de Tests)
    6.2. Guide de Développement et Conventions de Codage
7.  **Conclusion et Perspectives**

***

## 1. Résumé Exécutif

Darkgame est une solution logicielle d'édition et de prototypage de jeux 3D qui se distingue par son architecture **hybride** et son modèle **Zero-Server**. En encapsulant un *frontend* moderne (React/Babylon.js) dans une application native légère (Tauri/Rust), Darkgame offre une expérience utilisateur fluide et sécurisée, tout en garantissant la confidentialité des assets et des projets. L'adoption de l'architecture **Entity Component System (ECS)** via BitECS assure une performance et une évolutivité maximales pour la logique de jeu. Le projet est formellement autorisé par la Charte de Projet (v1.1) et est planifié sur une *Roadmap* de 28 semaines.

## 2. Cadrage Stratégique du Projet

### 2.1. Justification et Vision

La vision de Darkgame est de **démocratiser la création de jeux vidéo 3D** en offrant une alternative légère et performante aux moteurs existants. Le projet vise à combler le fossé entre la création d'assets 3D et leur intégration en jeu, en permettant le test direct du *gameplay* sans compilation lourde.

### 2.2. Objectifs Mesurables (SMART)

*   **Performance :** Maintenir un taux de rafraîchissement de **60 FPS** minimum dans le Viewport (NFR-P01).
*   **Fonctionnalité :** Réussite de **100%** des cas de tests critiques liés au *Level Design* et à la simulation.
*   **Interopérabilité :** Validation du pipeline d'importation FBX/OBJ et d'exportation GLTF/GLB.
*   **Architecture :** Déploiement via **Tauri v1.6.0** et implémentation de la logique de jeu via **ECS**.

### 2.3. Portée du Projet (Inclusions et Exclusions)

*   **Inclusions :** Application desktop hybride (Tauri/Rust/React), éditeur 3D WYSIWYG (Babylon.js), architecture ECS, pipeline d'importation FBX/OBJ avec *retargeting*, Level Design Modulaire, mode simulation TPS, exportation GLTF/GLB.
*   **Exclusions :** Langage de script intégré complexe, support natif pour macOS/Linux/Mobile au lancement, fonctionnalités multijoueurs ou réseau.

## 3. Architecture Technique Approfondie

### 3.1. Modèle d'Architecture Hybride Zero-Server

L'architecture repose sur la combinaison d'une interface web (React) pour la flexibilité de l'UI et d'un *backend* natif (Rust via Tauri) pour la performance et l'accès au système de fichiers. Le modèle **Zero-Server** garantit que toutes les données de projet restent locales, assurant performance et confidentialité (NFR-S01).

### 3.2. Stack Technologique Détaillée (Versions Stables)

| Composant | Technologie / Version | Justification de la Stabilité |
| :--- | :--- | :--- |
| **Système d'Application** | **Tauri v1.6.0** | Dernière version stable de la v1, privilégiée pour la robustesse. |
| **Moteur 3D** | **Babylon.js v6.0.0** | Version stable antérieure, éprouvée pour le rendu 3D performant. |
| **Frontend** | **React (^18.3.1), TypeScript (^5.5.3)** | Standards de l'industrie pour une UI réactive et maintenable. |
| **Logique de Jeu** | **BitECS (^0.3.40)** | Implémentation ECS haute performance. |

### 3.3. Le Rôle Critique de l'Architecture ECS (BitECS)

L'ECS est la fondation de la logique de jeu. Il sépare les données (Composants) de la logique (Systèmes), permettant une performance optimale grâce à une conception orientée données et une meilleure utilisation du cache CPU. Cette architecture est essentielle pour atteindre l'objectif de 60 FPS.

### 3.4. Le Pipeline d'Assets Natif (Tauri/Rust)

Le *backend* Rust est responsable du traitement des fichiers binaires FBX/OBJ. Il assure une lecture et une normalisation rapides et fiables des données 3D avant de les intégrer à la scène Babylon.js via l'API Tauri.

## 4. Spécifications Fonctionnelles Clés

### 4.1. L'Expérience Utilisateur de l'Éditeur (SFD)

L'interface est divisée en zones clés (Viewport, Outliner, Inspector, Asset Browser) pour une expérience utilisateur complète et personnalisable (panneaux redimensionnables).

### 4.2. Les Fonctionnalités de Prototypage (FR)

Les fonctionnalités clés incluent :
*   Gestion de Scène WYSIWYG (FR-001).
*   Manipulation d'Objets (Move, Rotate, Scale) (FR-002).
*   Simulation en Temps Réel (FR-004).
*   Pipeline d'Importation FBX/OBJ (FR-005).
*   Binding d'Animations avec *cross-fading* (FR-006).
*   Mode Jeu TPS (FR-008).

### 4.3. Les Règles Métier et Contraintes

Toute la logique de jeu doit être gérée par l'ECS (RM-001). Le logiciel doit fonctionner entièrement en local (RM-002). L'exportation par défaut est GLTF/GLB (RM-005).

## 5. Planification et Gestion du Projet

### 5.1. Roadmap de Développement (28 Semaines)

Le projet est planifié sur une durée estimée de **28 semaines** (environ 7 mois), structurée en cinq phases progressives.

### 5.2. Phases de Développement et Jalons Critiques (M1-M4)

| Jalon | Phase | Description | Date Cible (Fin de Semaine) |
| :--- | :--- | :--- | :--- |
| **M1** | P0 | Setup Environnement Complet (Tauri/Rust/React) | S2 |
| **M3** | P1 | Architecture ECS Opérationnelle (BitECS/Babylon.js) | S6 |
| **M4** | P2 | Structure UI de l'Éditeur (Panneaux redimensionnables) | S8 |

### 5.3. Indicateurs de Performance Clés (KPI)

*   **Couverture des Tests Unitaires :** > 70% (Qualité du code).
*   **Stabilité du Build :** > 5 jours consécutifs sans échec (Robustesse de l'intégration).
*   **Achèvement des Jalons :** 100% des jalons M1 à M4 complétés (Respect du calendrier).

### 5.4. Risques de Haut Niveau et Stratégies d'Atténuation

Le risque principal est le **Problème d'Importation FBX** (R-001), atténué par des tests unitaires intensifs sur le *crate* Rust. Le risque de **Dérive de la Portée** (R-002) est géré par la Charte de Projet et un processus de gestion des changements formel.

## 6. Gouvernance et Qualité

### 6.1. Stratégie de Test (Plan de Tests)

Les tests seront effectués par niveaux (Unitaires, Intégration, Système, UAT) pour valider la conformité aux exigences. L'environnement de test cible Windows 10/11 avec des spécifications matérielles minimales définies.

### 6.2. Guide de Développement et Conventions de Codage

Le Guide de Développement impose l'utilisation de **TypeScript** et **Rust**, le respect de l'architecture **ECS** pour la logique de jeu, et l'utilisation exclusive de l'**API Tauri** pour la communication *frontend-backend*.

***

## 7. Conclusion et Perspectives

Darkgame est un projet stratégique avec une fondation technique solide et une planification rigoureuse. L'accent mis sur la stabilité et la performance locale positionne l'outil de manière unique sur le marché du prototypage 3D. Le succès de la phase de fondation (S1-S8) est la clé pour débloquer les phases ultérieures de développement des fonctionnalités avancées.

***

## Références

[1] Charte de Projet - Darkgame (Version 1.1).
[2] Spécifications des Exigences Logiciel (SRS) - Darkgame (Version 1.1).
[3] Spécifications Fonctionnelles Détaillées (SFD) - Darkgame (Version 1.1).
[4] Spécifications Techniques Détaillées (STD) - Darkgame (Version 1.1).
[5] Plan de Tests - Darkgame (Version 1.1).
[6] Plan de Développement et Roadmap - Darkgame (Version 1.1).
[7] Guide de Développement - Darkgame (Version 1.1).
