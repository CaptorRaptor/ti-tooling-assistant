import { ColoredText, defaultBg, defaultFg, interpretToken, toColoredText } from "@/lib/color";
import { OutfitItem } from "@/lib/wear-slots";
import clsx from "clsx";
import React from "react";

interface OutfitDrawRowProps{
    item: OutfitItem | null;
    prefix: string;
    drawing: boolean;
    onDraw: (idx: number) => void;
}

export default function OutfitDrawRow({ item, prefix, drawing, onDraw } : OutfitDrawRowProps){    
    const chars: string[] = item?.short.split('') ?? [];
    const colors = item?.color.map(c => c? interpretToken(c, true) : c).map(c => typeof c === "string"? undefined : c) ?? [];
    const content: ColoredText[] = colors.map((color, x) => {
        if(x < chars.length)
            return {
                text: chars[x],
                colors:{
                    color: color?.color ?? defaultFg,
                    bgColor: color?.bgColor ?? defaultBg
                }
            };
        return null;
    }).filter(ct => ct!==null);
    const coloredPrefix = toColoredText(prefix, true);

    const handleDraw = (idx: number) =>{
        if(!drawing) return;
        onDraw(idx);
    }

    return (
        <div key='short-draw-row' className={clsx('flex flex-inline space-x-1', item === null && 'hidden')}>
            {coloredPrefix.map((c, j) => <div key={`color-part-${j}`} style={{color: c.colors.color, backgroundColor: c.colors.bgColor, whiteSpace:"pre-wrap"}}>{c.text}</div>)}
            {content.map((c, i) =>
                <div 
                    key={`short-draw-row-field-${i}`} 
                    style={{color: c.colors.color, backgroundColor:c.colors.bgColor, whiteSpace: 'pre'}}
                    onMouseMove={() => handleDraw(i)}
                >
                    {c.text}
                </div>
            )}
        </div>
    );
}