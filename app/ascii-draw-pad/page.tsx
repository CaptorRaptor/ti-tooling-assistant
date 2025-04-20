'use client'

import { ClipboardDocumentIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";
import DrawGrid from "./ui/draw-grid";
import { ColoredText, defaultBg, defaultFg, escapeSpecialCharacter, interpretToken, IsColor, reduceColorCodes, toColorCode } from "@/lib/color";
import { defaultHeight, defaultWidth, useAsciiDrawContext } from "@/context/ascii-draw-context";
import { ColorFillIcon, EraserIcon, ResizeTextArea } from "@/components";
import PaletteGrid from "@/components/palette-grid";

export default function AsciiDrawPad(){
    const {state, setWidth, setHeight, updateColor, setPattern, setBrushColor, setDesc} = useAsciiDrawContext();

    const handleDraw = (row: number, idx: number) =>{  
        if(row < 0  
            || idx < 0 
            || row >= state.colors.length 
            || idx >= state.colors[0].length)
                return;
        
        const code = state.brushColor? toColorCode(state.brushColor) : null;
        if(code !== null && !IsColor(code))
            return;
    
        const newColors = [...state.colors];
        newColors[row][idx] = code;
        updateColor(newColors);
    }

    const handleWidthChange = (width: number | null) =>{
        setWidth(width);
    }

    const handleHeightChange = (height: number | null) =>{
        setHeight(height);
    }

    const handlePatternChange = (value: string) =>{
        setPattern(value);
    }

    const handleBrushChange = (pattern :string) =>{
        setBrushColor(pattern.trim().substring(0,3))
    }
    
    const handleFill = () =>{
        const code = state.brushColor? toColorCode(state.brushColor) : null;
        if(code !== null && !IsColor(code))
            return;

        const colors:(string | null)[][] = [];
        const row:(string | null)[] = [];
        for(let i = 0; i < (state.width ?? defaultWidth); i++){
            row.push(code);
        }
    
        for(let r = 0; r < (state.height ?? defaultHeight); r++){
            colors.push(row);
        }
        updateColor(colors);   
    }

    const handleErase = () =>{
        const colors:(string | null)[][] = [];
        const row:(string | null)[] = [];
        for(let i = 0; i < (state.width ?? defaultWidth); i++){
            row.push(null);
        }
    
        for(let r = 0; r < (state.height ?? defaultHeight); r++){
            colors.push(row);
        }
        updateColor(colors);   
    }

    const handlePaletteClick = (color: string) => {
        setBrushColor(color);
    }

    const colors = state.colors.map(rows => rows.map(c => c? interpretToken(c, true) : c).map(c => typeof c === "string"? undefined : c));

    const chars = state.pattern.split('\n').map(row => row.split(''));

    const content = colors.map((row, y) => {
        if(y < chars.length){
            return row.map<ColoredText | null>((color, x) => {
                if(x < chars[y].length)
                    return {
                        text: chars[y][x],
                        colors:{
                            color: color?.color ?? defaultFg,
                            bgColor: color?.bgColor ?? defaultBg
                        }
                    };
                return null;
            }).filter(ct => ct!==null);
        }
        return [];
    });

        
    const composeArt = () => {
        const chars = state.pattern.split('\n').map(row => row.split(''));
        let result = '';
        for(let h = 0; h < (state.height ?? defaultHeight); h++){
            let line = '';
            for(let w = 0; w < (state.width ?? defaultWidth); w++){
                const color = state.colors[h][w];
                if(color !== null && IsColor(color)){
                    line = line.concat(color);
                }
                else if (color === null){
                    line = line.concat('{x');
                }

                if(h < chars.length && w < chars[h].length){
                    line = line.concat(escapeSpecialCharacter(chars[h][w]));
                }
            }
            line = reduceColorCodes(line)+'{x\n';
            result = result.concat(line.startsWith('{x')? line.substring(2) : line);
        }
        return result.trimEnd();
    }

    const result:string = `{a\n${composeArt()}\n{a\n{A${state.desc}{A`;

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
    };
    
    return (
        <div className="no-scrollbar justify-items-center">
            <div className="card">
                <h1 className="mb-2">ASCII Art Draw Pad</h1>
                <p>
                    This tool assist in creating Ascii art and coloring outfits short strings for the game <a href='https://ti-legacy.com'>The Inquisition: Legacy</a>.
                </p>              
                <hr className="horizontal-divide md:hidden" />
                <p className="md:hidden"> This feature is unavailable on small screen sizes</p>
            </div>
            <div className="card hidden md:block md:grid md:gap-4">
                <div className="flex flex-row gap-4">
                    <div>
                        <p>height</p>
                        <input
                            type="number"
                            inputMode="numeric"
                            placeholder={`${defaultHeight}`}
                            className="text-input appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={state.height?.toString() || ''}
                            onChange={(e) =>  handleHeightChange(isNaN(e.target.valueAsNumber)? null : e.target.valueAsNumber)}
                        />
                    </div>
                    <div>
                        <p>width</p>
                        <input
                            type="number"
                            inputMode="numeric"
                            placeholder={`${defaultWidth}`}
                            className="text-input appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={state.width?.toString() || ''}
                            onChange={(e) =>  handleWidthChange(isNaN(e.target.valueAsNumber)? null : e.target.valueAsNumber)}
                        />
                    </div>
                </div>
                <div>
                    <p>ASCII Art Description</p>
                    <ResizeTextArea value={state.desc} onChange={setDesc}/>
                </div>
                <div>
                    <p>ASCII Art pattern</p>
                    <ResizeTextArea value={state.pattern} onChange={handlePatternChange}/>
                </div>
            </div>
            <div className="card hidden md:block md:grid md:gap-4 md:w-fit md:min-w-2xl lg:min-w-3xl md:max-w-6xl">
                <div className="flex flex-row content-center justify-between">
                    <div className="flex flex-row content-center justify-items-start gap-4">
                        <div className="flex flex-row gap-4 w-40">
                            <p className="text-nowrap">brush color</p>
                            <ResizeTextArea value={state.brushColor ?? '{x'} onChange={handleBrushChange}/>
                        </div>
                        <button  
                            className={clsx('icon-button h-fit')}
                            onClick={() => handleFill()}
                        >
                            <ColorFillIcon className='color-text size-6 m-2'/>
                        </button>
                        <button  
                            className={clsx('icon-button h-fit')}
                            onClick={() => handleErase()}
                        >
                            <EraserIcon className='color-text size-6 m-2'/>
                        </button>
                    </div>
                    <PaletteGrid onClick={handlePaletteClick}/>
                </div>
                <DrawGrid content={content} onDraw={handleDraw}/>
            </div>
            <div className= "card hidden md:block md:grid md:gap-4">
                <div className="flex flex-row justify-between">
                    <p>Copy the text below into The Inquisition: Legacy</p>
                    <button className='icon-button' onClick={() => handleCopy()}>
                        <ClipboardDocumentIcon className='color-text size-5 m-2'/>
                    </button>
                </div>
                <div className="rounded-lg p-4 bg-primary-dark overflow-x-auto scrollbar">
                    {result.split('\n').map((l, i) => <p style={{whiteSpace:'pre'}} key={`result-line-${i}`}>{l}</p>)}
                </div>
            </div>
        </div>
    );
}
