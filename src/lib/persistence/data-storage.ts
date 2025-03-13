import { Gradient } from "../color";
import { AsciiArtState, getDefaultAsciiArtState } from "./ascii-art-state";
import { getDefaultGradientState, GradientState } from "./gradient-state";
import { getDefaultToolState, ToolState } from "./tool-state";


const toolStateSaveName = 'tool-state';
const gradientStateSaveName = 'gradient-state';
const asciiArtStateSaveName = 'ascii-art-state';
const savedItemListSaveName = 'item-storage';
const customGradientListSaveName = 'custom-gradients'

export type ItemSave = ToolState & {name: string};

export type PageState = {
    toolState: ToolState;
    gradientState:GradientState;
    asciiArtState: AsciiArtState;
    customGradientList: Gradient[];
    savedItemList: ItemSave[];
}

export function getDefaultPageState():PageState{
    return {
        toolState: getDefaultToolState(),
        gradientState: getDefaultGradientState(),
        asciiArtState: getDefaultAsciiArtState(),
        customGradientList: [],
        savedItemList: []
    }
}

export function updatePageState<KeyType extends keyof PageState>(state:PageState, key: KeyType, value: PageState[KeyType]): PageState {
    let newState={
        ...state
    };
    newState[key] = value;
    return newState;
}

export function LoadData():PageState{
    const toolStateString = window.sessionStorage.getItem(toolStateSaveName);
    const toolState = (toolStateString!== null && toolStateString !== '')? JSON.parse(toolStateString) : getDefaultToolState();
    
    const gradientStateString = window.sessionStorage.getItem(gradientStateSaveName);
    const gradientState = (gradientStateString!== null && gradientStateString !== '')? JSON.parse(gradientStateString) : getDefaultGradientState();

    const asciiArtStateString = window.sessionStorage.getItem(asciiArtStateSaveName);
    const asciiArtState = (asciiArtStateString!== null && asciiArtStateString !== '')? JSON.parse(asciiArtStateString) : getDefaultAsciiArtState();

    const gradientListString = window.localStorage.getItem(savedItemListSaveName);
    const gradientList = (gradientListString!== null && gradientListString !== '')? JSON.parse(gradientListString) : [];

    const itemListString = window.localStorage.getItem(customGradientListSaveName);
    const itemList = (itemListString!== null && itemListString !== '')? JSON.parse(itemListString) : [];;

    return {
        toolState: toolState,
        gradientState: gradientState,
        asciiArtState: asciiArtState,
        customGradientList: gradientList,
        savedItemList: itemList
    };
}

export function SaveData(state: PageState){
    window.sessionStorage.setItem(toolStateSaveName,  JSON.stringify(state.toolState));
    window.sessionStorage.setItem(gradientStateSaveName,  JSON.stringify(state.gradientState));
    window.sessionStorage.setItem(asciiArtStateSaveName,  JSON.stringify(state.asciiArtState));
    window.localStorage.setItem(savedItemListSaveName,  JSON.stringify(state.savedItemList));
    window.localStorage.setItem(customGradientListSaveName,  JSON.stringify(state.customGradientList));
}