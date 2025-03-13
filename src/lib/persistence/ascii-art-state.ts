
export type AsciiArtState = {
    desc: string;
    width: number;
    height: number;
    pattern: string;
    colorList: string[][];
}

export function getDefaultAsciiArtState():AsciiArtState{
    return {
        desc: '',
        width: 75,
        height: 38,
        pattern: '',
        colorList:[],
    };
}

export function updateAsciiArtState<KeyType extends keyof AsciiArtState>(state:AsciiArtState, key: KeyType, value: AsciiArtState[KeyType]): AsciiArtState {
    let newState={
        ...state
    };
    newState[key] = value;
    return newState;
}