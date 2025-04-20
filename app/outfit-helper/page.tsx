'use client'

import { ColorFillIcon, EraserIcon, ResizeTextArea } from "@/components";
import { getNewSlot, getWearSlot, initialOutfitSlots, OutfitItem, OutfitSlots, ToDisplay } from "@/lib/wear-slots";
import { ClipboardDocumentIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";
import ShortEditor from "./ui/short-editor";
import OutfitDrawPad from "./ui/outfit-draw-pad";
import PaletteGrid from "@/components/palette-grid";
import { escapeSpecialCharacter, IsColor, reduceColorCodes, toColorCode } from "@/lib/color";
import { useOutfitHelperContext } from "@/context/outfit-helper-context";

export default function OutfitHelper() {
    const {state, updateOutfit, setAllColor, setBrushColor} = useOutfitHelperContext();
    const ShortButton = <K extends keyof OutfitSlots>(key : K) =>{
        const toggleButton = () =>{
            if(state.outfit[key] !== null)
                updateOutfit(key, null);
            else
                updateOutfit(key, getNewSlot(key));
        }

        return (
            <button 
                className={clsx('bg-primary-dark hover:bg-secondary-dark', (state.outfit[key] !== null) && 'bg-secondary hover:bg-secondary-light')} 
                id={`${key}-editor-button`} 
                key={`${key}-editor-button`} 
                onClick={() => toggleButton()}>
                    {getWearSlot(key)}
            </button>
        );
    }

    const ShortInput = <K extends keyof OutfitSlots>(key : K) =>{
        let list, handleUpdate, length;
        if(!Array.isArray(state.outfit[key])) {
            list = [state.outfit[key]!];
            handleUpdate = (list: OutfitItem[]) =>  updateOutfit(key, (list.length === 0? null : list[0]) as OutfitSlots[K]);
            length = 0;
        }
        else {
            list = state.outfit[key];
            handleUpdate = (list: OutfitItem[]) =>  updateOutfit(key, (list.length === 0? null : list) as OutfitSlots[K]);
            length = 3;
        }

        return (
            <div className={clsx("",  (state.outfit[key] === null) && "hidden")}>
                <ShortEditor
                    key={`${key}-editor`}
                    list={list}
                    length={length}
                    label={getWearSlot(key)}
                    onUpdate={handleUpdate}
                />
            </div>
        )
    }

    const handleDraw = (key: keyof OutfitSlots, element: number, idx: number) => {
        if(state.outfit[key] === null) return;
        const code = state.brushColor? toColorCode(state.brushColor) : null;
        if(code !== null && !IsColor(code))
            return;
        if(Array.isArray(state.outfit[key])){
            if(element < 0 || element >= state.outfit[key].length 
                || idx < 0 || idx >= state.outfit[key][element].color.length)
                return;
            const newList = [...state.outfit[key]];
            newList[element].color[idx] = code;
            updateOutfit(key, newList);
        }
        else {
            if(idx < 0 || idx >= state.outfit[key]!.color.length) return;
            const newItem = state.outfit[key];
            newItem.color[idx] = code;
            updateOutfit(key, newItem);
        }
    }
        
    const handleBrushChange = (pattern :string) =>{
        setBrushColor(pattern.trim().substring(0,3))
    }
        
    const handleFill = () =>{
        setAllColor(state.brushColor ?? null);
    }

    const handleErase = () =>{
        setAllColor(null);
    }
    
    const handlePaletteClick = (color: string) => {
        setBrushColor(color);
    }
    
    const keys = Object.keys(state.outfit).map(key => key as keyof OutfitSlots).filter(key => state.outfit[key] !== null);
    const composeShort = (short: string, colors: (string | null)[]) => {
        const chars = short.split('');
        let coloredShort = '';
        for(let i = 0; i < chars.length; i++){
            const color = colors[i];
            if(color !== null && IsColor(color)){
                coloredShort = coloredShort.concat(color);
                console.log(coloredShort);
            }
            else if (color === null){
                coloredShort = coloredShort.concat('{x');
            }

            if(i < chars.length){
                coloredShort = coloredShort.concat(escapeSpecialCharacter(chars[i]));
            }
        }        
        coloredShort = reduceColorCodes(coloredShort)+'{x';
        coloredShort = coloredShort.startsWith('{x')? coloredShort.substring(2) : coloredShort;
        return coloredShort.trimEnd();
    }
    
    const result:string = keys.map(key => state.outfit[key])
        .map(list => Array.isArray(list)? 
            list.map(item => `tool ${item.key} short ${composeShort(item.short, item.color)}\n`).join('') 
            : `tool ${list!.key} short ${composeShort(list!.short, list!.color)}\n`)
        .join('');
    
    const handleCopy = () => {
        navigator.clipboard.writeText(result);
    };

    return (
        <div className="no-scrollbar">
            <div className="card">
                <h1 className="mb-2">Outfit Helper</h1>
                <p>
                    This tool assist in creating consistently colored outfits and layering item short strings for the game <a href='https://ti-legacy.com'>The Inquisition: Legacy</a>.
                </p>              
                <hr className="horizontal-divide md:hidden" />
                <p className="md:hidden"> This feature is unavailable on small screen sizes</p>
            </div>
            <div className="card hidden md:block">
                <div className='grid gap-4 md:grid-cols-4'>
                    {Object.keys(state.outfit).map(key => ShortButton(key as keyof OutfitSlots))}
                </div>
                <hr className={clsx("horizontal-divide", keys.length === 0 && 'hidden')} />
                {keys.map(key => ShortInput(key))}                    
            </div>
            
            <div className="card hidden md:block">
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
                <OutfitDrawPad outfit={state.outfit} onDraw={handleDraw} />
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
