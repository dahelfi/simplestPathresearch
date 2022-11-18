export const findShortestPathModified = (graph: any, startNode: any, endNode: any) => {
    let lastNode = graph[startNode];
    let distances: any = {};
    distances[endNode] = graph[endNode];
    distances[endNode].distance = "INFINITY";
    console.log("geh rein");
    
    
    let tempDistances: any = {}
   graph[startNode].edges.forEach((element: any)=>{
        tempDistances[element.index] = graph[element.index];
        tempDistances[element.index].distance = 1; 
   })

   distances = Object.assign(distances, tempDistances);

   

    let parents: any = { endNode: null };
   graph[startNode].edges.forEach((element: any)=>{
        parents[element.index] = startNode;
   })
   
    let visited: any[] = [];

    let node = graph[startNode].edges[0].index;
    
    //for that node
	while (node || node === 0) {
		// find its distance from the start node & its child nodes
		let distance = distances[node].distance;
		let children = graph[node].edges;
		// for each of those child nodes
        console.log("dein node ist: ", node);
        
        for (let i = 0; i < children.length; i++) {
            console.log("dein lastnode ist: ", lastNode);
            console.log("children.index: ", children[i].index);
            if (String(children[i].index) === String(startNode) || lastNode && children[i].index === lastNode.index) {
				continue;
			} else {
				// save the distance from the start node to the child node
				let newdistance = distance + calculateValue(lastNode.x, lastNode.y, graph[node].x, graph[node].y, children[i].x, children[i].y, children.length );
				// if there's no recorded distance from the start node to the child node in the distances object
				// or if the recorded distance is shorter than the previously stored distance from the start node to the child node
				// save the distance to the object
				// record the path
				if (!distances[children[i].index] || distances[children[i].index].distance > newdistance || distances[children[i].index].distance === "INFINITY") {
                    distances[children[i].index] = graph[children[i].index]
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
	while (parent) {
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

    export const shortestDistanceNode = (distances: any, visited: any) => {
        let shortest = null;
        for (let node in distances){
            let currentIsShortest = shortest === null || distances[node].distance < distances[shortest].distance;
            if (currentIsShortest && !visited.includes(distances[node].index)) {
                shortest = parseInt(node, 10);
            }
        }
        return shortest;
    };

    const calculateValue = (previousNodeX: any, previousNodeY: any,  actualNodeX: any, actualNodeY: any,potentialNodeX: any, potentialNodeY: any, numberOfEdges: number)=>{
        let angle = calculateAngle(previousNodeX, previousNodeY, actualNodeX, actualNodeY,  potentialNodeX, potentialNodeY);
        
        if(angle < 30 || angle > 150){
            return 1;
        }else if(numberOfEdges === 2 && (angle < 150 || angle > 30)){
            return 4;
        }else if(numberOfEdges === 3 && (angle < 150 || angle > 30)){
            return 6;
        }else if(numberOfEdges === 3 || numberOfEdges === 4 && (angle > 30 && angle < 150)){
            if(angle < 50 ){
                return 9;
            }else if(angle > 50 && angle < 70 ){
                return 8;
            }else if(angle < 70 && angle > 80 ){
                return 7;
            }else if(80 < angle && angle< 100){
                return 6;
            }
        }
    }


    const calculateAngle = (previousNodeX: any, previousNodeY: any,  actualNodeX: any, actualNodeY: any,potentialNodeX: any, potentialNodeY: any,) => {
        let vector1 = {x: previousNodeX - actualNodeX, y: previousNodeY-actualNodeY}
        let vector2 = {x: potentialNodeX - actualNodeX, y: potentialNodeY-actualNodeY}
        let skalarResult = (vector1.x) * (vector2.x) + (vector1.y)*(vector2.y);    
        let equa1 = vector1.x *vector1.x + vector1.y * vector1.y
        let equa2 = vector2.x *vector2.x + vector2.y * vector2.y
        let equa3 = Math.sqrt(equa1*equa2);
        let result = Math.acos(skalarResult/equa3) *( 180 / Math.PI );
        if(result < 0){
            result = result * (-1);
        }
        return result;
      }
    
  