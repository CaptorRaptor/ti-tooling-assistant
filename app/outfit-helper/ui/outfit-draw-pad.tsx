import { ColoredText } from "@/lib/color";
import { OutfitItem, OutfitSlots } from "@/lib/wear-slots";
import clsx from "clsx";
import React from "react";
import OutfitDrawRow from "./outfit-draw-row";

interface OutfitDrawPadProps{
    outfit:OutfitSlots;
    onDraw: (key: keyof OutfitSlots, element: number, idx: number) => void;
}


function Prefix(key?: keyof OutfitSlots): string{
    switch(key){
        case 'light' : return '{R{({cused as a light{R{){x    ';
        case 'head' : return '{R{({cworn on head{R{){x       ';
        case 'ears' : return '{R{({cworn on ears{R{){x       ';
        case 'face' : return '{R{({cworn over the face{R{){x ';
        case 'neck' : return '{R{({cworn around neck{R{){x   ';
        case 'cloakpin' : return '{R{({cworn as cloak pin{R{){x  ';
        case 'shoulder' : return '{R{({cworn over shoulder{R{){x ';
        case 'arms' : return '{R{({cworn on arms{R{){x       ';
        case 'leftWrist' : return '{R{({cworn, left wrist{R{){x   ';
        case 'rightWrist' : return '{R{({cworn, right wrist{R{){x  ';
        case 'hands' : return '{R{({cworn on hands{R{){x      ';
        case 'leftFinger' : return '{R{({cworn, left finger{R{){x  ';
        case 'rightFinger' : return '{R{({cworn, right finger{R{){x ';
        case 'wieldRight' : return '{R{({cwielded, right{R{){x     ';
        case 'wieldLeft' : return '{R{({cheld, in off hand{R{){x  ';
        case 'torso' : return '{R{({cworn on torso{R{){x      ';
        case 'body' : return '{R{({cworn about body{R{){x    ';
        case 'waist' : return '{R{({cworn about waist{R{){x   ';
        case 'legs' : return '{R{({cworn on legs{R{){x       ';
        case 'ankles' : return '{R{({cworn on ankles{R{){x     ';
        case 'feet' : return '{R{({cworn on feet{R{){x       ';
        default: return '                     ';
    }
} 

export default function OutfitDrawPad({ outfit, onDraw } : OutfitDrawPadProps){
    const [drawing, setDrawing] = React.useState(false);
    
    const handleDraw = (key: keyof OutfitSlots, element:number, idx: number) =>{
        if(!drawing) return;
        onDraw(key, element, idx);        
    }

    const keys: (keyof OutfitSlots)[] = Object.keys(outfit)
        .map(key => key as keyof OutfitSlots)
        .filter(key => outfit[key] !== null)
        .filter(key => !Array.isArray(outfit[key]) || outfit[key]!.length > 0);

    return (
        <div 
            className='terminal justify-center space-y-4 m-0 overflow-y-auto scrollbar h-fit select-none cursor-crosshair'
            onMouseDown={() => setDrawing(true)}
            onMouseUp={() => setDrawing(false)}>
            <div className='justify-start'>
                {keys.map((key, i) =>{
                    const items = Array.isArray(outfit[key])? outfit[key] : [outfit[key]!];
                    return (
                        <div key={`outfit-draw-pad-row-${i}`} className='flex flex-inline space-x-1'>
                            {items.map((item, i) => <OutfitDrawRow key={`outfit-draw-row-${key}-${i}`} item={item} prefix={Prefix(i === 0? key : undefined)} drawing={drawing} onDraw={(idx) => handleDraw(key, i, idx)} />)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}