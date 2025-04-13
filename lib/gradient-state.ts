import { ApplyMode, getDefaultPreset, Gradient } from "./color";

export type GradientState = {
    useGradient: boolean;
    gradient: Gradient;
    reverse:boolean;
    random: boolean;
    mirror: boolean;
    applyMode: ApplyMode;
    skipSpace: boolean;
    keepLength: boolean;
    pattern: string;
    colorList: string[];
}

export function getDefaultGradientState(): GradientState {
    return {
        useGradient: false,
        gradient: getDefaultPreset(),
        reverse: false,
        random: false,
        mirror: false,
        applyMode: 'normal',
        skipSpace: false,
        keepLength: false,
        pattern: '',
        colorList: [],
    };
}
