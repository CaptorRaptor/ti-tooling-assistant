'use client'

import React from "react";
import { GradientCreator, useGradientContext } from "@/context/gradient-context";
import { useStringToolContext } from "@/context/string-tool-context";
import { ArrowUpIcon, TrashIcon, PencilIcon, ArchiveBoxIcon, ClipboardDocumentIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from 'next/navigation';
import clsx from "clsx";
import { GradientStrip, ResizeTextArea } from "@/components";
import { getColorList, Gradient, smoothPattern } from "@/lib/color";
import ResponsiveCheckBox from "@/components/responsive/responsive-checkbox";
import PaletteGrid from "@/components/palette-grid";


function hasError(creatorState: GradientCreator, storage: Gradient[]){
    if(creatorState.name.length === 0)
        return 'Name cannot be empty';
    else if (creatorState.id !== undefined && (creatorState.id < 0 || creatorState.id >= storage.length)){
        return 'Faulty Gradient ID. Please click Cancel X.'
    }
    else{
        const newStorage = [...storage];
        if(creatorState.id !== undefined){
            if(creatorState.id === 0)
                newStorage.shift();
            else
                newStorage.splice(creatorState.id,1);
        }
        return newStorage.map(e => e.name).includes(creatorState.name)? 'Name is already taken' : null;
    }
}

export default function GradientStorage() {
    const {storage, add, update, remove, creatorState, updateCreatorState, clearCreatorState} = useGradientContext();
    const {gradientState, updateGradient} = useStringToolContext();
    const router = useRouter();


    const error = hasError(creatorState, storage);
    const result = creatorState.smoothPattern? smoothPattern(creatorState.pattern, (creatorState.length || 0)) : creatorState.pattern;

    const handleSave = () =>{
        if(error !== null){
            return;
        }

        const gradient:Gradient = {name: creatorState.name, colors:result};

        if(creatorState.id === undefined){
            add(gradient);
        }
        else{
            update(creatorState.id, gradient);
        }
        clearCreatorState();
    }

    const handlePaletteClick = (color: string)=>{
        updateCreatorState({...creatorState, pattern:creatorState.pattern + ' ' + color})
    }

    const handleLoad = (i:number) =>{
        if(i >= 0 && i < storage.length){
            updateGradient({...gradientState, useGradient:true, gradient:storage[i], pattern:storage[i].colors});
            router.push('/string-tool');
        }
    }

    const handleCancel = () => {
        clearCreatorState();
    }

    const handleEdit = (i:number) =>{
        if(i >= 0 && i < storage.length){
            updateCreatorState({
                id: i,
                name: storage[i].name,
                pattern: storage[i].colors,
                smoothPattern: false,
                length:0,
            });            
        }
    }

    const handleDelete = (i:number) =>{
        remove(i);        
    }

    
    const handleCopy = () => {
        navigator.clipboard.writeText(result);
    };

    return (
        <div className="no-scrollbar">
            <div className="card">
                <h1 className="mb-2">Gradient Creator</h1>
                <p>
                    This tool assist in creating and managing gradients that have been saved in the localstorage of your browser.
                </p>                
                <hr className="horizontal-divide" />
                <div className="relative grid gap-4 items-center md:grid-cols-4 md:pt-2">
                    <div className="md:col-span-2">
                        <p className={clsx(error !== null && 'text-red-500')}>Name</p>
                        <textarea
                            className={clsx("w-full resize-none rounded-[7px] border border-primary-light px-3 py-2 text-text bg-primary-dark", error !== null && 'border-red-500')}
                            rows={1}
                            value={creatorState.name}
                            onChange={(e) => updateCreatorState({...creatorState, name:e.target.value})}
                        />
                        <p className={clsx('text-red-500', error === null && 'hidden')}>{error}</p>
                    </div>
                    <div className="md:col-start-3">
                        <ResponsiveCheckBox label={'Smooth Colors'} checked={creatorState.smoothPattern} onChange={(v) => updateCreatorState({...creatorState, smoothPattern:v})}/> 
                    </div>
                    <div className="md:col-start-4">
                        <p>Length</p>
                        <input
                            type="number"
                            inputMode="numeric"
                            placeholder="0"
                            className="text-input appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            disabled={!creatorState.smoothPattern}
                            value={(creatorState.length || 0).toString()}
                            onChange={(e) =>  updateCreatorState({...creatorState, length:isNaN(e.target.valueAsNumber)? null : e.target.valueAsNumber})}
                        />
                    </div>
                    <div className="md:col-span-4">
                        <div className="flex flex-row justify-between">
                            <p>Colors</p>
                            <PaletteGrid onClick={handlePaletteClick}/>
                        </div>
                        <ResizeTextArea placeholder="ffa {r aaf#5 {w#2" value={creatorState.pattern} onChange={(v) => updateCreatorState({...creatorState, pattern:v})} />
                    </div>
                    <div className="md:col-span-4 md:relative">
                        <div className="rounded-lg p-2 min-h-10 md:mb-2 md:mr-14 bg-primary-dark md:col-span-4">{result}</div> 
                        <GradientStrip value={getColorList(result)}/>
                        <button className='text-icon-button md:absolute mt-4 md:mt-0 md:top-0 md:right-0' onClick={() => handleCopy()}>
                            <p className="md:hidden">Copy to Clipboard</p>
                            <ClipboardDocumentIcon className='color-text size-5 m-2'/>
                        </button>
                    </div>
                    <button className='text-icon-button md:absolute  md:-top-3 md:right-0' onClick={() => handleSave()}>
                        <p className="md:hidden">Save Gradient</p>
                        <ArchiveBoxIcon className='color-text size-5 m-2'/>
                    </button>
                    <button className={clsx('text-icon-button md:absolute  md:-top-3 md:right-12', creatorState.id === undefined && 'hidden' )} onClick={() => handleCancel()}>
                        <p className="md:hidden">Cancel</p>
                        <XMarkIcon className='color-text size-5 m-2'/>
                    </button>
                </div>

            </div>
            <div className="card">
                <h1 className=" mb-2">Gradient Storage</h1>      
                <hr className="horizontal-divide mb-2" />
                <div className="grid divide-y-1 divide-primary-light">
                    {storage.map((gradient, i) => (
                        <div key={`gradient-storage-${i}`} className="flex flex-row gap-4 py-2">
                            <div className="w-full">
                                <p>{gradient.name}</p>
                                <GradientStrip value={getColorList(gradient.colors)}/>
                            </div>
                            <div className="flex gap-8">                            
                                <button className='icon-button' onClick={() => handleLoad(i)}>
                                    <ArrowUpIcon className='color-text size-5 m-2'/>
                                </button>                               
                                <button className='icon-button' onClick={() => handleEdit(i)}>
                                    <PencilIcon className='color-text size-5 m-2'/>
                                </button>
                                <button className='icon-button' onClick={() => handleDelete(i)}>
                                    <TrashIcon className='color-text size-5 m-2'/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <p className={clsx('label',storage.length !== 0 && 'hidden')}>No custom gradients are currently in storage.</p>
            </div>
        </div>
    );
}
