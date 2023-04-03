import { Data } from "./Data.js";
import { User } from "./User.js";
import { SystemNode } from "./SystemNode.js";
import { Node } from "./Node.js";

export class System {
  // classe qui a conaissance de tout le système
  constructor(listUser, listSystemNode, listData) {
    this.listUser = listUser;
    this.listSystemNode = listSystemNode;
    this.listData = listData;
  }
  placeData() {
    //méthode qui permet de placer les données dans le système
    //On parcourt la liste des données
    for (let h = 0; h < this.listData.length; h++) {
      let data = this.listData[h];
      //On parcourt la liste des utilisateurs
      for (let i = 0; i < this.listeUser.length; i++) {
        let utilisateurCourant = this.listUser[i];
        //on parcours la liste des données qui interessent l'utilisateur
        for (let j = 0; j < utilisateurCourant.dataListInterest.length; j++) {
          let dataInterest = utilisateurCourant.dataListInterest[j];
          if (dataInterest == data) {
            //si il est interesse, on cherche le noeud libre le plus proche de l'utilisateur
          }
        }
      }
    }
  }
  sortData() {
    //a method to sort the list of Data by id
    //il reste à supprimer les noeuds une fois exploré
    this.listData.sort((a, b) => a.id - b.id);
    return this.listData;
  }
  freeMemory(idSystemNode) {
    //return the free space of a Node
    for (let i = 0; i < this.listSystemNode.length; i++) {
      if (this.listSystemNode[i].id == idSystemNode) {
        var systemNode = this.listSystemNode[i];
      }
    }
    var occupied = 0;
    for (let i = 0; i < systemNode.dataListLocal.length; i++) {
      for (let j = 0; j < this.listData.length; j++) {
        if (this.listData[j].id == systemNode.dataListLocal[i]) {
          occupied += this.listData[j].taille;
        }
      }
    }
    return systemNode.memory - occupied;
  }
  dijkstra(closestSystemNodeId, dataToPlace) {
    //fonction qui permet de mettre en place l'algorithme de dijkstra afin de renvoyer le chemin vers le noeud le plus proche, elle prend en entrée le l'id du noeud le plus proche de l'utilisateur ainsi que la donnée à placer
    // la fonction prend en entrée la liste des Id des noeuds les plus proches ainsi que la donnée à placer

    //on va stocker les distances minimales dans un dictionnaire
    let distances = {};
    let previous = {};
    //les noeuds à visiter sont les noeuds systemes
    let unvisitedNodes = new Set(this.listSystemNode);

    //on assigne une distance et un noeud précédent à tous les noeuds
    for (let node of this.listSystemNode) {
      distances[node.id] = Infinity;
      previous[node.id] = null;
    }

    //le noeud le plus proche au départ a la distance la plus petite, rappel : un noeud utilisateur est lié directement à un seul noeud système
    distances[closestSystemNodeId] = 0;

    while (unvisitedNodes.size > 0) {
      // on visite tous les noeuds systèmes

      //on va travailler sur le prochain noeud le plus proche
      let currentNodeId = this.getClosestNode(distances, unvisitedNodes);
      //on veut les noeuds liés au noeud courant

      for (let systemNodes of this.listSystemNode) {
        if (systemNodes.id == currentNodeId) {
          let currentNode = systemNodes;
          //on enleve le noeud courant de la liste des noeuds à visiter
          unvisitedNodes.delete(currentNode);
          //on parcourt les Id des voisins
          for (let neighborId of currentNode.dataListAvailable) {
            //on calcule la distance entre le voisin et le point de départ
            let newDistance = distances[currentNodeId] + 1;
            // si la distance obtenue est plus faible, on modifie la distance du noeud voisin
            if (newDistance < distances[neighborId]) {
              distances[neighborId] = newDistance;
              previous[neighborId] = currentNodeId;
            }
          }
        }
      }
    }

    //une fois toutes les distances obtenues, il faut trouver le noeud le plus proche
    let closestFreeNodeId = this.getClosestFreeNode(
      distances,
      dataToPlace.taille
    );
    return this.reconstructPath(previous, closestFreeNodeId);
  }

  getClosestNode(distances, unvisitedNodes) {
    //fonction qui permet de renvoyer le noeud le plus proche sans se soucier de l'espace libre
    let minDistance = Infinity;
    let closestNode = null;
    // on s'intéresse à la distance des noeuds non visités afin de choisir le plus proche
    for (let node of unvisitedNodes) {
      if (distances[node.id] < minDistance) {
        minDistance = distances[node.id];
        closestNode = node.id;
      }
    }

    return closestNode;
  }

  getClosestFreeNode(distances, dataSize) {
    // fonction qui permet de renvoyer le noeud libre le plus proche
    let minDistance = Infinity;
    let closestFreeNode = null;

    for (let nodeId in distances) {
      if (
        this.freeMemory(nodeId) - dataSize >= 0 &&
        distances[nodeId] < minDistance
      ) {
        minDistance = distances[nodeId];
        closestFreeNode = nodeId;
      }
    }

    return closestFreeNode;
  }

  reconstructPath(previous, destination) {
    // fonction qui renvoie le chemin vers le noeud le plus proche sous forme de liste
    let path = [];
    let currentNode = destination;

    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = previous[currentNode];
    }

    return path;
  }
  addData(data, systemNodeId) {
    for (let systemNode of this.listSystemNode) {
      if (systemNode.id == systemNodeId) {
        systemNode.dataListLocal.push(data.id);
      }
    }
  }
  dijkstraForTwo(
    closestSystemNodeIdUser1,
    closestSystemNodeIdUser2,
    dataToPlace
  ) {
    //fonction qui permet de mettre en place l'algorithme de dijkstra afin de renvoyer le chemin vers le noeud le plus proche, elle prend en entrée le l'id du noeud le plus proche de l'utilisateur ainsi que la donnée à placer
    // la fonction prend en entrée la liste des Id des noeuds les plus proches ainsi que la donnée à placer

    //on va stocker les distances minimales dans un dictionnaire
    let distancesUser1 = {};
    let previousUser1 = {};
    //les noeuds à visiter sont les noeuds systemes
    let unvisitedNodesUser1 = new Set(this.listSystemNode);

    //on assigne une distance et un noeud précédent à tous les noeuds
    for (let node of this.listSystemNode) {
      distancesUser1[node.id] = Infinity;
      previousUser1[node.id] = null;
    }

    //le noeud le plus proche au départ a la distance la plus petite, rappel : un noeud utilisateur est lié directement à un seul noeud système
    distancesUser1[closestSystemNodeIdUser1] = 0;

    while (unvisitedNodesUser1.size > 0) {
      // on visite tous les noeuds systèmes

      //on va travailler sur le prochain noeud le plus proche
      let currentNodeId = this.getClosestNode(
        distancesUser1,
        unvisitedNodesUser1
      );
      //on veut les noeuds liés au noeud courant

      for (let systemNodes of this.listSystemNode) {
        if (systemNodes.id == currentNodeId) {
          let currentNode = systemNodes;
          //on enleve le noeud courant de la liste des noeuds à visiter
          unvisitedNodesUser1.delete(currentNode);
          //on parcourt les Id des voisins
          for (let neighborId of currentNode.dataListAvailable) {
            //on calcule la distance entre le voisin et le point de départ
            let newDistance = distancesUser1[currentNodeId] + 1;
            // si la distance obtenue est plus faible, on modifie la distance du noeud voisin
            if (newDistance < distancesUser1[neighborId]) {
              distancesUser1[neighborId] = newDistance;
              previousUser1[neighborId] = currentNodeId;
            }
          }
        }
      }
    }

    //on va stocker les distances minimales dans un dictionnaire
    let distancesUser2 = {};
    let previousUser2 = {};
    //les noeuds à visiter sont les noeuds systemes
    let unvisitedNodesUser2 = new Set(this.listSystemNode);

    //on assigne une distance et un noeud précédent à tous les noeuds
    for (let node of this.listSystemNode) {
      distancesUser2[node.id] = Infinity;
      previousUser2[node.id] = null;
    }

    //le noeud le plus proche au départ a la distance la plus petite, rappel : un noeud utilisateur est lié directement à un seul noeud système
    distancesUser2[closestSystemNodeIdUser2] = 0;

    while (unvisitedNodesUser2.size > 0) {
      // on visite tous les noeuds systèmes

      //on va travailler sur le prochain noeud le plus proche
      let currentNodeId = this.getClosestNode(
        distancesUser2,
        unvisitedNodesUser2
      );
      //on veut les noeuds liés au noeud courant

      for (let systemNodes of this.listSystemNode) {
        if (systemNodes.id == currentNodeId) {
          let currentNode = systemNodes;
          //on enleve le noeud courant de la liste des noeuds à visiter
          unvisitedNodesUser2.delete(currentNode);
          //on parcourt les Id des voisins
          for (let neighborId of currentNode.dataListAvailable) {
            //on calcule la distance entre le voisin et le point de départ
            let newDistance = distancesUser2[currentNodeId] + 1;
            // si la distance obtenue est plus faible, on modifie la distance du noeud voisin
            if (newDistance < distancesUser2[neighborId]) {
              distancesUser2[neighborId] = newDistance;
              previousUser2[neighborId] = currentNodeId;
            }
          }
        }
      }
    }

    // une fois toutes les distances obtenues, il faut trouver quel est le noeud qui est le plus proche des deux noeuds
    let closestFreeNodeId = this.getClosestFreeNodeForTwo(
      distancesUser1,
      distancesUser2,
      dataToPlace.taille
    );
    return [
      this.reconstructPath(previousUser1, closestFreeNodeId),
      this.reconstructPath(previousUser2, closestFreeNodeId),
    ];
  }

  getClosestFreeNodeForTwo(distancesUser1, distancesUser2, dataSize) {
    // fonction qui permet de renvoyer le noeud libre le plus proche
    let maxDistance = 0;
    let minDistance = Infinity;
    let closestFreeNode = null;

    while (closestFreeNode == null) {
      //je cherche d'abord des valeurs minimales qui satisfassent les deux utilisateurs
      for (let nodeId in distancesUser1) {
        let reachableUser1 = false;
        let reachableUser2 = false;
        if (
          this.freeMemory(nodeId) - dataSize >= 0 &&
          distancesUser1[nodeId] < maxDistance
        ) {
          reachableUser1 = true;
        }
        if (
          this.freeMemory(nodeId) - dataSize >= 0 &&
          distancesUser2[nodeId] < maxDistance
        ) {
          reachableUser2 = true;
        }
        if (reachableUser1 == true && reachableUser2 == true) {
          minDistance = maxDistance;
        }
      }
      //une fois qu'on a trouvé la distance minimale requise, on cherche le chemin qui donne la somme des distances la plus courte
      if (minDistance != Infinity && minDistance != Infinity) {
        let sommeDistances = {};
        for (let nodeId in distancesUser1) {
          if (
            this.freeMemory(nodeId) - dataSize >= 0 &&
            distancesUser1[nodeId] < minDistance &&
            distancesUser2[nodeId] < minDistance
          ) {
            sommeDistances[nodeId] = [
              nodeId,
              distancesUser1[nodeId] + distancesUser2[nodeId],
            ];
          }
        }
        let minDistanceTotal = 2 * minDistance;
        for (let nodeId in sommeDistances) {
          if (sommeDistances[nodeId][1] <= minDistanceTotal) {
            minDistanceTotal = sommeDistances[nodeId][1];
            closestFreeNode = nodeId;
          }
        }
      }
      maxDistance += 1;
    }
    return closestFreeNode;
  }
}
