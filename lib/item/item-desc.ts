import WordFilterList from '@/public/json/word-filter.json'
import { ExtendedDesc, formatExtendedDesc } from "./extended";
import { formatSpecialExtendedDesc, SpecialExtendedList } from "./special-extended";
import { getToolCommand, ToolOption } from "./tool-option";
import { reduceColorCodes, removeColor } from '../color';

export type ItemDesc = {
    short:string;
    cShort: string;
    long : string;
    keywords: string;
    extendedDescList: ExtendedDesc[];
    special: SpecialExtendedList;
}

export function getDefaultItemDesc():ItemDesc{
    return {        
        short: '',
        cShort: '',
        long : '',
        keywords: '',
        extendedDescList: [],
        special:{
            self: undefined,
            others: undefined,
            eat: undefined,
            taste: undefined,
            apply: undefined,
            shopInfo: undefined,
            descCloak: undefined,
            cup: undefined,
            header: undefined,
            wear: undefined,
            smell: undefined,
            smoke: undefined,
            use: undefined
        }
    };
}

export function filterKeywords(word: string):boolean{
    if(word.length <=0 ) 
        return false;
    
    const keyIndex =Object.keys(WordFilterList).indexOf(word[0]);
    if(keyIndex === -1)
        return true;

    const wordIndex = Object.values(WordFilterList)[keyIndex].indexOf(word);
    return wordIndex === -1;
}

export function getKeywords(short:string):string{
    return removeColor(short).split(' ').map((w)=>{return w.replace(/[^\w]/g, '')}).filter((w)=>{return filterKeywords(w)}).join(' ')
}

export function getToolResult(item: ItemDesc, opt: ToolOption){
    const extendedKeys = opt.addKeywords? item.extendedDescList
        .filter((e)=>e.keywords.length > 0)
        .map(e => e.keywords)
        .filter(k => item.keywords !== k) : [];
    const keyword = item.keywords + (extendedKeys.length > 0? ' ' + extendedKeys.join(' '): '');
    const target = opt.key.length > 0? opt.key : item.keywords.split(' ')[0];
    const eol = opt.lineSeparator.length === 0? '\n' : opt.lineSeparator;
    const extendedDescs = item.extendedDescList.map(e => formatExtendedDesc(e, target, opt)).join(eol);
    const specialDesc = formatSpecialExtendedDesc(item.special, target, opt);
    const command = getToolCommand(opt.isRestring);
    return [
        `${command} ${opt.all?'all.':''}${target} short ${opt.reduceColor? reduceColorCodes(item.cShort): item.cShort}`,
        `${command} ${opt.all?'all.':''}${target} long ${opt.reduceColor? reduceColorCodes(item.long) : item.long}`,
        extendedDescs,
        specialDesc,
        `${command} ${opt.all?'all.':''}${target} keyword ${keyword}`
    ].filter(t => t.length > 0).join(eol);
}