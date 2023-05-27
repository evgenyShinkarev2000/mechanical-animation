import { useEffect, useRef, useState } from 'react'
import styles from "./App.module.scss";
import { CanvasDrawner } from './CanvasDrawner';


function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [, render] = useState(false);
  useEffect(() => render(prev => !prev), []);
  if (canvasRef.current){
    try{
      new CanvasDrawner(canvasRef.current).drawMechanism(x, y);
    }
    catch{
      const context = canvasRef.current.getContext("2d");
      if (!context){
        console.log("Предел регулировки");
      }
      else{
        const font = context.font;
        const fontFamily = font.split(" ")[-1];
        context.font = `20px ${fontFamily}`;
        context.fillText("Предел регулировки", 400, 400);
      }
      
    }
  }

  const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setX(parseInt(e.currentTarget.value));
  }

  const handleYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setY(parseInt(e.currentTarget.value));
  }
  

  return (
    <>
      <div className={styles.container}>
        <canvas className={styles.graph} width={1000} height={1000} ref={canvasRef}>
        </canvas>
        <input type='range' onChange={handleXChange} min={0} max={1000} value={x}/>
        <input type='range' onChange={handleYChange} min={0} max={1000} value={y}/>
      </div>
    </>
  )
}

export default App
