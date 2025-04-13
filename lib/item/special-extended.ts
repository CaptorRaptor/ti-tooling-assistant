import { formatExtendedDesc } from "./extended";
import { ToolOption } from "./tool-option";

export type SpecialExtendedList = {
    self?: string;
    others?: string;
    eat?: string;
    taste?: string;
    apply?: string;
    shopInfo?: string;
    descCloak?: string;
    cup?: string;
    header?: string;
    headerText?: string;
    footer?: string;
    footerText?: string;
    wear?: string;
    smell?: string;
    smoke?: string;
    use?: string;
};

const KeywordLookup:{[id:string]: string} = {
    'self': '@self',
    'others': '@others',
    'eat': '@eat',
    'taste': '@taste',
    'apply': '@apply',
    'shopInfo': '@shop_info',
    'descCloak': '@desc_cloak',
    'cup': '@cup',
    'header': '@header',
    'headerText': '@header_text',
    'footer': '@footer',
    'footerText': '@footer_text',
    'wear': '@wear',
    'smell': '@smell',
    'smoke': '@smoke',
    'use': '@use'
};

const LabelLookup:{[id:string]: string} = {
    'self': 'For items that can be used, displays what is seen by the user.',
    'others': 'For items that can be used, displays what is seen by others.',
    'eat': 'Shown to others when an item is eaten.',
    'taste': 'Shown to the player when an item is eaten, typically flavors.',
    'apply': 'Appends to the end of the user\'s description when item is applied.',
    'shopInfo': 'Displays when an item is appraised with \'appraise shop\'.',
    'descCloak': 'For hooded cloaks, displays as player\'s desc when concealed.',
    'cup': 'For cup sets, cups served from it will display this as their string.',
    'header': 'For stationery objects, becomes the header when used with a courier profile.',
    'headerText': 'Screenreader-friendly header.',
    'footer': 'For seal objects, becomes the footer when used with a courier profile.',
    'footerText': 'Screenreader-friendly footer.',
    'wear': 'Starts with #, provides a custom message when a player wears the object. To use, place #[what the wearer sees] and #[what everyone else sees] on separate lines.',
    'smell': 'Optional text for when an item is sniffed.',
    'smoke': 'Custom smoke when smokable item is used.',
    'use': 'Starts with #, extended version of @self/others. Randomly selects a message if there are multiple @uses on the object. Takes #others and #self on separate lines, like @wear.'
};

export function getSpecialExtendedLabel(key: SpecialExtendedKey){
    return LabelLookup[key];
}

const HelpInfoLookup:{[id:string]: string|undefined} = {
    'self': '$n for PC\'s name, $e for he/she/they/it, $s for his/her/their/its, $m for him/her/them/it',
    'others': '$n for PC\'s name, $e for he/she/they/it, $s for his/her/their/its, $m for him/her/them/it',
    'eat': '$n for PC\'s name, $e for he/she/they/it, $s for his/her/their/its, $m for him/her/them/it',
    'taste': '$n for PC\'s name, $e for he/she/they/it, $s for his/her/their/its, $m for him/her/them/it',
    'apply': '$n for PC\'s name, $e for he/she/they/it, $s for his/her/their/its, $m for him/her/them/it',
    'shopInfo': undefined,
    'descCloak': 'All hooded cloaks must have one of these.',
    'cup': 'Must be 59 characters or less.',
    'header': undefined,
    'headerText': undefined,
    'footer': undefined,
    'footerText': undefined,
    'wear': '$n for PC\'s name, $e for he/she/they/it, $s for his/her/their/its, $m for him/her/them/it',
    'smell': '$n for PC\'s name, $e for he/she/they/it, $s for his/her/their/its, $m for him/her/them/it',
    'smoke': undefined,
    'use': '$n for PC\'s name, $e for he/she/they/it, $s for his/her/their/its, $m for him/her/them/it'
};

export function getSpecialExtendedHelpInfo(key: SpecialExtendedKey){
    return HelpInfoLookup[key];
}

export function getSpecialExtendedKeyword(key: SpecialExtendedKey){
    return KeywordLookup[key];
}

export type SpecialExtendedKey = keyof SpecialExtendedList;

export function formatSpecialExtendedDesc(sp:SpecialExtendedList, target:string, opt: ToolOption){
    const formatSp = (k:SpecialExtendedKey) => {
        return (sp[k] !== undefined? formatExtendedDesc({keywords:getSpecialExtendedKeyword(k), desc: sp[k]!}, target, opt)
        : '');
    };
    
    const eol = opt.lineSeparator.length === 0? '\n' : opt.lineSeparator;
    return Object.keys(sp).map(k => formatSp(k as SpecialExtendedKey)).filter(text => text.length >0).join(eol);
}