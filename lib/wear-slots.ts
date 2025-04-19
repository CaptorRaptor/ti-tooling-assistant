export type OutfitItem = {
    key: string;
    short: string;
    color: (string | null)[];
};

export type OutfitSlots = {
    light:      OutfitItem   | null;
    head:       OutfitItem[] | null;
    ears:       OutfitItem[] | null;
    face:       OutfitItem[] | null;
    neck:       OutfitItem[] | null;
    cloakpin:   OutfitItem   | null;
    shoulder:   OutfitItem[] | null;
    arms:       OutfitItem[] | null;
    leftWrist:  OutfitItem[] | null;
    rightWrist: OutfitItem[] | null;
    hands:      OutfitItem[] | null;
    leftFinger: OutfitItem[] | null;
    rightFinger:OutfitItem[] | null;
    wieldRight: OutfitItem   | null;
    wieldLeft:  OutfitItem   | null;
    heldRight:  OutfitItem   | null;
    helddLeft:  OutfitItem   | null;
    shield:     OutfitItem   | null;
    torso:      OutfitItem[] | null;
    body:       OutfitItem   | null;
    waist:      OutfitItem[] | null;
    legs:       OutfitItem[] | null;
    ankles:     OutfitItem[] | null;
    feet:       OutfitItem[] | null;
};

export function initialOutfitSlots() : OutfitSlots{
    return {        
        light: null,
        head: null,
        ears: null,
        face: null,
        neck: null,
        cloakpin: null,
        shoulder: null,
        arms: null,
        leftWrist: null,
        rightWrist: null,
        hands: null,
        leftFinger: null,
        rightFinger: null,
        wieldRight: null,
        wieldLeft: null,
        heldRight: null,
        helddLeft: null,
        shield: null,
        torso: null,
        body: null,
        waist: null,
        legs: null,
        ankles: null,
        feet: null,
    };
}

export function getWearSlot(key: keyof OutfitSlots) :string{
    switch(key){
        case 'leftWrist': return 'left wrist';
        case 'rightWrist': return 'right wrist';
        case 'leftFinger': return 'left finger';
        case 'rightFinger': return 'right finger';
        case 'wieldRight': return 'wielded right';
        case 'wieldLeft': return 'wielded left';
        case 'heldRight': return 'held';
        case 'helddLeft': return 'held in off-hand';
        case 'body': return 'about body';
        default: return key;
    };
}

export function getNewSlot<K extends keyof OutfitSlots>(key: K) : OutfitSlots[K]{
    const newItem: OutfitItem = {key: '', color: [], short:''};
    const newList: OutfitItem[] = [{key: '', color: [], short:''}];

    switch(key){
        case 'light' : return newItem as OutfitSlots[K];
        case 'head' : return newList as OutfitSlots[K];
        case 'ears' : return newList as OutfitSlots[K];
        case 'face' : return newList as OutfitSlots[K];
        case 'neck' : return newList as OutfitSlots[K];
        case 'cloakpin' : return newItem as OutfitSlots[K];
        case 'shoulder' : return newList as OutfitSlots[K];
        case 'arms' : return newList as OutfitSlots[K];
        case 'leftWrist' : return newList as OutfitSlots[K];
        case 'rightWrist' : return newList as OutfitSlots[K];
        case 'hands' : return newList as OutfitSlots[K];
        case 'leftFinger' : return newList as OutfitSlots[K];
        case 'rightFinger' : return newList as OutfitSlots[K];
        case 'wieldRight' : return newItem as OutfitSlots[K];
        case 'wieldLeft' : return newItem as OutfitSlots[K];
        case 'heldRight' : return newItem as OutfitSlots[K];
        case 'helddLeft' : return newItem as OutfitSlots[K];
        case 'shield' : return newItem as OutfitSlots[K];
        case 'torso' : return newList as OutfitSlots[K];
        case 'body' : return newItem as OutfitSlots[K];
        case 'waist' : return newList as OutfitSlots[K];
        case 'legs' : return newList as OutfitSlots[K];
        case 'ankles' : return newList as OutfitSlots[K];
        case 'feet' : return newList as OutfitSlots[K];
        default: 
            return null;
    }
}

export function toShort(item: OutfitItem):string
{
    let short = '';
    const chars = item.short.split('');
    for(let i = 0; i < chars.length; i++){
        if(i < item.color.length && item.color[i] !== null){
            short += item.color[i]!;
        }
        short += chars[i];
    }
    return short;    
}

function toShortBlock(items: OutfitItem[] | null, prefix:string = ''):string {
    if(items === null || items.length <= 0) return '';

    let result = `${prefix}${toShort(items[0])}\n`;
    for(let i = 1; i < items.length; i++){
        result += `                     ${toShort(items[i])}\n`;
    }
    return result;
}

export function ToDisplay(outfit: OutfitSlots): string
{
    let result = outfit.light? toShortBlock([outfit.light],    '{R{({cused as a light{R{){x    ') : '';
    result += toShortBlock(outfit.head,  '{R{({cworn on head{R{){x       ');
    result += toShortBlock(outfit.ears,  '{R{({cworn on ears{R{){x       ');
    result += toShortBlock(outfit.face,  '{R{({cworn over the face{R{){x ');
    result += toShortBlock(outfit.neck,  '{R{({cworn around neck{R{){x   ');
    result += outfit.cloakpin? toShortBlock([outfit.cloakpin],    '{R{({cworn as cloak pin{R{){x  ') : '';
    result += toShortBlock(outfit.neck,  '{R{({cworn over shoulder{R{){x ');
    result += toShortBlock(outfit.arms,  '{R{({cworn on arms{R{){x       ');
    result += toShortBlock(outfit.leftWrist,  '{R{({cworn, left wrist{R{){x   ');
    result += toShortBlock(outfit.rightWrist,  '{R{({cworn, right wrist{R{){x  ');
    result += toShortBlock(outfit.hands,  '{R{({cworn on hands{R{){x      ');
    result += toShortBlock(outfit.leftFinger,  '{R{({cworn, left finger{R{){x  ');
    result += toShortBlock(outfit.rightFinger,  '{R{({cworn, right finger{R{){x ');
    result += outfit.wieldRight? toShortBlock([outfit.wieldRight],    '{R{({cwielded, right{R{){x     ') : '';
    result += outfit.wieldLeft? toShortBlock([outfit.wieldLeft],    '{R{({cheld, in off hand{R{){x  ') : '';
    // result += outfit.heldRight? toShortBlock([outfit.heldRight],    '') : '';
    // result += outfit.helddLeft? toShortBlock([outfit.helddLeft],    '') : '';
    // result += outfit.shield? toShortBlock([outfit.shield],    '') : '';
    result += toShortBlock(outfit.torso,  '{R{({cworn on torso{R{){x      ');
    result += outfit.body? toShortBlock([outfit.body],    '{R{({cworn about body{R{){x    ') : '';
    result += toShortBlock(outfit.waist,  '{R{({cworn about waist{R{){x   ');
    result += toShortBlock(outfit.legs,  '{R{({cworn on legs{R{){x       ');
    result += toShortBlock(outfit.ankles,  '{R{({cworn on ankles{R{){x     ');
    result += toShortBlock(outfit.feet,  '{R{({cworn on feet{R{){x       ');

    return result;
}