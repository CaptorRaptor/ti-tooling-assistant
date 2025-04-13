import { ColoredText } from "@/lib/color";
import clsx from "clsx";
import React from "react";

interface DrawPadProps{
    content:ColoredText[][];
    onDraw: (row:number, idx: number) => void;
}

export default function DrawGrid({ content, onDraw } : DrawPadProps){
    const [drawing, setDrawing] = React.useState(false);
    
    const handleDraw = (row:number, idx: number) =>{
        if(!drawing) return;
        onDraw(row, idx);
    }

    return (
        <div 
            className='terminal justify-center space-y-4 m-0 overflow-y-auto scrollbar h-fit select-none cursor-crosshair'
            onMouseDown={() => setDrawing(true)}
            onMouseUp={() => setDrawing(false)}>
            <div className='justify-start'>
                {content.map((row, i) =>{
                    return (
                        <div key={`ascii-draw-grid-row-${i}`} className='flex flex-inline space-x-1'>
                            {row.map((c, j) =>
                                <div 
                                    key={`ascii-draw-row-${i}-field-${j}`} 
                                    style={{color: c.colors.color, backgroundColor:c.colors.bgColor, whiteSpace: 'pre'}}
                                    onMouseMove={() => handleDraw(i,j)}
                                >
                                    {c.text}
                                </div>
                            )}
                            <div className={clsx('h-6', (row.length !== 0) && 'hidden')}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}