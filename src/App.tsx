import './App.scss';
import { useState } from 'react';
import Canvas from './Canvas';
import { createCircle, createLine } from "./utils";

let testValues = [{
  index: 1,
  x: 450,
  y: 50,
  edges: [{
    index: 2,
    x: 550,
    y: 370,
    marked: true
  }, {
    index: 4,
    x: 250,
    y: 350,
    marked: true
  }]

},
{
  index: 2,
  x: 550,
  y: 370
  ,
  edges: [{
    index: 5,
    x: 350,
    y: 550,
    marked: false
  },
  {
    index: 7,
    x: 850,
    y: 650,
    marked: true
  }
  ]
},
{
  index: 3,
  x: 850,
  y: 200,
  edges: [{
    index: 1,
    x: 450,
    y: 50,
    marked: false
  }, {
    index: 5,
    x: 570,
    y: 750,
    marked: false
  }]
},
{
  index: 4,
  x: 250,
  y: 350,
  edges: []
}
  ,
{
  index: 5,
  x: 350,
  y: 550,
  edges: []
}
  ,
{
  index: 6,
  x: 570,
  y: 750,
  edges: []
}
  ,
{
  index: 7,
  x: 850,
  y: 650,
  edges: [
    {
      index: 5,
      x: 570,
      y: 750,
      marked: false
    }
  ]
}

]


function App() {
  const [circleArray, seCircleArray] = useState<any[]>(testValues);

  let node1 = {x: 414, y: 273}; 
  let node2 = {x: 426, y: 357}; 
  let node3 = {x: 225, y: 424}; 

  const drawExample = (context: CanvasRenderingContext2D) => {
    circleArray.forEach((element: any) => {
      element.edges.forEach((edge: any) => {
        createLine(element.x, element.y, edge.x, edge.y, context, edge.marked)
      })
      createCircle(element.index, element.x, element.y, context)
    })
  }

  

  const calculateAngle = (previousNode: any, actualNode: any, potentialNode: any) => {
    let vector1 = {x: previousNode.x - actualNode.x, y: previousNode.y-actualNode.y}
    let vector2 = {x: potentialNode.x - actualNode.x, y: potentialNode.y-actualNode.y}
    let skalarResult = (vector1.x) * (vector2.x) + (vector1.y)*(vector2.y);    
    let equa1 = vector1.x *vector1.x + vector1.y * vector1.y
    let equa2 = vector2.x *vector2.x + vector2.y * vector2.y
    let equa3 = Math.sqrt(equa1*equa2);
    console.log( "hier dein Winkel: ",Math.acos(skalarResult/equa3) *( 180 / Math.PI ));
  }


  return (
    <div className="App">
      <h1>Test</h1>
      <Canvas draw={drawExample} width={window.innerWidth} height={900} />
      <button onClick={()=>calculateAngle(node1, node2, node3)}>test</button>
    </div>
  );
}

export default App;
