import { shortestDistanceNode } from "./helperFunctionsAlgorithms";

/**
 * this function calculates the shortest path between two given 
 * points on a given graph
 * @param graph 
 * @param startNode 
 * @param endNode 
 * @returns 
 */

export const shortestPathAlgorithm = (
  graph: any,
  startNode: any,
  endNode: any
) => {
  console.log("shortestpath wird ausgeführt");
  let lastNode = graph[startNode];
  let distances: any = {};
  distances[endNode] = graph[endNode];
  distances[endNode].distance = "INFINITY";

  let tempDistances: any = {};
  graph[startNode].edges.forEach((element: any) => {
    tempDistances[element.index] = graph[element.index];
    tempDistances[element.index].distance = 1;
  });

  distances = Object.assign(distances, tempDistances);

  let parents: any = { endNode: null };
  graph[startNode].edges.forEach((element: any) => {
    parents[element.index] = startNode;
  });

  let visited: any[] = [];

  let node = graph[startNode].edges[0].index;

  //for that node
  while (node || node === 0) {
    // find its distance from the start node & its child nodes
    let distance = distances[node].distance;
    let children = graph[node].edges;
    // for each of those child node

    for (let i = 0; i < children.length; i++) {
      if (
        String(children[i].index) === String(startNode) ||
        (lastNode && children[i].index === lastNode.index)
      ) {
        continue;
      } else {
        // save the distance from the start node to the child node

        let addedValue: number | undefined = calculateDistance(
          lastNode.x,
          lastNode.y,
          graph[node].x,
          graph[node].y
        );

        let newdistance = distance + addedValue;

        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        // save the distance to the object
        // record the path
        if (
          !distances[children[i].index] ||
          distances[children[i].index].distance > newdistance ||
          distances[children[i].index].distance === "INFINITY"
        ) {
          distances[children[i].index] = graph[children[i].index];
          distances[children[i].index].distance = newdistance;
          parents[children[i].index] = node;
        }
      }
    }
    // make sure each child node is not the start node

    // move the node to the visited set
    visited.push(node);

    // move to the nearest neighbor node
    node = shortestDistanceNode(distances, visited);
    lastNode = graph[parents[node]];
  }

  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent || parent === 0) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  // return the shortest path from start node to end node & its distance
  let results = {
    distance: distances[endNode].distance,
    path: shortestPath,
  };

  return results;
};

/**
 * this function finds from the distancesobject the smallest element

 */


const calculateDistance = (
  actualNodeX: any,
  actualNodeY: any,
  potentialNodeX: any,
  potentialNodeY: any
) => {
  let xDelta = actualNodeX - potentialNodeX;
  let yDelta = actualNodeY - potentialNodeY;
  let result = Math.sqrt(xDelta * xDelta + yDelta * yDelta);
  return result;
};
