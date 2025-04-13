import { ColorDisplay, ResizeTextArea } from "@/components";
import { useStringToolContext } from "@/context/string-tool-context";
import React from "react";
import clsx from "clsx";
import { getSpecialExtendedHelpInfo, getSpecialExtendedKeyword, getSpecialExtendedLabel, SpecialExtendedKey } from "@/lib/item";

export default function SpecialDescEditor(){
    const {item, updateItem} = useStringToolContext();

    const SpecialEDButton = (key:SpecialExtendedKey)=>{
        return (
            <button 
                className={clsx('bg-primary-dark hover:bg-secondary-dark', item.special[key] && 'bg-secondary hover:bg-secondary-light')} 
                id={`special-ed-button-${key}`} 
                onClick={() => toggleExtended(key)}>
                    {getSpecialExtendedKeyword(key)}
            </button>
        );
    }


    const SpecialEDInput = (key:SpecialExtendedKey)=>{
        return (
            <div className={clsx('card-container pb-0 mt-2', (item.special[key] === undefined) && 'hidden')}>
                <hr className="horizontal-divide my-1" />
                <div>
                    <p>{`${getSpecialExtendedKeyword(key)} (${getSpecialExtendedLabel(key)})`}</p>
                    <p className="text-xs text-text">{getSpecialExtendedHelpInfo(key)??''}</p>
                </div>
                <ResizeTextArea className='min-h-16' placeholder="This item is very big and ready for testing." value={item.special[key] ?? ''} onChange={(v) => handleChange(key, v)} />
                <ColorDisplay value={item.special[key] ?? ''}/>
            </div>
        );
    }


    const handleChange = (key:SpecialExtendedKey, desc:string)=>{
        const newSpecial = {
            ...item.special
        };
        
        newSpecial[key] = desc;
        updateItem({...item, special:newSpecial});
    }

    const toggleExtended = (key:SpecialExtendedKey)=>{
        const newSpecial = {
            ...item.special
        };
        
        if(newSpecial[key] !== undefined){
            newSpecial[key] = undefined;
        }
        else{
            newSpecial[key] = '';
        }
        updateItem({...item, special:newSpecial});
    }
    
    return (
        <div className="card">
            <div className="flex justify-between">
                <h2>Special Extended Descriptions</h2>
            </div>
            <hr className="horizontal-divide" />
            <div className='card-container'>
                <div className='grid gap-4 md:grid-cols-5'>
                    {SpecialEDButton ('self')}
                    {SpecialEDButton ('others')}
                    {SpecialEDButton ('use')}
                    {SpecialEDButton ('eat')}
                    {SpecialEDButton ('taste')}
                    {SpecialEDButton ('smell')}
                    {SpecialEDButton ('apply')}
                    {SpecialEDButton ('cup')}
                    {SpecialEDButton ('header')}
                    {SpecialEDButton ('footer')}
                    {SpecialEDButton ('wear')}
                    {SpecialEDButton ('descCloak')}
                    {SpecialEDButton ('shopInfo')}
                </div>
                {SpecialEDInput('self')}
                {SpecialEDInput('others')}
                {SpecialEDInput('use')}
                {SpecialEDInput('eat')}
                {SpecialEDInput('taste')}
                {SpecialEDInput('smell')}
                {SpecialEDInput('apply')}
                {SpecialEDInput('cup')}
                {SpecialEDInput('header')}
                {SpecialEDInput('footer')}
                {SpecialEDInput('wear')}
                {SpecialEDInput('descCloak')}
                {SpecialEDInput('shopInfo')}
            </div>
        </div>
    );
}