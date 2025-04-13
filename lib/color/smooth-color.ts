import { getColorIndex, getIndexColor } from "./color-lookup";
import { getToken } from "./color-pattern";
import { GetClosestOkLabIndex, GetOkLabColor } from "./ok-lab";

function smoothColors(start: string, end:string, numberOfColors: number): string[]{
    if(numberOfColors < 1) return [];
    
    const startColor = GetOkLabColor(getColorIndex(start));
    const endColor = GetOkLabColor(getColorIndex(end));
    if(startColor === undefined || endColor ===undefined)
        return [];

    const lValsArr = getLerpRange(startColor.L, endColor.L, numberOfColors);
    const aValsArr = getLerpRange(startColor.a, endColor.a, numberOfColors);
    const bValsArr = getLerpRange(startColor.b, endColor.b, numberOfColors);
    const result = [];
    for (let i = 1; i < numberOfColors-1; i++) {
        const tmpOklabVals = { L: lValsArr[i], a: aValsArr[i], b: bValsArr[i] };
        const index = GetClosestOkLabIndex(tmpOklabVals);
        result.push(getIndexColor(index, false));
    }
    return result;
}

function getLerpRange(min:number, max:number, N:number): number[] {
    const dividend = (max - min) / (N-1);
    const arr = [];
    let currentVal = min;
    for (let i = 0; i < N; i++) {
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
        const smooth = smoothColors(codes[i-1].color, codes[i].color, numberOfColors);
        result = result.concat(smooth.map((c)=> (c.startsWith('<')? c.substring(1,4): c)).join(' ')+' ');
        result = result.concat(rawCodes[i]+' ');
    }
    return result;
}
