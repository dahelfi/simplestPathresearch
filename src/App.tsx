import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import './App.scss';
import { useState } from 'react';
import Canvas from './Canvas';
import { createCircle, createLine } from "./utils";
import {findShortestPath,  shortestDistanceNode} from "./algorithmNormal";
import {findShortestPathModified} from "./algorithm";
import {graph, graphmodified} from "./graph"
import { colorShortestPath } from './algorithmExplanation';
import {clausthalGraph} from "./claustalGraph"
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { createArray } from './dropdownData';
import {testDataCTGraph} from "./testdataCTGraph"



function App() {
  const [circleArray, seCircleArray] = useState<any>(clausthalGraph);
  const [destinationNode, setDestinationNode] = useState<any>(null);
  const [startNode, setStartNode] = useState<any>(null);

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

console.log("hier deine startnode: ", startNode);
console.log("hier deine endnode: ", destinationNode);

  
  let temp = findShortestPathModified(clausthalGraph, parseInt(startNode), parseInt(destinationNode));
  console.log("her dein result:  ", temp);
  

  seCircleArray( {... colorShortestPath(clausthalGraph, temp.path)});
}

  return (
    <div className="App">
      <div className='controlContainer'>
      <h1>Simplest Path Algorithm</h1>
      <Button onClick={runCode1}>Show Route</Button>
      <Dropdown value={startNode}  optionValue="code" options={createArray()} onChange={(e) => setStartNode(e.value)} optionLabel="name" placeholder="Startnode" />
    <Dropdown optionLabel="name" optionValue="code" value={destinationNode} options={createArray()} onChange={(e) => setDestinationNode(e.value)} placeholder="Destinationnode"/>
      </div>

   
      <Canvas draw={drawExample} width={1800} height={1050} data={circleArray} />
 

    </div>
  );
}

export default App;
