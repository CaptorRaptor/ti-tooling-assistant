import OkLabJson from '@/public/json/ok-lab-color.json';

export type OkLabColor = {
    L: number;
    a: number;
    b: number;
}

export function GetOkLabColor(index:number): OkLabColor | undefined{
    if(index < 0 || index > 255)
        return undefined;
    else
        return OkLabJson[index];
}

export function GetClosestOkLabIndex(color: OkLabColor): number{
    const diffMap = OkLabJson.map((c)=> Math.abs(color.L-c.L)+Math.abs(color.a-c.a)+Math.abs(color.b-c.b));
    return diffMap.lastIndexOf(Math.min(...diffMap));
}

export function ToString(color: OkLabColor): string{
    return `oklab(${color.L} ${color.a} ${color.b})`;
}