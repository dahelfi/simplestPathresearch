import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import "./App.scss";
import { useState } from "react";
import Canvas from "./Canvas";
import {
  createCircle,
  createLine,
  colorShortestPath,
  createArray,
} from "./helperFunctions";
import { simplestPathAlgorithm } from "./algorithms/simplestPathAlgorithm";
import { shortestPathAlgorithm } from "./algorithms/shortestPathAlgorithm";
import { simplestCustomPathAlgorithm} from "./algorithms/customPathAlgorithm";
import { clausthalGraph } from "./GraphDataStructure/claustalGraphDataStructure";
import { windowTestGraph } from "./GraphDataStructure/windowTestGraph";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { SelectButton } from 'primereact/selectbutton';

function App() {
  const [circleArray, setCircleArray] = useState<any>(clausthalGraph);
  const [destinationNode, setDestinationNode] = useState<any>(null);
  const [startNode, setStartNode] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(true);
  const [simplestAlgorithm, setSimplestAlgorithm] = useState<string>("simplest");
  const options = ['simplest', 'shortest', 'custom'];
  let stringValue = "";
  const [message, setMessage] = useState<string>(
    "For better userexperience use a full hd resolution screen and press the F11 key for a full screen view. Retreat by repressing F11."
  );
  const [headerMessage, setHeaderMessage] = useState<string>("Information");
  const [distance, setDistance] = useState<number | undefined>(undefined);

  /**
   * this function calculates if there already exist a red line to prevent that the grey line covers the red one
   * @param context 
   */
  const checkIfColorLineAlreadyExist = (
    elementIndex: number,
    edgeIndex: number
  ) => {
    let element = circleArray[elementIndex];
    let returnValue: boolean = false;

    element.edges.forEach((edge: any) => {
      if (edge.index === edgeIndex && edge.marked === true) {
        returnValue = true;
      }
    });
    return returnValue;
  };

  /**
   * this function renders the whole graph on the canvas
   * @param context 
   */
  const drawGraph = (context: CanvasRenderingContext2D) => {
    for (let element in circleArray) {
      let content = circleArray[element];
      for (let edge in content.edges) {
        createLine(
          circleArray[element].x,
          circleArray[element].y,
          content.edges[edge].x,
          content.edges[edge].y,
          context,
          content.edges[edge].marked,
          checkIfColorLineAlreadyExist(content.edges[edge].index, content.index)
        );
        createCircle(
          circleArray[element].index,
          circleArray[element].x,
          circleArray[element].y,
          context
        );
      }
    }
  };

  /**
   * function to hide the dialog
   */
  const onHide = () => {
    setVisible(false);
  };

   /**
   *  function to execute the simplest path finding algorithm
   */
  const findSimplestPath = () => {
    let temp = simplestPathAlgorithm(
      clausthalGraph,
      parseInt(startNode),
      parseInt(destinationNode)
    );
    console.log("hier dein object: ", temp);
    setCircleArray({ ...colorShortestPath(clausthalGraph, temp.path) });
    setDistance(temp.distance);

  };

   /**
   *  function to execute the custom simplest path finding algorithm
   */
  const findCustomSimplestPath = () => {
    let temp = simplestCustomPathAlgorithm(
      clausthalGraph,
      parseInt(startNode),
      parseInt(destinationNode)
    );
    console.log("hier dein object: ", temp);
    setCircleArray({ ...colorShortestPath(clausthalGraph, temp.path) });
    setDistance(temp.distance);

  };

   /**
   * function to execute the shortest path finding algorithm
   */
  const findShortestPath = () => {
    let temp = shortestPathAlgorithm(
      clausthalGraph,
      parseInt(startNode),
      parseInt(destinationNode)
    );
    console.log("hier dein object: ", temp);
    setCircleArray({ ...colorShortestPath(clausthalGraph, temp.path) });
    setDistance(temp.distance);

  }

   /**
   * depending on the state of the toggle element this function handles which algorithm gets executed
   */
  const handleInput = () => {
    if (startNode === null || destinationNode === null) {
      setMessage("Please select both nodes");
      setHeaderMessage("Error");
      setVisible(true);
    } else if (startNode === destinationNode) {
      setMessage("Please select not the same start and destination node");
      setHeaderMessage("Error");
      setVisible(true);
    } else {
      if (simplestAlgorithm === "simplest") {
        findSimplestPath();
      } else if (simplestAlgorithm === "shortest") {
        findShortestPath();
      }else if(simplestAlgorithm === "custom"){
        findCustomSimplestPath();
      }
    }
  }

  if (simplestAlgorithm === options[0]) {
    stringValue = "Simplest";
  } else if (simplestAlgorithm === options[1]) {
    stringValue = "Shortest";
  } else {
    stringValue = "Custom Simplest";
  }

  return (
    <div className="App">
      <div className="controlContainer">
        <h2 style={{ marginRight: "8px" }}>{stringValue} Path Algorithm</h2>
        {distance ? <h4 style={{color: "red"}}>Distance: {distance}</h4>: null}
        <SelectButton value={simplestAlgorithm} options={options} onChange={(e) => setSimplestAlgorithm(e.value)} />
        <Button
          style={{ margin: "0px 8px 0px 8px" }}
          onClick={handleInput}
        >
          Show Route
        </Button>
        <Dropdown
          style={{ width: "150px" }}
          value={startNode}
          optionValue="code"
          options={createArray()}
          onChange={(e) => setStartNode(e.value)}
          optionLabel="name"
          placeholder="Startnode"
        />
        <Dropdown
          style={{ width: "200px" }}
          optionLabel="name"
          optionValue="code"
          value={destinationNode}
          options={createArray()}
          onChange={(e) => setDestinationNode(e.value)}
          placeholder="Destinationnode"
        />
      </div>
      <Canvas
        draw={drawGraph}
        width={1800}
        height={1050}
        data={circleArray}
      />
      <Dialog
        header={headerMessage}
        visible={visible}
        style={{ width: "30vw", display: "flex", flexDirection: "column" }}
        onHide={onHide}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {message}
          <Button onClick={onHide} style={{ marginTop: "30px" }}>
            OK
          </Button>
        </div>
      </Dialog>
    </div>
  );
}


export default App;
