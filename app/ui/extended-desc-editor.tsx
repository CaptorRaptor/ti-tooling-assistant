import { ColorDisplay, ResizeTextArea } from "@/components";
import { useStringToolContext } from "@/context/string-tool-context";
import React from "react";
import clsx from "clsx";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { ExtendedDesc } from "@/lib/item";

export default function ExtendedDescEditor(){
    const {item, updateItem} = useStringToolContext();

    const handleAddExtended = () =>{
        if(item.extendedDescList.length === 0){
            updateItem({...item, extendedDescList:[{
                keywords: item.keywords,
                desc : ''
            }]});
            return;
        }
        updateItem({...item, extendedDescList:[...item.extendedDescList, {
            keywords: '',
            desc : ''
        }]});
    }

    const handleUpdateExtended = (index:number, value:ExtendedDesc) =>{
        if(index >= 0 && index < item.extendedDescList.length){
            const newList = item.extendedDescList;
            newList[index] = value;
            updateItem({...item, extendedDescList: newList});
        }
    }

    const handleRemoveExtended = (index:number) =>{
        if(index < 0 && index >= item.extendedDescList.length)
            return;

        const newList = item.extendedDescList;
        if(index === 0 ){
            newList.shift();
        }
        else {
            newList.splice(index, 1);
        }
        updateItem({...item, extendedDescList: newList});
    }

    return (
        <div className="card">
            <div className="flex justify-between">
                <h2>Extended Descriptions</h2>
                <button className='icon-button' onClick={() => handleAddExtended()}>
                    <PlusIcon className='color-text size-5 m-2'/>
                </button>
            </div>
            <div className={clsx(item.extendedDescList.length === 0 && 'hidden')}>
                <hr className="horizontal-divide" />
                <div className="divide-y-1 divide-secondary">
                    {item.extendedDescList.map((e, i) =>
                        <div key={`extended-desc-${i}`} className="card-container pb-4 mt-2 md:pt-4 md:relative">
                            <div>
                                <p>Keywords</p>
                                <ResizeTextArea placeholder="big test item" value={e.keywords} onChange={(v) => handleUpdateExtended(i, {...e, keywords:v})} />
                            </div>
                            <div>
                                <p>Description</p>
                                <ResizeTextArea placeholder="This item is very big and ready for testing." value={e.desc} onChange={(v) => handleUpdateExtended(i, {...e, desc:v})} />
                                <ColorDisplay value={e.desc}/>
                            </div>
                            <button className='text-icon-button md:absolute md:-top-2 md:right-0' onClick={() => handleRemoveExtended(i)}>
                                <p className="md:hidden pl-4">Delete</p>
                                <TrashIcon className='color-text size-5 m-2'/>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}