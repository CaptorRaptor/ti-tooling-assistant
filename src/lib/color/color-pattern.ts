import patternJson from '../../data/color-patterns.json'
import { escapeSpecialCharacter } from './color-lookup';

const PresetList:Gradient[] = patternJson;

export type ApplyMode= 
'normal'|
'distributed'|
'stretch';

export function getDefaultApplyMode():ApplyMode{
    return getAllApplyModes()[0]
}

export function getAllApplyModes():ApplyMode[]{
    return [
        'normal',
        'distributed',
        'stretch'
    ];
}

export type Gradient={
    name: string,
    colors: string
}

export function getDefaultPreset():Gradient {
    return PresetList[0];
}

export function getGradientNames(list?: Gradient[]): string[]{
    return [...PresetList, ...(list? list: [])].map((g)=> g.name);
}

export function getGradient(name: string, list?: Gradient[]): Gradient | undefined
{
    const gradientList = [...PresetList, ...(list? list :[])];
    return gradientList.find((p)=>p.name === name);
}

export type ColorToken = {
    color: string;
    length: number|undefined;
}

export function toColorCode(code: string){
    return code.startsWith('{')|| code.startsWith('}')? code : `<${code}>`
}

export function getToken(code:string): ColorToken{
    const indexOfLength = code.indexOf('#')
    if(indexOfLength === -1 || indexOfLength+1 >= code.length) //no length code found
        return {
            color: toColorCode(code),
            length:undefined
        };
    
    const color = toColorCode(code.substring(0,indexOfLength));
    const length = Number.parseInt(code.substring(indexOfLength+1))
    if(Number.isNaN(length) || length === null || length === undefined)
        return {color: color, length:1};
    return {color: color, length:length}    
}

export function getPatternLength(pattern: string):number{
    const rawCodes = pattern.split(' ');
    const codes = rawCodes.map((c)=> getToken(c));
    return codes.map((c)=>c.length ?? 1).reduce((sum, l)=> sum+l, 0);
}

export function applyPattern(text:string, colorlist:string[], mode: ApplyMode) : string
{    
    let freq:number;
    let colors = colorlist.map((c)=> getToken(c));
    if(mode === 'stretch')
    {
        const length = colors.map((c)=>c.length ??1).reduce((sum, l)=> sum+l, 0);
        freq = text.length / length;
    }
    else if(mode === 'distributed')
    {
        freq = 1;
        const uncoloredLength = text.length-(colors.filter((c)=>c.length !== undefined).map((c)=>c.length!).reduce((sum, l)=> sum+l, 0));
        const numberOfStretchCodes =  colors.filter((c)=>c.length===undefined).length;
        let stretchLength = uncoloredLength/numberOfStretchCodes;
        stretchLength = stretchLength< 0? 0 : stretchLength;
        colors = colors.map((c) => {return {color: c.color, length: c.length ?? stretchLength}})
    }
    else {
        freq = 1;
    }   

    // Turn that initial text into an array and escape special characters.
    let textarray = text.split('').map(c => escapeSpecialCharacter(c));

    return insertTokenEveryN(textarray, colors, freq, mode).join('');
}

function insertTokenEveryN(arr:string[], tokens:ColorToken[], n:number, mode: ApplyMode) {
    let a = arr.slice(0);
    let idx = 0;
    let i = 0;
    let advance = 1;
    while (idx <= a.length && i < tokens.length) {
        const token = tokens[i];
        a.splice(idx, 0, token.color);
        i += advance;
        if(mode === 'normal'){
            idx += (token.length??1) + 1;
            if(i === tokens.length)
                i = 0;
        }
        else if(mode === 'stretch'){
            idx += (token.length??1)*n+1;
        }
        else if(mode === 'distributed'){
            idx += (token.length??1)+1;
        }
    } 
    return a;
};