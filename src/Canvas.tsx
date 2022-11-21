
import { useRef, useEffect } from 'react'; 

interface Props{
  draw: (context: CanvasRenderingContext2D)=>void;
  width: number;
  height: number;
  data: any;
}

const Canvas = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement|null>(null)
  useEffect(()=>{
    const canvas = canvasRef.current;
    if(!canvas){
      return;
    }
    const context = canvas.getContext('2d');
    if(!context){
      return;
    }
    props.draw(context);
    return ()=>{
      context.clearRect(0,0,window.innerWidth, 400);
    }
  },[props.data])
  return (
    <canvas width={props.width} height={props.height}  ref={canvasRef}/>
  )
}

export default Canvas