/**
 * this function renders the circles on the canvas
 */
export const createCircle = (
  index: number,
  x: number,
  y: number,
  c: CanvasRenderingContext2D
) => {
  c.fillStyle = "black";
  c.beginPath();
  c.moveTo(x, y);
  c.arc(x, y, 12, 0, 10);
  c.fill();
  c.closePath();
  c.font = "bold 24px serif";
  c.fillStyle = "blue";
  c.fillText(index.toString(), x - 30, y - 10);
};

/**
 * this function renders the lines between the circles
 */
export const createLine = (
  xStart: number,
  yStart: number,
  xDestination: number,
  yDestination: number,
  c: CanvasRenderingContext2D,
  marked: boolean,
  checkIfAlreadyLinedWithColor: boolean
) => {
  c.beginPath();

  if (!checkIfAlreadyLinedWithColor) {
    if (marked) {
      c.strokeStyle = "red";
      c.moveTo(xStart, yStart);
      c.lineTo(xDestination, yDestination);
      c.stroke();
      c.closePath();
    } else {
      c.strokeStyle = "gray";
      c.moveTo(xStart, yStart);
      c.lineTo(xDestination, yDestination);
      c.stroke();
      c.closePath();
    }
  }
};

/**
 * this function prepares the datastructure that the path can be colored
 */
export const colorShortestPath = (inputData: any, path: any) => {
  let dataObject = resetDataStructureOfOldColors(inputData);
  for (let i = 0; i < path.length; i++) {
    for (let j in dataObject) {
      if (parseInt(path[i]) === dataObject[j].index) {
        for (let k = 0; k < dataObject[j].edges.length; k++) {
          if (
            path.length - 1 >= i &&
            parseInt(path[i + 1]) === dataObject[j].edges[k].index
          ) {
            dataObject[j].edges[k].marked = true;
          }
        }
      }
    }
  }

  return dataObject;
};

/**
 * this function reset the datastructure that a new route can be shown
 */

export const resetDataStructureOfOldColors = (dataObject: any) => {
  for (let j in dataObject) {
    for (let k = 0; k < dataObject[j].edges.length; k++) {
      dataObject[j].edges[k].marked = false;
    }
  }
  return dataObject;
};


/**
 * this function creates all values for the dropdown input 
 */

export const createArray = () => {
  let exportArray = [];
  for (let i = 0; i < 53; i++) {
    let element = {
      name: i.toString(),
      code: i,
    };
    exportArray.push(element);
  }

  return exportArray;
};
