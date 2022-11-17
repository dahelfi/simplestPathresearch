import './App.scss';
import { useState } from 'react';
import Canvas from './Canvas';
import { createCircle, createLine } from "./utils";
import {findShortestPath,  shortestDistanceNode} from "./algorithmNormal";
import {findShortestPathModified} from "./algorithm";
import {testValues} from "./data";
import {graph, graphmodified} from "./graph"
import { colorShortestPath } from './algorithmExplanation';
import {clausthalGraph} from "./claustalGraph"



function App() {
  const [circleArray, seCircleArray] = useState<any>(clausthalGraph);

  const drawExample = (context: CanvasRenderingContext2D) => {

    for(let element in circleArray){
      let content = circleArray[element];
      for (let edge in content.edges){
        createLine(circleArray[element].x, circleArray[element].y, content.edges[edge].x, content.edges[edge].y, context, content.edges[edge].marked)
       
        createCircle(circleArray[element].index, circleArray[element].x, circleArray[element].y, context)

      }
      
    }
  }


function runCode1(){

  
  let temp = findShortestPathModified(graphmodified, "8", "1");

  seCircleArray( {... colorShortestPath(graphmodified, temp.path)});
}

  return (
    <div className="App">
      <div className='controlContainer'>
      <h1>Simplest Path Algorithm</h1>
      <button onClick={runCode1}>Search</button>
      </div>

   
      <Canvas draw={drawExample} width={1800} height={1050} data={circleArray} />
 

    </div>
  );
}

export default App;
