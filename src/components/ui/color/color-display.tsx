import { Stack } from "@mui/material";
import { toColoredText } from "../../../lib/color";
import ColorRow from "./color-row";
import { TerminalPaper } from "..";

interface ColorDisplayProps
{
    children: string;
}

export default function ColorDisplay({children}: ColorDisplayProps){
    const lines = children.split(/(.*\n)/g)
    const coloredList = lines.map(l => toColoredText(l, true));
    return(
        <TerminalPaper>
            <Stack maxWidth={'100%'}>
                {coloredList.map((l,i) => <ColorRow key={`color-display-row-${i}`} content={l}/>)}
            </Stack>
        </TerminalPaper>
    );
}