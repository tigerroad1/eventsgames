# Spécifications Fonctionnelles Détaillées (SFD) - Darkgame (Révision 1.1)

| Information | Détail |
| :--- | :--- |
| **Nom du Projet** | Darkgame |
| **Version** | 1.1 (Révision Technique) |
| **Date** | 17 Décembre 2025 |
| **Auteur** | Manus AI (Directeur de Projet) |
| **Justification de la Révision** | Mise à jour pour refléter la contrainte d'utiliser des versions technologiques stables et antérieures (détaillée dans le STD v1.1). Le comportement fonctionnel reste inchangé. |

## 1. Introduction

### 1.1. Objectif du Document

(Contenu inchangé par rapport à la v1.0)

### 1.2. Architecture de l'Interface (Maquette Conceptuelle)

(Contenu inchangé par rapport à la v1.0)

## 2. User Stories (Récits Utilisateur)

(Contenu inchangé par rapport à la v1.0)

## 3. Flux Fonctionnels Détaillés

(Contenu inchangé par rapport à la v1.0)

## 4. Règles Métier et Contraintes

| ID | Règle Métier | Description |
| :--- | :--- | :--- |
| **RM-001** | **Architecture ECS** | Toute la logique de jeu doit être gérée par le système **Entity Component System (ECS)** (BitECS). Les entités sont des identifiants, les composants sont des données, et les systèmes sont la logique qui opère sur les composants. |
| **RM-002** | **Zero-Server** | Le logiciel doit fonctionner entièrement en local. Aucune donnée de projet (assets, scènes, logique) ne doit transiter par un serveur distant. |
| **RM-003** | **Gestion des Transitions** | Lors du *Binding* d'animations, le système doit gérer automatiquement les transitions fluides (*cross-fading*) entre les clips pour éviter les saccades visuelles. |
| **RM-004** | **Optimisation du Rendu** | Le module de Level Design Modulaire doit utiliser le **rendu instancié** pour les objets répétitifs (murs, sols) afin de maintenir la performance à 60 FPS. |
| **RM-005** | **Format d'Export** | Le format d'export par défaut pour l'interopérabilité doit être **GLTF/GLB**. Le format propriétaire `.ZIP` doit inclure tous les assets et les données de scène pour une reprise complète. |
| **RM-006** | **Stabilité Technique** | Le développement doit s'appuyer sur les versions technologiques stables et antérieures spécifiées dans le STD v1.1 (Tauri v1.6.0, Babylon.js v6.0.0). |

***

## Références

[1] Contenu fourni par l'utilisateur pour la description du projet Darkgame.
[2] Spécifications des Exigences Logiciel (SRS) - Darkgame (Version 1.1).
[3] Spécifications Techniques Détaillées (STD) - Darkgame (Version 1.1).
