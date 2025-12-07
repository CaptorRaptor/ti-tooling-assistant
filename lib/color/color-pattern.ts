import patternJson from '@/public/json/color-patterns.json'
import { escapeSpecialCharacter, IsColor } from './color-lookup';
import { GradientState } from '../gradient-state';

const PresetList:Gradient[] = patternJson;

export type ApplyMode= 'normal'
| 'stretch';

export function getDefaultApplyMode():ApplyMode{
    return getAllApplyModes()[0]
}

export function getAllApplyModes():ApplyMode[]{
    return [
        'normal',
        'stretch'
    ];
}

export type Gradient={
    name: string,
    colors: string
}

export function getPresets(): Gradient[]{
    return PresetList;
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

export function getColorList(colors:string, random:boolean = false, reverse:boolean = false, mirror:boolean = false):string[]
{
    let colorlist = colors?.trim().replaceAll(']', '').replaceAll('[', '').split(' ').filter((c)=> c.length > 0)??[];
    colorlist = colorlist.filter(c => IsColor(getToken(c).color));
    if (random) { shuffle(colorlist);}  
    if (reverse) { colorlist = colorlist.slice().reverse(); }
    if(mirror) {
        const colorlistrev = colorlist.slice().reverse();
        colorlist = colorlist.concat(colorlistrev);
    }
    return colorlist;
}

function shuffle(array:string[]) { array.sort(() => Math.random() - 0.5);}

function applyColors(a:string[], tokens:ColorToken[]): string[]{
    let idx = 0;
    let i = 0;
    while (idx <= a.length && i < tokens.length) {
        const token = tokens[i];
        a.splice(idx, 0, token.color);
        i += 1;
        idx += (token.length??1) + 1;
        if(i === tokens.length)
            i = 0;
    } 
    return a;
}

function stretchColors(length:number, colors:ColorToken[], keepLength:boolean = false): ColorToken[]{
    if(keepLength){
        const uncoloredLength = length-(colors.filter((c)=>c.length !== undefined).map((c)=>c.length!).reduce((sum, l)=> sum+l, 0));
        const numberOfStretchCodes =  colors.filter((c)=>c.length === undefined).length;
        let stretchLength = uncoloredLength/numberOfStretchCodes;
        stretchLength = stretchLength< 0? 0 : stretchLength;
        return colors.map((c) => {return {color: c.color, length: c.length ?? stretchLength}})
    }
    else{
        const clength = colors.map((c)=>c.length ??1).reduce((sum, l)=> sum+l, 0);
        const freq = length / clength;
        return colors.map(c => {return {...c, length: (c.length??1)*freq}});
    }
}

export function applyPattern(text:string, gradientState: GradientState) : string
{
    if(text.length === 0) return text;
    // TODO: Add suspension for color here
    
    let letters = Array.from(text).map(c => escapeSpecialCharacter(c));
    let colors = gradientState.colorList.map<ColorToken>(c => getToken(c));
    
    if(gradientState.applyMode === 'normal' && gradientState.skipSpace){
        letters = (letters.join('').match(/\S\s*/g) ?? []);
    }
    else if (gradientState.applyMode === 'stretch'){
        colors = stretchColors(text.length, colors, gradientState.keepLength)
    }
    return applyColors(letters, colors).join('');
};