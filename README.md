# Stockage de données personnelles (PROJ631)

Ce projet implémente une simulation simplifiée de placement de données dans un réseau de nœuds à l'aide d'un algorithme de type Dijkstra. Chaque "utilisateur" possède des données d'intérêt et est relié à un nœud système. L'objectif du programme est de placer les données sur les nœuds en tenant compte de la distance et de l'espace mémoire disponible.

## Structure du code

- `src/Data.js` – représentation d'une donnée (identifiant et taille)
- `src/Node.js` – classe de base pour les nœuds
- `src/SystemNode.js` – nœud du système contenant de la mémoire et les connexions vers d'autres nœuds
- `src/User.js` – nœud utilisateur avec les données souhaitées
- `src/System.js` – logique principale (tri des données, recherche du nœud libre le plus proche, algorithme de Dijkstra)
- `src/main.js` – script d'exemple qui instancie les objets et lance l'algorithme

## Prérequis

- [Node.js](https://nodejs.org/) (version 14 ou ultérieure)

Aucune dépendance externe n'est requise : le dossier `node_modules` est vide.

## Utilisation

1. Cloner le dépôt
2. Lancer le script principal

```bash
npm start
```

Pour lancer la suite de tests :

```bash
npm test
```

Le programme affiche dans la console l'état final des nœuds système après placement des données.

## Auteurs

Ce dépôt a été réalisé dans le cadre du module PROJ631. Auteur principal : **Arthur Rattanavong**.
