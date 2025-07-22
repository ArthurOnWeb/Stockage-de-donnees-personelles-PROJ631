# Stockage de données personnelles (PROJ631)

Ce projet implémente une simulation simplifiée de placement de données dans un réseau de nœuds à l'aide d'un algorithme de type Dijkstra. Chaque "utilisateur" possède des données d'intérêt et est relié à un nœud système. L'objectif du programme est de placer les données sur les nœuds en tenant compte de la distance et de l'espace mémoire disponible.

```
 [U10]
   |
 (1) -- (2) -- (3) -- (4)
                          |
                        [U20]
```

Schéma simplifié du réseau utilisé dans l'exemple : les utilisateurs U10 et U20 sont reliés aux nœuds système 1 et 4.

## Structure du code

- `src/Data.js` – représentation d'une donnée (identifiant et taille)
- `src/Node.js` – classe de base pour les nœuds
- `src/SystemNode.js` – nœud du système contenant de la mémoire et les connexions vers d'autres nœuds
- `src/User.js` – nœud utilisateur avec les données souhaitées
- `src/System.js` – logique principale (tri des données, recherche du nœud libre le plus proche, algorithme de Dijkstra)
- `scripts/main.js` – script d'exemple qui instancie les objets et lance l'algorithme

## Algorithme

1. Les données sont triées par identifiant pour assurer un ordre de traitement déterministe.
2. Pour chaque donnée, le programme compte le nombre d'utilisateurs intéressés.
3. Si deux utilisateurs demandent la même donnée, `dijkstraForTwo` calcule le nœud libre le plus proche pour les deux chemins.
4. Si un seul utilisateur est concerné, `dijkstra` recherche le nœud libre le plus proche de son point d'accès.
5. Une fois le nœud trouvé, la donnée est ajoutée avec `addData` et la mémoire occupée est mise à jour.

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

## Exemples de sortie

Exécution du script principal :

```bash
$ npm start
[
  SystemNode {
    id: 1,
    memory: 50,
    dataListLocal: [ 1 ],
    dataListAvailable: [ 2 ]
  },
  SystemNode {
    id: 2,
    memory: 40,
    dataListLocal: [],
    dataListAvailable: [ 1, 3 ]
  },
  SystemNode {
    id: 3,
    memory: 40,
    dataListLocal: [ 2 ],
    dataListAvailable: [ 2, 4 ]
  },
  SystemNode {
    id: 4,
    memory: 40,
    dataListLocal: [ 1 ],
    dataListAvailable: [ 3 ]
  }
]
```

## Auteurs

Ce dépôt a été réalisé dans le cadre du module PROJ631. Auteur principal : **Arthur Rattanavong**.

## Licence

Ce projet est distribué sous la licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
