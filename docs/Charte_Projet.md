# Charte de Projet - Darkgame

| Information | Détail |
| :--- | :--- |
| **Nom du Projet** | Darkgame |
| **Version** | 1.0 |
| **Date d'Émission** | 17 Décembre 2025 |
| **Auteur** | Manus AI (Directeur de Projet) |
| **Sponsor du Projet** | [Nom du Sponsor/Client] |
| **Chef de Projet** | Manus AI (Directeur de Projet) |

## 1. Résumé Exécutif

La Charte de Projet autorise formellement le projet **Darkgame**, un outil logiciel visant à démocratiser la création de jeux vidéo 3D en offrant une interface visuelle complète et performante. Ce projet est justifié par le besoin de simplifier le prototypage rapide de personnages 3D et d'environnements interactifs sans nécessiter d'infrastructure lourde ou de codage intensif.

Ce document établit les objectifs de haut niveau, la portée, les parties prenantes clés, les contraintes et les critères de succès du projet.

## 2. Justification et Objectifs du Projet

### 2.1. Justification du Projet

Le marché actuel de la création de jeux 3D est dominé par des moteurs lourds et complexes (Unity, Unreal Engine) qui nécessitent une expertise technique approfondie. Darkgame répond au besoin d'un outil léger, performant et local (*Zero-Server*) qui permet aux créateurs, animateurs et développeurs de tester rapidement des *assets* (FBX) et de construire des niveaux via une approche visuelle (WYSIWYG et ECS).

### 2.2. Objectifs Mesurables (SMART)

| Objectif | Description | Critère de Succès (Mesurable) |
| :--- | :--- | :--- |
| **Performance** | Assurer une expérience utilisateur fluide lors de l'édition et de la simulation. | Maintenir un taux de rafraîchissement de **60 FPS** minimum dans le Viewport, même avec des scènes complexes utilisant le rendu instancié (NFR-P01). |
| **Fonctionnalité** | Implémenter les fonctionnalités de base de l'éditeur 3D. | Réussite de **100%** des cas de tests critiques liés au *Level Design* (FR-001), à la manipulation d'objets (FR-002) et à la simulation en temps réel (FR-004). |
| **Interopérabilité** | Garantir la compatibilité avec les formats d'assets standards. | Le pipeline d'importation FBX/OBJ et d'exportation GLTF/GLB doit être validé par l'équipe QA et accepté par les utilisateurs clés (TC-FR005-01, TC-FR009-01). |
| **Architecture** | Respecter le modèle d'architecture technique défini. | L'application doit être déployée via **Tauri** et la logique de jeu doit être implémentée en utilisant l'architecture **ECS** (BitECS) (NFR-M01). |

## 3. Portée du Projet (Scope)

### 3.1. Inclusions

*   Développement d'une application desktop hybride (Tauri/Rust/React).
*   Implémentation d'un éditeur 3D WYSIWYG basé sur Babylon.js.
*   Mise en place de l'architecture ECS pour la logique de jeu.
*   Développement du pipeline d'importation FBX/OBJ avec *retargeting* d'animation.
*   Développement du module de Level Design Modulaire.
*   Implémentation du mode de simulation TPS.
*   Fonctionnalités d'exportation GLTF/GLB et de sauvegarde propriétaire (.ZIP).

### 3.2. Exclusions

*   Développement d'un langage de script intégré complexe (la logique de jeu se concentre sur l'ECS et les comportements pré-définis).
*   Support natif pour des plateformes autres que Windows (et Web) au lancement (ex: macOS, Linux, Mobile).
*   Fonctionnalités multijoueurs ou réseau (le projet est strictement *Zero-Server* et local).
*   Création d'assets 3D (les assets sont fournis par l'utilisateur).

## 4. Parties Prenantes Clés

| Rôle | Nom / Entité | Responsabilités Clés |
| :--- | :--- | :--- |
| **Sponsor du Projet** | [Nom du Sponsor/Client] | Fournir les ressources, prendre les décisions majeures, accepter le livrable final. |
| **Chef de Projet** | Manus AI | Gérer l'exécution, le budget, le calendrier, la communication et les risques. |
| **Équipe de Développement** | [Nom de l'Équipe] | Concevoir, coder et tester le logiciel selon les spécifications (SRS, SFD, STD). |
| **Équipe QA** | [Nom de l'Équipe] | Exécuter le Plan de Tests, identifier et suivre les défauts. |
| **Utilisateurs Clés** | Animateurs 3D, Level Designers | Fournir des retours d'expérience, participer aux UAT. |

## 5. Contraintes et Risques de Haut Niveau

### 5.1. Contraintes

| Contrainte | Description | Impact Potentiel |
| :--- | :--- | :--- |
| **Technologique** | Utilisation d'une stack *bleeding edge* (Tauri v2, Babylon.js v7). | Risque d'instabilité ou de manque de documentation pour les nouvelles versions. |
| **Performance** | Exigence stricte de 60 FPS. | Nécessité d'optimisations constantes, notamment pour le rendu 3D et l'ECS. |
| **Ressources** | [Budget et/ou Échéancier] | Nécessité de prioriser les fonctionnalités pour respecter les délais. |

### 5.2. Risques de Haut Niveau

| Risque | Probabilité | Impact | Stratégie d'Atténuation |
| :--- | :--- | :--- | :--- |
| **R-001 : Problèmes d'Importation FBX** | Moyen | Échec de l'intégration des assets 3D, rendant l'outil inutilisable. | Tests unitaires et d'intégration intensifs sur le *crate* Rust d'importation. Utilisation de librairies robustes pour le traitement des formats 3D. |
| **R-002 : Dérive de la Portée (Scope Creep)** | Élevé | Ajout de fonctionnalités non prévues (ex: éditeur de script avancé). | Référence stricte à la portée définie (Section 3.1) et processus de gestion des changements formel. |
| **R-003 : Problèmes de Performance 3D** | Moyen | Non-atteinte de l'objectif 60 FPS dans les scènes complexes. | Revue d'architecture régulière, utilisation du rendu instancié, et profilage constant des performances. |

## 6. Autorisation

Par la signature de ce document, le Sponsor du Projet autorise le Chef de Projet à engager les ressources et à procéder à la planification détaillée et à l'exécution du projet **Darkgame** conformément aux objectifs et à la portée définis ci-dessus.

| Rôle | Nom | Signature | Date |
| :--- | :--- | :--- | :--- |
| **Sponsor du Projet** | [Nom du Sponsor/Client] | | |
| **Chef de Projet** | Manus AI | | 17 Décembre 2025 |

***

## Références

[1] Contenu fourni par l'utilisateur pour la description du projet Darkgame.
[2] Spécifications des Exigences Logiciel (SRS) - Darkgame (Version 1.0).
[3] Spécifications Fonctionnelles Détaillées (SFD) - Darkgame (Version 1.0).
[4] Spécifications Techniques Détaillées (STD) - Darkgame (Version 1.0).
[5] Plan de Tests - Darkgame (Version 1.0).
