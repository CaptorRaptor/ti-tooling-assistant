'use client'

import { ColorDisplay } from "@/components";
import { getNewSlot, getWearSlot, initialOutfitSlots, OutfitItem, OutfitSlots, ToDisplay } from "@/lib/wear-slots";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";
import ShortEditor from "./ui/short-editor";

const isProd = process.env.NODE_ENV === 'production';

export default function OutfitHelper() {
    const [outfit, setOutfit] = React.useState<OutfitSlots>(initialOutfitSlots());

    const updateOutfit = <K extends keyof OutfitSlots>(key : K, v: OutfitSlots[K]) =>{
        setOutfit({...outfit, [key]: v});
    }
    
    const ShortButton = <K extends keyof OutfitSlots>(key : K) =>{
        const toggleButton = () =>{
            if(outfit[key] !== null)
                updateOutfit(key, null);
            else
                updateOutfit(key, getNewSlot(key));
        }

        return (
            <button 
                className={clsx('bg-primary-dark hover:bg-secondary-dark', (outfit[key] !== null) && 'bg-secondary hover:bg-secondary-light')} 
                id={`${key}-editor-button`} 
                onClick={() => toggleButton()}>
                    {getWearSlot(key)}
            </button>
        );
    }

    const ShortInput = <K extends keyof OutfitSlots>(key : K) =>{
        let list, handleUpdate, length;
        if(!Array.isArray(outfit[key])) {
            list = outfit[key] !== null? [outfit[key]] : [];
            handleUpdate = (list: OutfitItem[]) =>  updateOutfit(key, (list.length === 0? null : list[0]) as OutfitSlots[K]);
            length = 0;
        }
        else {
            list = outfit[key];
            handleUpdate = (list: OutfitItem[]) =>  updateOutfit(key, list as OutfitSlots[K]);
            length = 3;
        }

        return (
            <div className={clsx("",  (outfit[key] === null) && "hidden")}>
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
                <div className={clsx("flex flex-col content-center justify-items-center", !isProd && "hidden")}>
                    <ExclamationTriangleIcon className="h-16 text-text/80"/>
                    <h2 className=" text-text/80">Under Construction</h2>
                </div>
                <div className={clsx("", isProd && "hidden")}>
                    <div className='grid gap-4 md:grid-cols-5'>
                        {Object.keys(outfit).map(key => ShortButton(key as keyof OutfitSlots))}
                    </div>
                    {Object.keys(outfit).map(key => ShortInput(key as keyof OutfitSlots))}
                    <ColorDisplay value={ToDisplay(outfit)}/>
                </div>      
            </div>
        </div>
    );
}
