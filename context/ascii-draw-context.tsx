'use client'

import React from "react";
import { useSessionStorageState } from "@/hooks";

export type AsciiDrawState = {    
    width: number | null;
    height: number | null;
    colors: (string | null)[][];
    pattern: string;
    desc: string;
    brushColor?: string;
}

interface AsciiDrawContextType {
    state: AsciiDrawState;
    setWidth: (width: number | null) => void;
    setHeight: (height: number | null) => void;
    updateColor: (colors: (string | null)[][]) => void;
    setPattern: (pattern:string) =>void;
    setDesc: (desc:string) =>void;
    setBrushColor: (color: string) => void;
}

export const defaultHeight = 20;
export const defaultWidth = 80;

export function initialAsciiDrawState(): AsciiDrawState{
    const colors:(string | null)[][] = [];
    const row:(string | null)[] = [];
    for(let i = 0; i < defaultWidth; i++){
        row.push(null);
    }

    for(let r = 0; r < defaultHeight; r++){
        colors.push(row);
    }

    return {
        width: null,
        height: null,
        colors: colors,
        pattern: '',
        desc: '',
        brushColor: undefined
    };
}

function getPattern(value:string, height:number, width:number){
    return value
    .split('\n')
    .map(row => row.substring(0, width))
    .slice(0, height)
    .join('\n');
}

function FitToSize(colors: (string | null)[][], height:number, width:number){
    let newColors = [...colors];
    if(newColors.length < height){
        const row = [];
        for(let i = 0; i < width; i++){
            row.push(null);
        }
        for(let i = newColors.length; i < height; i++){
            newColors.push(row);
        }
    }
    else if (newColors.length > height){
        newColors = newColors.slice(0, height);
    }

    for(let i = 0; i < newColors.length; i++){
        if(newColors[i].length < width){
            for(let j = newColors[i].length; j < width; j++){
                newColors[i].push(null);
            }
        }
        else if(newColors[i].length > width){
            newColors[i] = newColors[i].slice(0, width);
        }
    }
    return newColors;
}

export const AsciiDrawContext = React.createContext<AsciiDrawContextType | undefined>(undefined);

const AsciiDrawContextProvider = ({children,}: Readonly<{children: React.ReactNode;}>) =>{
    const [asciiDraw, setAsciiDraw] = useSessionStorageState<AsciiDrawState>('asciiDrawState', initialAsciiDrawState());
    
    const setWidth = (width: number | null) =>{
        const newPattern = getPattern(asciiDraw.pattern, asciiDraw.height ?? defaultHeight, width ?? defaultWidth);
        const colors = FitToSize(asciiDraw.colors, asciiDraw.height ?? defaultHeight, width ?? defaultWidth);
        setAsciiDraw({...asciiDraw, pattern:newPattern, colors:colors, width:width});
    };

    const setHeight = (height: number | null) => {
        const newPattern = getPattern(asciiDraw.pattern, height ?? defaultHeight, asciiDraw.width ?? defaultWidth);
        const colors = FitToSize(asciiDraw.colors, height ?? defaultHeight, asciiDraw.width ?? defaultWidth);
        setAsciiDraw({...asciiDraw, pattern:newPattern, colors:colors, height:height});
    };

    const updateColor = (colors: (string | null)[][]) => {
        setAsciiDraw({...asciiDraw, colors:colors});
    };

    const setPattern = (pattern:string) =>{
        const newPattern = getPattern(pattern, asciiDraw.height ?? defaultHeight, asciiDraw.width ?? defaultWidth);
        setAsciiDraw({...asciiDraw, pattern:newPattern});
    };

    const setDesc = (desc:string) =>{
        setAsciiDraw({...asciiDraw, desc:desc});
    };

    const setBrushColor = (color: string|undefined) => {
        setAsciiDraw({...asciiDraw, brushColor:color});
    };
    
    return (
        <AsciiDrawContext.Provider value={{state:asciiDraw, setWidth, setHeight, updateColor, setPattern, setDesc, setBrushColor}}>
            {children}
        </AsciiDrawContext.Provider>
    );
};

export function useAsciiDrawContext(){
    const state = React.useContext(AsciiDrawContext);
    if(state === undefined){
        throw new Error('useAsciiDrawContext must be used with a AsciiDrawContextProvider');
    }

    return state;
} 

export default AsciiDrawContextProvider;