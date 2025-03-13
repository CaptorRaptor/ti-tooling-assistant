import { IsColor } from "./color-lookup";
import { getToken } from "./color-pattern";

export type PatternOptions =
{
    reverse:boolean;
    random:boolean;
    symetrical: boolean;
}

export function getDefaultPatternOptions(): PatternOptions{
    return {
        reverse: false,
        random: false,
        symetrical: false,
    };
}

export function getColorList(colors:string, opt:PatternOptions= getDefaultPatternOptions()):string[]
{
    let colorlist = colors?.trim().replaceAll(']', '').replaceAll('[', '').split(' ').filter((c)=> c.length > 0)??[];
    colorlist = colorlist.filter(c => IsColor(getToken(c).color));
    if (opt.random) { shuffle(colorlist);}  
    if (opt.reverse) { colorlist = colorlist.slice().reverse(); }
    if(opt.symetrical) {
        let colorlistrev = colorlist.slice().reverse();
        colorlist = colorlist.concat(colorlistrev);
    }
    return colorlist;
}

function shuffle(array:string[]) { array.sort(() => Math.random() - 0.5);}