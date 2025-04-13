'use client'

import { PaletteIcon } from './icons';
import paletteJson from '@/public/json/color-palette.json'
import { defaultFg, toCSSColor } from '@/lib/color';
import React from 'react';
import clsx from 'clsx';
import { createToggle, ModalDialog } from '@/components';

const ColorShades = paletteJson.ColorShades

function convertColor(token: string){
    const color = toCSSColor(`<${token}>`, true)?? defaultFg
    return {text: token, color: color}
}

function ReduceToRows<T>(colors:T[]): T[][]
{
    return colors.reduce((acc: T[][], n:T, i: number) => { 
        const chunkIndex = Math.floor(i/12)
      
        if(!acc[chunkIndex]) {
          acc[chunkIndex] = [] // start a new chunk
        }
      
        acc[chunkIndex].push(n)
      
        return acc
      }, [])
}

const gradientRows= ReduceToRows(paletteJson.Gradient.map(convertColor));

function PaletteContent({ onClick }: { onClick?:(color:string) => void }){
    const clickable = onClick !== undefined;

    const handleClick = (text: string) =>{
        if(clickable)
            onClick(text)
    }

    return (
        <>
            <div className='justify-start'>
                {gradientRows.map((row, i) =>{
                    return (
                        <div key={`xterm-palette-gradient-row-${i}`} className='flex flex-inline space-x-2'>
                            {row.map((c) =>
                                <div 
                                    key={`xterm-palette-gradient-${c.text}`} 
                                    style={{color: c.color, cursor: clickable? 'pointer': 'auto'}} 
                                    onClick={() => handleClick(c.text)}
                                >
                                    {c.text}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {ColorShades.map(shade =>
                <div key={`xterm-palette-shade-${shade.name}`}>
                    <div style={{color: defaultFg}}>{shade.name}</div>
                    {ReduceToRows(shade.colors.map(c => convertColor(c))).map((row,i) =>
                        <div key={`xterm-palette-shade-${i}`} className='flex flex-inline space-x-2'>
                            {row.map((c) =>
                                <div key={`xterm-palette-shade-${c.text}`} style={{color: c.color}} onClick={() => handleClick(c.text)}>
                                    {c.text}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

interface PaletteGrid{
    onClick?: (color:string) => void;
}

export default function PaletteGrid({onClick} : PaletteGrid) {
    const [show, setShow] = React.useState(false);
        const dialogRef = React.useRef<HTMLDialogElement>(null);
        const toggleDialog = createToggle(dialogRef);

    return (
        <div
            className="w-fit h-fit relative flex justify-center">
            <button  
                className={clsx('icon-button hidden md:block',
                    show? 'bg-secondary hover:bg-secondary-light' : 'hover:bg-primary-light')}
                onClick={() => setShow(!show)}
            >
                <PaletteIcon className='color-text size-5 m-2'/>
            </button>
            <button  
                className={clsx('icon-button md:hidden hover:bg-primary-light')}
                onClick={toggleDialog}
            >
                <PaletteIcon className='color-text size-5 m-2'/>
            </button>
            <div className={clsx("min-w-fit w-[200px] h-fit absolute -top-4 inset-x-16 z-50 transition-all hidden", show && 'md:block')}>
                <div className='terminal justify-center space-y-4 m-0 overflow-y-auto scrollbar h-115 select-none'>
                    <PaletteContent onClick={onClick}/>
                </div>
            </div>
            <ModalDialog className='md:hidden terminal' toggleDialog={toggleDialog} ref={dialogRef}>
                <PaletteContent/>                
            </ModalDialog>
        </div>    
    )
}