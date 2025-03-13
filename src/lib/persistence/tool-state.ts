import { getDefaultPatternOptions, PatternOptions, ApplyMode, getDefaultApplyMode, getDefaultPreset } from "../color";
import { getDefaultItemDesc, getDefaultToolOption, ItemDesc, ToolOption } from "../item";

export type ToolState = {
    item: ItemDesc;
    toolOpt: ToolOption;
    gradient: string;
    patternOpt: PatternOptions;
    pattern: string;
    applyMode: ApplyMode;
}

export function getDefaultToolState(){
    return {
        colorList: [],
        item: getDefaultItemDesc(),
        toolOpt: getDefaultToolOption(),
        gradient: getDefaultPreset().name,
        patternOpt: getDefaultPatternOptions(),
        pattern: getDefaultPreset().colors,
        applyMode: getDefaultApplyMode()
    };
}

export function updateToolState<KeyType extends keyof ToolState>(state:ToolState, key: KeyType, value: ToolState[KeyType]): ToolState {
    let newState={
        ...state
    };
    newState[key] = value;
    return newState;
}