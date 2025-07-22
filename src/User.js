import { Data } from "./Data.js";
import { Node } from "./Node.js";
import { SystemNode } from "./SystemNode.js";

/**
 * Représente un utilisateur relié à un nœud système et ayant des données d'intérêt.
 */
export class User extends Node {
  constructor(id, dataListInterest, systemNodeAvailable) {
    super(id); //Un entier unique
    this.dataListInterest = dataListInterest; // Une liste d’id (données)
    this.systemNodeAvailable = systemNodeAvailable; // Un id (noeud système)
  }
}
