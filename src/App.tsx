import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import './App.scss';
import { useState } from 'react';
import Canvas from './Canvas';
import { createCircle, createLine, colorShortestPath, createArray  } from "./utils";
import {simplestPathAlgorithm} from "./simplestPathAlgorithm";
import {clausthalGraph} from "./claustalGraph"
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';



function App() {
  let test: any = clausthalGraph;
  const [circleArray, setCircleArray] = useState<any>(test);
  const [destinationNode, setDestinationNode] = useState<any>(null);
  const [startNode, setStartNode] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [errormessage, setErrorMessage] = useState<string>("");
  const [distance, setDistance] = useState<number |undefined>(undefined);

  const drawExample = (context: CanvasRenderingContext2D) => {

    for(let element in circleArray){
      let content = circleArray[element];
      for (let edge in content.edges){
        createLine(circleArray[element].x, circleArray[element].y, content.edges[edge].x, content.edges[edge].y, context, content.edges[edge].marked)
       
        createCircle(circleArray[element].index, circleArray[element].x, circleArray[element].y, context)

      }
      
    }
  }
  const onHide =()=>{
    setVisible(false);
  }
const findSimplestPath= ()=>{
test = clausthalGraph;
 
if(startNode === null || destinationNode === null){
  setErrorMessage("Please select both nodes");
  setVisible(true);
}else if(startNode === destinationNode){
  setErrorMessage("Please select not the same start and destination node");
  setVisible(true);
}else{
  let temp = simplestPathAlgorithm(test, parseInt(startNode), parseInt(destinationNode))
  console.log("hier dein object: ", temp);
  
  setCircleArray({... colorShortestPath(test, temp.path)});
  setDistance(temp.distance);
}
}

  return (
    <div className="App">
      <div className='controlContainer'>
      <h1 style={{marginRight: "16px"}}>Simplest Path Algorithm</h1>
      {distance ?  <h1>Distance:{distance}</h1>: null}
      <Button style={{margin: "0px 16px 0px 16px"}} onClick={findSimplestPath}>Show Route</Button>
      <Dropdown style={{width: "200px"}} value={startNode}  optionValue="code" options={createArray()} onChange={(e) => setStartNode(e.value)} optionLabel="name" placeholder="Startnode" />
    <Dropdown style={{width: "200px"}} optionLabel="name" optionValue="code" value={destinationNode} options={createArray()} onChange={(e) => setDestinationNode(e.value)} placeholder="Destinationnode"/>
      </div>
      <Canvas draw={drawExample} width={1800} height={1050} data={circleArray} />
      <Dialog header="ERROR" visible={visible} style={{width: '30vw'}}  onHide={onHide}>
      {errormessage}
      </Dialog>
    </div>
  );
}

export default App;
