import { shortestDistanceNode } from "./helperFunctionsAlgorithms";

/**
 * this function calculates the shortest path between two given 
 * points on a given graph
 */

export const shortestPathAlgorithm = (
  graph: any,
  startNode: any,
  endNode: any
) => {
  console.log("shortestpath wird ausgeführt");
  //in this object we store the last element to be able to create a angle between two lines
  let lastNode = graph[startNode];
      //Object to store all the distances
  let distances: any = {};
  distances[endNode] = graph[endNode];
  distances[endNode].distance = "INFINITY";

   //Adding the childelements of the startnode
  let tempDistances: any = {};
  graph[startNode].edges.forEach((element: any) => {
    tempDistances[element.index] = graph[element.index];
    tempDistances[element.index].distance = 1;
  });

  distances = Object.assign(distances, tempDistances);

        //in this element every predecessor of every node is stored
  let parents: any = { endNode: null };
  graph[startNode].edges.forEach((element: any) => {
    parents[element.index] = startNode;
  });

    //all visited nodes are stored here
  let visited: any[] = [];

  let node = graph[startNode].edges[0].index;

  //as long as we have elements that are not visited we iterate through the while loop
  while (node || node === 0) {
    // find its distance from the start node & its child nodes
    let distance = distances[node].distance;
    let children = graph[node].edges;

    // for each of those child nodes
    for (let i = 0; i < children.length; i++) {
      // make sure each child node is not the start node
      if (
        String(children[i].index) === String(startNode) ||
        (lastNode && children[i].index === lastNode.index)
      ) {
        continue;
      } else {
        // save the distance from the start node to the child node
        let addedValue: number | undefined = Math.round(calculateDistance(
          lastNode.x,
          lastNode.y,
          graph[node].x,
          graph[node].y
        )/10);

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

    // move the node to the visited set
    visited.push(node);

    // move to the nearest neighbor node
    node = shortestDistanceNode(distances, visited);
    lastNode = graph[parents[node]];
  }

   //after the distance calculation are finished we restore the way the algorithm has taken
  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent || parent === 0) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  //reverse the order of the array to have the right route from the startnode
  shortestPath.reverse();

  // return the shortest path from start node to end node & its distance
  let results = {
    distance: distances[endNode].distance,
    path: shortestPath,
  };

  return results;
};

/**
 * this function calculates with the help of the pythagoras the length of the hypothenuse
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
