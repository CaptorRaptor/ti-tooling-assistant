'use client'

import React from "react";
import { useItemContext } from "@/context/item-context";
import { useStringToolContext } from "@/context/string-tool-context";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/16/solid";
import { useRouter } from 'next/navigation'
import clsx from "clsx";



export default function ItemStorage() {
    const { storage, remove } = useItemContext();
    const {updateItem, gradientState, updateGradient} = useStringToolContext();
    const router = useRouter()

    const handleLoad = (i:number) =>{
        if(i >= 0 && i < storage.length){
            updateGradient({...gradientState, useGradient:false});
            updateItem(storage[i].item);
            router.push('/');
        }
    }

    const handleDelete = (i:number) =>{
        remove(i);        
    }

    return (
        <div className="no-scrollbar">
            <div className="card">
                <h1 className="mb-2">Item Storage</h1>
                <p>
                    This tool assist in managing item toolings that have been saved in the localstorage of your browser.
                </p>                
                <hr className="horizontal-divide" />
                <div className="grid gap-4 divide-y-2">
                    {storage.map((item, i) => (
                        <div className="flex flex-row justify-between" key={`item-storage-entry-${i}`}>
                            <p>{item.name}</p>
                            <div className="flex gap-8">                                
                                <button className='icon-button' onClick={() => handleLoad(i)}>
                                    <PencilIcon className='color-text size-5 m-2'/>
                                </button>
                                <button className='icon-button' onClick={() => handleDelete(i)}>
                                    <TrashIcon className='color-text size-5 m-2'/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <p className={clsx('select-none',storage.length !== 0 && 'hidden')}>No items are currently in storage.</p>
            </div>
        </div>
    );
}
