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