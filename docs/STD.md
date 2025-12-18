# Spécifications Techniques Détaillées (STD) - Darkgame (Révision 1.1)

| Information | Détail |
| :--- | :--- |
| **Nom du Projet** | Darkgame |
| **Version** | 1.1 (Révision Technique) |
| **Date** | 17 Décembre 2025 |
| **Auteur** | Manus AI (Directeur de Projet) |
| **Justification de la Révision** | Passage à des versions technologiques antérieures et plus stables pour garantir la compatibilité et la robustesse du projet. |

## 1. Architecture Générale du Système

### 1.1. Modèle d'Architecture

Le projet Darkgame conserve son architecture **hybride** (Interface Web + Backend Natif Léger) et son modèle **"Zero-Server"**.

## 2. Stack Technologique Détaillée (Révisée)

Le projet repose désormais sur des versions technologiques stables pour minimiser les risques de compatibilité.

### 2.1. Frontend et Interface Utilisateur

| Composant | Technologie / Version (Révisée) | Rôle Technique |
| :--- | :--- | :--- |
| **Framework UI** | **React (^18.3.1)** et **React DOM (^18.3.1)** | Construction de l'interface utilisateur réactive et modulaire. |
| **Styling** | **Tailwind CSS (^3.4.4)** | Styles utilitaires pour un design rapide et personnalisable. |
| **Build Tool** | **Vite (^7.3.0)** | Outil de *build* et de développement rapide. |
| **Langage** | **TypeScript (^5.5.3)** | Assure le typage statique. |
| **Composants UI** | **React Resizable Panels (^4.0.5)** | Gestion des zones de l'éditeur. |
| **Icônes** | **Lucide React (^0.400.0)** | Bibliothèque d'icônes vectorielles. |

### 2.2. Moteur 3D et Rendu

| Composant | Technologie / Version (Révisée) | Rôle Technique |
| :--- | :--- | :--- |
| **Moteur 3D** | **Babylon.js Core (^6.0.0)** | Gestion du rendu 3D, de la physique, des caméras, des lumières et du chargement des assets. **(Version stable antérieure)** |
| **Optimisation** | **Rendu Instancié** | Babylon.js doit être configuré pour utiliser le rendu instancié pour les objets répétitifs afin de respecter l'exigence de **60 FPS** (NFR-P01). |

### 2.3. Gestion d'État

La gestion d'état reste inchangée, utilisant des bibliothèques stables et performantes.

| Composant | Technologie / Version | Rôle Technique |
| :--- | :--- | :--- |
| **État Global** | **Zustand (^4.5.4)** | Gestion de l'état global de l'application. |
| **État Atomique** | **Jotai (^2.9.0)** | Gestion d'état granulaire. |
| **État Réactif** | **Valtio (^1.13.2)** | Gestion d'état basée sur des *proxies*. |
| **ECS** | **BitECS (^0.3.40)** | Implémentation ECS haute performance pour la logique de jeu. |

### 2.4. Backend et Intégration Système

| Composant | Technologie / Version (Révisée) | Rôle Technique |
| :--- | :--- | :--- |
| **Système d'Application** | **Tauri (^1.6.0)** | Fournit le *framework* pour l'application desktop. **(Version stable de la v1)** |
| **Langage Backend** | **Rust (Édition 2021)** | Exécution de code natif haute performance. |
| **Communication** | **API Tauri (^1.6.0)** | Interface de communication sécurisée entre le *frontend* et le *backend*. |

## 3. Structure des Données et Formats

(Section inchangée par rapport à la version 1.0)

## 4. Interfaces et Communication

(Section inchangée par rapport à la version 1.0)

## 5. Environnement de Développement et Déploiement

### 5.1. Environnement de Développement

*   **Gestionnaire de Paquets :** `pnpm` est recommandé.
*   **Lancement :** Le développement utilisera les commandes `vite` et `tauri dev`.

### 5.2. Déploiement

*   **Build :** Le processus de *build* utilisera les outils de compilation de Tauri v1.6.0 pour générer des exécutables natifs.
*   **Cibles :** Windows (via Tauri) et Web (via compilation standard Vite/React).

***

## Références

[1] Contenu fourni par l'utilisateur pour la description du projet Darkgame.
[2] Contrainte de stabilité technologique demandée par l'utilisateur (17 Décembre 2025).
[3] Spécifications des Exigences Logiciel (SRS) - Darkgame (Version 1.0).
[4] Spécifications Fonctionnelles Détaillées (SFD) - Darkgame (Version 1.0).
