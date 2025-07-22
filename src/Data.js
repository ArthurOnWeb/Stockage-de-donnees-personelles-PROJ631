/**
 * Donnée stockable dans le système avec un identifiant et une taille.
 */
export class Data {
  constructor(id, taille) {
    this.id = id; // Un entier unique
    this.taille = taille; // Taille en Mo
  }
}

