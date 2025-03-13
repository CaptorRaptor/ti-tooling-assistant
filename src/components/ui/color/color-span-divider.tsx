import { Stack } from "@mui/material";
import { ColorToken, defaultBg, getToken, interpretToken, TransparentColorPair} from "../../../lib/color";
import ColorSquare from "./color-square";

interface ColorSpanDividerProps {
    children: string[];
}

export default function ColorSpanDivider({children}: ColorSpanDividerProps){
    const colors = children.map<ColorToken>(c => getToken(c))
        .map<string[]>(t => t.length === undefined? [t.color] : Array(t.length).fill(t.color))
        .reduce((acc, v) =>{
            return [...acc, ...v];        
        }, [])
        .map(c => interpretToken(c, true))
        .filter(color => typeof color !== 'string')
        .map(c => (c as TransparentColorPair).color);
    const width = 100/colors.length;
    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={0}
            width={'100%'}
            height={10}
            >
            {colors.length >0? colors.map((c,i) => <ColorSquare key={`color-span-divider-${i}`} width={`${width}%`} color={c!}/>)
            :<ColorSquare width={'100%'} color={defaultBg}/>}
        </Stack>
    );
}