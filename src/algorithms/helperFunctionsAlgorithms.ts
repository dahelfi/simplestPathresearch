export const shortestDistanceNode = (distances: any, visited: any) => {
    let shortest = null;
    for (let node in distances) {
      if (distances[node].distance === "INFINITY") {
        continue;
      }
      let currentIsShortest =
        shortest === null ||
        distances[node].distance < distances[shortest].distance;
      if (currentIsShortest && !visited.includes(distances[node].index)) {
        shortest = parseInt(node, 10);
      }
    }
    return shortest;
  };
  
  export const calculateAngle = (
    previousNodeX: any,
    previousNodeY: any,
    actualNodeX: any,
    actualNodeY: any,
    potentialNodeX: any,
    potentialNodeY: any
  ) => {
    let vector1 = {
      x: previousNodeX - actualNodeX,
      y: previousNodeY - actualNodeY,
    };
    let vector2 = {
      x: potentialNodeX - actualNodeX,
      y: potentialNodeY - actualNodeY,
    };
    let skalarResult = vector1.x * vector2.x + vector1.y * vector2.y;
    let equa1 = vector1.x * vector1.x + vector1.y * vector1.y;
    let equa2 = vector2.x * vector2.x + vector2.y * vector2.y;
    let equa3 = Math.sqrt(equa1 * equa2);
    let result = Math.acos(skalarResult / equa3) * (180 / Math.PI);
    if (result < 0) {
      result = result * -1;
    }
    
    
    return result;
  };
  