import { Data } from "./Data.js";
import { Node } from "./Node.js";

/**
 * Nœud du système capable de stocker des données et relié à d'autres nœuds.
 */
export class SystemNode extends Node {
  constructor(
    id,
    memory,
    dataListLocal,
    dataListAvailable,
    dataListAvailableUser
  ) {
    super(id); // un entier unique
    this.memory = memory; // un entier
    this.dataListLocal = dataListLocal; // Une liste d’id (données)
    this.dataListAvailable = dataListAvailable; // Une liste d’id (noeud système/Utilisateur)
  }
}
