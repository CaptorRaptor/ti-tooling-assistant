import { defaultBg, defaultFg } from "../../../lib/color";

export function getStyle(color: string = defaultFg, bgColor: string = defaultBg){
    return {
        fontFamily:'monospace', 
        backgroundColor:bgColor, 
        color:color, 
        whiteSpace:'pre-wrap',
        width:'fit-content',
        fontSize: '14px'
    };
}