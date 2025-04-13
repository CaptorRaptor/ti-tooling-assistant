import { ColorToken, getToken, interpretToken, TransparentColorPair } from "@/lib/color";
import ColorStrip from "./color-strip";

interface GradientStripProps{
    className?: string;
    value: string[];
}

export default function GradientStrip({className, value} : GradientStripProps){
    const colors = value.map<ColorToken>(c => getToken(c))
        .map<string[]>(t => t.length === undefined? [t.color] : Array(t.length).fill(t.color))
        .reduce((acc, v) =>{
            return [...acc, ...v];        
        }, [])
        .map(c => interpretToken(c, true))
        .filter(color => typeof color !== 'string')
        .map(c => (c as TransparentColorPair).color ?? (c as TransparentColorPair).bgColor)
        .filter(c => c !== undefined);
    return (
        <ColorStrip value={colors} className={className}/>
    );
}