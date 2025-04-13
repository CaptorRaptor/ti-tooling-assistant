import colorIndexMap from '@/public/json/color-map.json'
import { GetOkLabColor, ToString } from './ok-lab'

const bgColorRegex = /^<[A-F][A-F][A-F]>$/
const colorRegex = /^<[a-f][a-f][a-f]>$/
const grayRegex = /^<g[0-2][0-9]>$/
const bgGrayRegex = /^<G[0-2][0-9]>$/
const origRegex = /^<h[0-1][0-9]>$/
const bgOrigRegex = /^<H[0-1][0-9]>$/

const LetterColor = /^[{}][a-z]$/
const BoldLetterColor = /^[{}][A-Z]$/
const NumberColor = /^[{}][0-9]$/

export function getColorIndex(token: string) :number
{   
    const code = token.toLowerCase()
    let result : number = -1
    if (colorRegex.test(code)){
        result = 16 + ((parseInt(code[1], 36) - 10) * 36) + ((parseInt(code[2], 36) - 10)  * 6) + (parseInt(code[3], 36) - 10)
    }
    else if(grayRegex.test(code)){
        result = 232 + (+code[2]* 10)+ +code[3]
        if(result >= 256) result = -1
    }
    else if(origRegex.test(code))
    {
        result = (+code[2]* 10)+ +code[3]
        if(result >= 16) result = -1
    }
    else if(LetterColor.test(token)){
        result = colorIndexMap.AlphabetColorsDark[(parseInt(code[1], 36) - 10)]
    } 
    else if(BoldLetterColor.test(token)){
        result = colorIndexMap.AlphabetColorsBold[(parseInt(code[1], 36) - 10)]
    } 
    else if(NumberColor.test(token)){
        result = colorIndexMap.NumberColors[+code[1]]
    }
    return result
}

const ConvertMap = ['<aaa>', '<caa>', '<aca>', '<cca>', '<aac>', '<cac>','<acc>', '{w', '<g11>', '<faa>', '<afa>', '<ffa>', '<aaf>', '<faf>','aff', '<fff>'];

export function getIndexColor(index: number, bgColor: boolean): string{
    if (index === -1) return '{x';
    else if(index < 16){
        return ConvertMap[index];
    }
    else if(index < 232){
        const r = Math.floor((index-16)/36);
        const g = Math.floor((index-16-(r*36))/6);
        const b = index-16-(r*36)-(g*6);
        const offset = bgColor? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
        return `<${String.fromCharCode(offset+r)}${String.fromCharCode(offset+g)}${String.fromCharCode(offset+b)}>`;
    }
    else if(index < 256) return `<${bgColor? 'G':'g'}${index-232 < 10? '0':''}${index-232}>`;
    else return '';
}

function isBackground(token: string): boolean
{
    return bgColorRegex.test(token) 
        || bgGrayRegex.test(token) 
        || bgOrigRegex.test(token)
        || token[0] ==='}'
}

export function toCSSColor(input : string, xtermOn: boolean) : string | undefined
{
    let index = getColorIndex(input);
    if(index < 0 || index > 256) 
        return undefined
    
    index = xtermOn? index : colorIndexMap.XtermLookup[index];
    const color = GetOkLabColor(index); 
    return ToString(color!);
}

const CharacterLookUp: {[id:string]: string} = {
    '/':'\n\r',
    '-': '~',
    '(': '<',
    ')': '>',
    '@': '$',
    '\n': '\n',
    ' ': ' ',
    '}': '}',
    '{': '{',
    '[': '[',
    ']': ']',
    ':': ':',
    '|': '|'
}

const ReverseCharacterLookUp: {[id:string]: string} = {
    '~': '{-',
    '<': '{(',
    '>': '{)',
    '&lt;': '{(',
    '&gt;': '{(',
    '$': '{@',
    '\n': '\n',
    ' ': ' ',
    '}': '{}',
    '{': '{{',
    '[': '{[',
    ']': '{]',
    ':': '{:',
    '|': '{|',
    '\´': '\''
}


/**
 * replaces special characters with escaped { versions. Needs to be done before coloring.
 * @param text single character
 */
export function escapeSpecialCharacter(text: string): string
{
    if(ReverseCharacterLookUp[text] == null) return text;
    return ReverseCharacterLookUp[text];
}

const colorSplit = /(<[A-F][A-F][A-F]>)|(<[a-f][a-f][a-f]>)|(<g[0-2][0-9]>)|(<h[0-1][0-9]>)|(<G[0-2][0-9]>|(<H[0-1][0-9]>)|([{}].))/

export function splitInput(input: string): string[]{
    return [input].flatMap(part => part.split(/(<[a-f][a-f][a-f]>)/g))
        .flatMap(part => part.split(/(<[A-F][A-F][A-F]>)/g))
        .flatMap(part => part.split(/(<g[0-2][0-9]>)/g))
        .flatMap(part => part.split(/(<G[0-2][0-9]>)/g))
        .flatMap(part => part.split(/(<h[0-1][0-9]>)/g))
        .flatMap(part => part.split(/(<H[0-1][0-9]>)/g))
        .flatMap(part => part.split(/([{}].)/g))
}

export type ColorPair = {
    color: string;
    bgColor: string;
}

export type TransparentColorPair = {
    color?: string;
    bgColor?: string;
}

export function IsColor(token: string): boolean{
    if(!colorSplit.test(token)){
        return false;
    }
    else if(token === '{x' || token === '}x')
        return true;
    
    const index = getColorIndex(token)
    if(index < 0 || index > 256) return false;
    return true;
}

export function interpretToken(token: string, xtermOn: boolean): string | TransparentColorPair
{
    if(!colorSplit.test(token)){
        return token;
    }
    const color: string|undefined = toCSSColor(token, xtermOn)
    if(color!== undefined)
    {
        if(isBackground(token)) 
            return {color:undefined, bgColor:color}
        else 
            return {color:color, bgColor:undefined}
    }
    else if(token[0]==='{' || token[0]==='}')
    {
        if(token[1] ==='x' || token[1] === 'X'){
            return {color: defaultFg, bgColor:defaultBg}
        }
        else if(CharacterLookUp[token[1]] !== undefined)
            return CharacterLookUp[token[1]]
        return ''
    }
    else{
        return token.substring(1)
    }
}

export function overlayColor(currentColor: ColorPair, overlay: TransparentColorPair) :ColorPair
{
    return {color: overlay.color ?? currentColor.color, bgColor: overlay.bgColor ?? currentColor.bgColor }
}

export const defaultFg:string = ToString(GetOkLabColor(7)!);
export const defaultBg:string = ToString(GetOkLabColor(0)!);
