export const createCircle =( index: number, x: number,
    y: number,
    c: CanvasRenderingContext2D)=>{   
        c.fillStyle="black"
        c.beginPath();
        c.moveTo(x,y);
        c.arc(x, y ,12 ,0 ,10);
        c.fill();
        c.closePath();
        c.font = "bold 24px serif";
        c.fillStyle="blue"
        c.fillText(index.toString(), x-30, y-10);

}

export const createLine=(xStart: number,
    yStart: number,xDestination: number,
    yDestination: number,
    c: CanvasRenderingContext2D, marked: boolean)=>{
    c.beginPath();
    if(marked){
        c.strokeStyle ="red"
        c.moveTo(xStart,yStart);
        c.lineTo(xDestination, yDestination);
        c.stroke()
        c.closePath();
        
    }else{
        c.strokeStyle = "gray"
        c.moveTo(xStart,yStart);
        c.lineTo(xDestination, yDestination);
        c.stroke()
        c.closePath();
    }


}

export const colorShortestPath=(realArray: any, path: any)=>{
    let testValues = realArray;
     for (let i = 0; i < path.length; i++) {
         for(let j in testValues){
 
             if(parseInt(path[i])=== testValues[j].index){
                 for (let k = 0; k < testValues[j].edges.length; k++) {
 
                     if(path.length - 1 >= i){
 
                         if(parseInt(path[i + 1]) === testValues[j].edges[k].index){
 
                          
                             
                             testValues[j].edges[k].marked = true;
                         }
                     }
                 }
 
             }
         }
     }
     
     
 
 
     return testValues;
 }

 export const createArray = ()=>{
    let exportArray= [];
    for (let i = 0; i < 53; i++) {
        let element = {
            name: i.toString(),
            code: i
        }
        exportArray.push(element);
    
        
    }
    
    return exportArray;
    }