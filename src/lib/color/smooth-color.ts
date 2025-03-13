import OkLabJson from '../../data/ok-lab-color.json';
import { getColorIndex, getIndexColor } from "./color-lookup";
import { getToken } from "./color-pattern";

type OkLabColor = {
    L: number;
    a: number;
    b: number;
}

const okLabLookUp:OkLabColor[] = OkLabJson;

function getClosestOkLabIndex(color: OkLabColor): number{
    const diffMap = OkLabJson.map((c)=> Math.abs(color.L-c.L)+Math.abs(color.a-c.a)+Math.abs(color.b-c.b));
    return diffMap.lastIndexOf(Math.min(...diffMap));
}

function smoothColors(start: string, end:string, numberOfColors: number): string[]{
    if(numberOfColors < 1) return [];
    
    const startIndex = getColorIndex(start);
    const endIndex = getColorIndex(end);
    if(startIndex < 0 || startIndex > 256 || endIndex < 0 || endIndex > 256)
        return [];

    const startColor = okLabLookUp[startIndex];
    const endColor = okLabLookUp[endIndex];
    const lValsArr = getLerpRange(startColor.L, endColor.L, numberOfColors);
    const aValsArr = getLerpRange(startColor.a, endColor.a, numberOfColors);
    const bValsArr = getLerpRange(startColor.b, endColor.b, numberOfColors);
    let result = [];
    for (var i = 1; i < numberOfColors-1; i++) {
        const tmpOklabVals = { L: lValsArr[i], a: aValsArr[i], b: bValsArr[i] };
        const index = getClosestOkLabIndex(tmpOklabVals);
        result.push(getIndexColor(index, false));
    }
    return result;
}

function getLerpRange(min:number, max:number, N:number): number[] {
    const dividend = (max - min) / (N-1);
    let arr = [];
    let currentVal = min;
    for (var i = 0; i < N; i++) {
        arr.push(currentVal);
        currentVal += dividend;
    }
    return arr;
}

export function smoothPattern(pattern: string, numberOfLetters:number): string{
    const rawCodes = pattern.split(' ');
    const codes = rawCodes.map((c)=> getToken(c));
    const length = codes.map((c)=>c.length ?? 1).reduce((sum, l)=> sum+l, 0);
    if(length >= numberOfLetters)
    {
        let l = 0;
        let result = '';
        for(let i = 0; i < codes.length; i++){
            result = result.concat(rawCodes[i]+' ');
            l += codes[i].length??1;
            if(l >= numberOfLetters)
                break;
        }
        return result.trim();
    }

    const numberOfColors = (numberOfLetters-length+codes.length)/(codes.length-1);
    let result = rawCodes[0]+' ';
    for(let i = 1; i < codes.length; i++){
        let smooth = smoothColors(codes[i-1].color, codes[i].color, numberOfColors);
        result = result.concat(smooth.map((c)=> (c.startsWith('<')? c.substring(1,4): c)).join(' ')+' ');
        result = result.concat(rawCodes[i]+' ');
    }
    return result;
}
