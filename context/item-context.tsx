'use client'

import React from "react";
import { useLocalStorageState } from "@/hooks";
import { ItemDesc } from "@/lib/item";

interface ItemEntry {
    name: string;
    item: ItemDesc;
}

interface ItemContextType{
    storage: ItemEntry[];
    add: (value:ItemEntry) => void;
    update:(i:number, value:ItemEntry) => void;
    remove:(i:number) => void;
}

export const ItemContext = React.createContext<ItemContextType | undefined>(undefined);

const ItemContextProvider = ({children,}: Readonly<{children: React.ReactNode;}>) =>{
    const [storage, setStorage] = useLocalStorageState<ItemEntry[]>("itemStorage", []);

    const add = (value:ItemEntry) =>{
        setStorage([...storage, value]);
    };

    const update = (i:number, value:ItemEntry) =>{
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

    return (
        <ItemContext.Provider value={{storage, add, update, remove}}>
            {children}
        </ItemContext.Provider>
    );
};

export function useItemContext(){
    const state = React.useContext(ItemContext);
    if(state === undefined){
        throw new Error('useItemContext must be used with a ItemContextProvider');
    }

    return state;
} 

export default ItemContextProvider;