'use client'

import dynamic from "next/dynamic";

const StringToolContextProvider = dynamic(() =>import('./string-tool-context'), {ssr:false});
const GradientContextProvider = dynamic(() =>import('./gradient-context'), {ssr:false});
const ItemContextProvider = dynamic(() =>import('./item-context'), {ssr:false});
const AsciiDrawContextProvider = dynamic(() =>import('./ascii-draw-context'), {ssr:false});
const OutfitHelperContextProvider = dynamic(() =>import('./outfit-helper-context'), {ssr:false});

export default function AppWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
    return (
        <StringToolContextProvider>
            <GradientContextProvider>
                <ItemContextProvider>
                    <AsciiDrawContextProvider>
                        <OutfitHelperContextProvider>
                            {children}
                        </OutfitHelperContextProvider>
                    </AsciiDrawContextProvider>
                </ItemContextProvider>
            </GradientContextProvider>
        </StringToolContextProvider>
    );
}