'use client'

import React from "react";
import { getDefaultGradientState, GradientState } from "@/lib/gradient-state";
import { getDefaultItemDesc, getDefaultToolOption, getKeywords, ItemDesc, ToolOption } from "@/lib/item";
import {  useSessionStorageState } from "@/hooks";
import { applyPattern, getColorList } from "@/lib/color";


type ToolContext = {
    item: ItemDesc;
    gradientState: GradientState;
    updateGradient: (value:GradientState) => void;
    updateItem: (value:ItemDesc)=> void;
    setShortDesc: (value:string) => void;
    resetGradient: () => void;
    resetItem: () => void;
    toolOpt: ToolOption;
    updateToolOpt: (value:ToolOption) => void;
}

export const StringToolContext = React.createContext<ToolContext | undefined>(undefined);

const StringToolContextProvider = ({children,}: Readonly<{children: React.ReactNode;}>) =>{
    const [item, setItem] = useSessionStorageState("itemDesc", getDefaultItemDesc());
    const [gradientState, setGradientState] = useSessionStorageState("gradientState", getDefaultGradientState());
    const [toolOpt, setToolOpt] = useSessionStorageState("toolOpt", getDefaultToolOption());

    
    const setShortDesc = (value:string) =>{
        if(value.length <= 0){
            setItem({...item, short: '', cShort: '', long: '', keywords:''});
            return;
        }
        
        const keywords = getKeywords(value);
        if(gradientState.useGradient){
            const coloredShort = applyPattern(value, gradientState);
            setItem({...item, short: value, cShort: coloredShort, long: coloredShort + '{x is here.', keywords: keywords});
        }
        else{            
            setItem({...item, short: value, cShort:value, long: value + '{x is here.', keywords: keywords});
        }
        setToolOpt({...toolOpt, key:keywords.split(' ')[0]});
    }

    const updateGradient = (value: GradientState) =>{
        const newState = {...value, colorList: getColorList(value.pattern, value.random, value.reverse, value.mirror)};
        setGradientState(newState);
        if(value.useGradient && item.short.length > 0){
            const coloredShort = applyPattern(item.short, newState);
            setItem({...item, cShort: coloredShort, long: coloredShort + '{x is here.'});
        }
        else if(!value.useGradient){
            setItem({...item, cShort:item.short, long: item.short + '{x is here.'});
        }
    }

    const updateToolOpt = (value: ToolOption) =>{
        setToolOpt(value);
    }

    const resetGradient = () =>{
        setGradientState(getDefaultGradientState());
    }

    const resetItem = () =>{
        setItem(getDefaultItemDesc());
    }

    const updateItem = (value:ItemDesc) =>{
        if(value.keywords !== item.keywords){
            setToolOpt({...toolOpt, key:value.keywords.split(' ')[0]});
        }
        setItem(value);

    }

    return (
        <StringToolContext.Provider value={{item, gradientState, updateGradient, updateItem, setShortDesc, resetGradient, resetItem, toolOpt, updateToolOpt}}>
                {children}
        </StringToolContext.Provider>
    );
};

export function useStringToolContext(){
    const state = React.useContext(StringToolContext);
    if(state === undefined){
        throw new Error('useStringToolContext must be used with a StringToolContextProvider');
    }

    return state;
} 

export default StringToolContextProvider;