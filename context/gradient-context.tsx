'use client'

import React from "react";
import { Gradient } from "@/lib/color";
import { useLocalStorageState, useSessionStorageState } from "@/hooks";

interface GradientContextType{
    storage:Gradient[];
    add: (value:Gradient) => void;
    update:(i:number, value:Gradient) => void;
    remove:(i:number) => void;
    creatorState: GradientCreator;
    updateCreatorState: (state:GradientCreator) => void;
    clearCreatorState: () => void;
}

export type GradientCreator = {
    id: number |undefined;
    name: string;
    pattern: string;
    smoothPattern: boolean;
    length: number | null;
}

export function initialGradientCreator(): GradientCreator{
    return {
        id: undefined, 
        name: 'New Gradient',
        pattern: '',
        smoothPattern:false,
        length: null,
    };
}

export const GradientContext = React.createContext<GradientContextType | undefined>(undefined);

const GradientContextProvider = ({children,}: Readonly<{children: React.ReactNode;}>) =>{
    const [storage, setStorage] = useLocalStorageState<Gradient[]>("gradientStorage", []);
    const [creatorState, setCreatorState] = useSessionStorageState<GradientCreator>('gradientCreator', initialGradientCreator());
    
    const add = (value:Gradient) =>{
        setStorage([...storage, value]);
    };

    const update = (i:number, value:Gradient) =>{
        if(i >= 0 && i < storage.length){
            let newStorage = [...storage];
            newStorage[i] = value;
            setStorage(newStorage);
        }
    };

    const remove = (i:number) =>{
        if(i >= 0 && i < storage.length){
            let newStorage = [...storage];
            if(i === 0)
                newStorage.shift();
            else
                newStorage.splice(i,1);
            
            setStorage(newStorage);
        }
    };

    function getValidId(i:number|undefined){
        return (i !== undefined && i >= 0 && i < storage.length)? i : undefined;
    }

    const updateCreatorState = (newGradientCreator: GradientCreator) =>{
        setCreatorState({...newGradientCreator, id:getValidId(newGradientCreator.id)});
    }

    const clearCreatorState = () =>{
        setCreatorState(initialGradientCreator());
    }

    return (
        <GradientContext.Provider value={{storage, add, update, remove, creatorState, updateCreatorState, clearCreatorState}}>
            {children}
        </GradientContext.Provider>
    );
};

export function useGradientContext(){
    const state = React.useContext(GradientContext);
    if(state === undefined){
        throw new Error('useGradientContext must be used with a GradientContextProvider');
    }

    return state;
} 

export default GradientContextProvider;