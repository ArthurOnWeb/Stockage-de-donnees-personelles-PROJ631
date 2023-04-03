import { Data } from "./Data.js";
import { Node } from "./Node.js";
import { SystemNode } from "./SystemNode.js";

export class User extends Node {
  constructor(id, dataListInterest, systemNodeAvailable) {
    super(id); //Un entier unique
    this.dataListInterest = dataListInterest; // Une liste d’id (données)
    this.systemNodeAvailable = systemNodeAvailable; // Un id (noeud système)
  }
}
