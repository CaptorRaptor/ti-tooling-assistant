import { ColorPair, defaultBg, defaultFg, interpretToken, IsColor, overlayColor, splitInput } from "./color-lookup";

export type ColoredText =
{
    text: string;
    colors: ColorPair;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = <T = any>(str: string | T): str is string => {
    return typeof str === "string";
};

export function toColoredText(input:string | string[], xtermOn: boolean): ColoredText[]{
    input = typeof input === 'string' ? [input] : input;
    let currColor = {color: defaultFg, bgColor: defaultBg}
    const colors = splitInput(input.join('')).filter(token => token != null);
    const result = colors.reduce<ColoredText[]>((acc, n) => {
        const ct = interpretToken(n, xtermOn)
        if(isString(ct)){
            const edit = acc.pop();
            edit!.text = edit!.text.concat(ct)
            acc.push(edit!)
        }
        else{
            currColor = overlayColor(currColor, ct)
            acc.push({text:'', colors: currColor})
        }
        return acc;      
    }, [{text: '', colors: {color: defaultFg, bgColor: defaultBg}}])    
    return result.filter(ct=>ct.text.length > 0)
}

export function removeColor(input:string | string[]): string{
    input = typeof input === 'string' ? [input] : input;
    const colors = splitInput(input.join('')).filter(token => token != null);
    const result = colors.reduce<string>((acc, n) => {
        const ct = interpretToken(n, true);
        if(isString(ct)){
            acc = acc.concat(ct);
        }
        return acc;      
    }, '');    
    return result;
}

export function reduceColorCodes(input:string | string[]):string{
    input = typeof input === 'string' ? [input] : input;
    const colors = splitInput(input.join('')).filter(token => token != null);
    const result = [];
    let color, oldColor;
    for(let i = 0; i < colors.length; i++){
        if(IsColor(colors[i])){
            color = colors[i];
        }
        else if(colors[i].length > 0){
            if(oldColor !== color)
                result.push(color);
            result.push(colors[i]);
            oldColor = color;
            color = '';
        }
    }
    return result.join('');
}

export function extractColorCodes(input:string | string[], countLength:boolean =false):string{
    input = typeof input === 'string' ? [input] : input;
    const colors = splitInput(input.join('')).filter(token => token != null);
    const result = [];
    let length = 0;
    for(let i = 0; i < colors.length; i++){
        if(IsColor(colors[i])){
            if(countLength)
                result.push(`#${length}`);
            result.push(' ' + (colors[i].startsWith('<')? colors[i].substring(1, 4) : colors[i]));
            length = 0;
        }
        else if(countLength){
            length += colors[i].length;
        }
    }
    if(countLength){
        if(result[0].startsWith('#'))
            result.shift();
        if(!result[result.length-1].startsWith('#'))
            result.push(`#${length}`);
    }
    return result.join('').trim();
}