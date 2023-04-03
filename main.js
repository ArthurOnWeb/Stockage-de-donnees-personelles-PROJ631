import { System } from "./System.js";
import { SystemNode } from "./SystemNode.js";
import { User } from "./User.js";
import { Data } from "./Data.js";
import { Node } from "./Node.js";

function main() {
  //code principal

  // INITIALISATION

  const listData = [new Data(0, 40), new Data(1, 25), new Data(2, 25)];
  const listSystemNode = [
    new SystemNode(1, 50, [], [2], [10]),
    new SystemNode(2, 40, [], [1, 3], []),
    new SystemNode(3, 40, [], [2, 4], []),
    new SystemNode(4, 40, [], [3], [20]),
  ];
  const listUser = [new User(10, [0, 1], 1), new User(20, [0, 2], 4)];
  const system = new System(listUser, listSystemNode, listData);
  system.listData = system.sortData();

  //PLACEMENT DES DONNES

  //je créer un dictionnaire afin de faire un bilan des données à placer
  let dataToPlace = new Set(system.listData);
  let wantedCountData = {};
  for (let data of dataToPlace) {
    wantedCountData[data.id] = [0, []];
  }
  for (let user of system.listUser) {
    for (let userDataId of user.dataListInterest) {
      for (let data of dataToPlace) {
        if (data.id == userDataId) {
          wantedCountData[data.id][0] += 1;
          wantedCountData[data.id][1].push(user.id);
        }
      }
    }
  }
  //Une fois le bilan effectué, je place enfin les données
  for (let dataId in wantedCountData) {
    // cas où deux utilisateurs sont interessés
    if (wantedCountData[dataId][0] == 2) {
      let askers = [];
      for (let user of system.listUser) {
        for (let askersId of wantedCountData[dataId][1])
          if (askersId == user.id) {
            askers.push(user);
          }
      }
      for (let data of system.listData) {
        if (data.id == wantedCountData[dataId][0]) {
          let paths = system.dijkstraForTwo(
            askers[0].systemNodeAvailable,
            askers[1].systemNodeAvailable,
            data
          );
          system.addData(data, paths[0][paths[0].length - 1]);
          dataToPlace.delete(data);
        }
      }
    }
    if (wantedCountData[dataId][0] == 1) {
      //cas où un utilisateur veut la donné
      for (let data of system.listData) {
        if (data.id == wantedCountData[dataId][0]) {
          for (let asker of system.listUser) {
            if (asker.id == wantedCountData[dataId][1][0]) {
              let path = system.dijkstra(asker.systemNodeAvailable, data);
              system.addData(data, path[path.length - 1]);
              dataToPlace.delete(data);
            }
          }
        }
      }
    }
  }
  console.log(system.listSystemNode);

  //test 2
  // const listData = [new Data(0, 40)];
  // const listSystemNode = [
  //   new SystemNode(1, 50, [], [2], [10]),
  //   new SystemNode(2, 40, [], [1, 3], []),
  //   new SystemNode(3, 40, [], [2, 4], []),
  //   new SystemNode(4, 40, [], [3], [20]),
  // ];
  // const listUser = [new User(10, [0], 1), new User(20, [0], 4)];
  // const system = new System(listUser, listSystemNode, listData);
  // system.listData = system.sortData();
  // console.log(
  //   system.dijkstraForTwo(
  //     system.listUser[0].systemNodeAvailable,
  //     system.listUser[1].systemNodeAvailable,
  //     system.listData[0]
  //   )
  // );
  //test 3
  // const listData = [new Data(0, 40), new Data(1, 25), new Data(1, 25)];
  // const listSystemNode = [
  //   new SystemNode(1, 50, [0], [10, 2]),
  //   new SystemNode(2, 40, [0], [1, 3]),
  //   new SystemNode(3, 40, [], [2]),
  // ];
  // const listUser = [new User(10, [0, 1], 1)];
  // const system = new System(listUser, listSystemNode, listData);
  // console.log(system.freeMemory(1));
  // console.log(system.freeMemory(2));
}

// Appel de la fonction principale
main();
