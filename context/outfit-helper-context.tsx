'use client'

import React from "react";
import { useSessionStorageState } from "@/hooks";
import { initialOutfitSlots, OutfitSlots } from "@/lib/wear-slots";
import { IsColor, toColorCode } from "@/lib/color";

export type OutfitHelperState = {    
    outfit: OutfitSlots;
    brushColor?: string;
}

interface OutfitHelperContextType {
    state: OutfitHelperState;
    setAllColor: (color: string | null) => void;
    updateOutfit: <K extends keyof OutfitSlots>(key:K, value: OutfitSlots[K]) => void;
    setBrushColor: (color: string) => void;
}

export function initialOutfitHelperState(): OutfitHelperState{
    return {
        outfit: initialOutfitSlots(),
        brushColor: undefined
    };
}

export const OutfitHelperContext = React.createContext<OutfitHelperContextType | undefined>(undefined);

const OutfitHelperContextProvider = ({children,}: Readonly<{children: React.ReactNode;}>) =>{
    const [state, setState] = useSessionStorageState<OutfitHelperState>('outfitState', initialOutfitHelperState());
    
    const setBrushColor = (color: string|undefined) => {
        setState({...state, brushColor:color});
    };
    
    const setAllColor = (color: string | null) => {
        const code = color? toColorCode(color) : null;
        if(code !== null && !IsColor(code))
            return;
        const result :OutfitSlots= {...state.outfit};
        Object.keys(result)
        .map(key => key as keyof OutfitSlots)
        .filter(key => result[key] !== null)
        .forEach(key =>{
            if(Array.isArray(result[key])) {
                for(let i =0; i < result[key].length; i++){
                    for(let j = 0; j < result[key][i].color.length; j++){
                        result[key][i].color[j] = code;
                    }
                }                
            }
            else {
                for(let i =0; i < result[key]!.color.length; i++){
                        result[key]!.color[i] = code;
                }
            }            
        })
        setState({...state, outfit: result});
    };

    const updateOutfit = <K extends keyof OutfitSlots>(key:K, value: OutfitSlots[K]) => {
        setState({...state, outfit: {...state.outfit, [key]: value}});
    };
    
    return (
        <OutfitHelperContext.Provider value={{state, updateOutfit, setAllColor, setBrushColor}}>
            {children}
        </OutfitHelperContext.Provider>
    );
};

export function useOutfitHelperContext(){
    const state = React.useContext(OutfitHelperContext);
    if(state === undefined){
        throw new Error('useAsciiDrawContext must be used with a AsciiDrawContextProvider');
    }

    return state;
} 

export default OutfitHelperContextProvider;