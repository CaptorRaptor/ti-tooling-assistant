
export type GradientState = {
    name: string;
    smooth: boolean;
    length: number;
    pattern: string;
}

export function getDefaultGradientState(){
    return {
        name: 'New Gradient',
        smooth: false,
        length: 0,
        pattern: ''
    };
}

export function updateGradientState<KeyType extends keyof GradientState>(state:GradientState, key: KeyType, value: GradientState[KeyType]): GradientState {
    let newState={
        ...state
    };
    newState[key] = value;
    return newState;
}