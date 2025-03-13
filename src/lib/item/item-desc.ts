import WordFilterList from '../../data/word-filter.json'
import { ExtendedDesc, formatExtendedDesc } from "./extended";
import { formatSpecialExtendedDesc, SpecialExtendedList } from "./special-extended";
import { getToolCommand, ToolOption } from "./tool-option";

export type ItemDesc = {
    short: string;
    cShort: string;
    long : string;
    keywords: string;
    extendedDescList: ExtendedDesc[];
    special: SpecialExtendedList;
}

export function getDefaultItemDesc(){
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

export function updateItemDesc<KeyType extends keyof ItemDesc>(old: ItemDesc, key: KeyType, value: ItemDesc[KeyType]):ItemDesc{
    let newObject ={
        ...old
    };
    newObject[key] = value;
    return newObject;
}

export function getToolResult(item: ItemDesc, opt: ToolOption){
    const keyword = item.keywords
    + (opt.addKeywords? 
        item.extendedDescList
            .filter((e)=>e.keywords.length > 0)
            .map(e => e.keywords).join(' ') 
        : '');
    const target = opt.key.length > 0? opt.key : item.keywords.split(' ')[0];
    const extendedDescs = item.extendedDescList.map(e => formatExtendedDesc(e, target, opt)).join('\n');
    const specialDesc = formatSpecialExtendedDesc(item.special, target, opt);
    const command = getToolCommand(opt.isRestring);
    const eol = opt.lineSeparator.length === 0? '\n' : opt.lineSeparator;
    return [
        `${command} ${opt.all?'all.':''}${target} short ${item.cShort}`,
        `${command} ${opt.all?'all.':''}${target} long ${item.long}`,
        extendedDescs,
        specialDesc,
        `${command} ${opt.all?'all.':''}${target} keyword ${keyword}`
    ].filter(t => t.length > 0).join(eol);
}