import { Stack } from "@mui/material";
import { ColoredText } from "../../lib/color";
import AsciiSpan from "./ascii-span";

interface AsciiRowProps {
    content: ColoredText[];
    onMouseEnter: (ct:ColoredText, i:number) => void;
}

export default function AsciiRow({content, onMouseEnter} : AsciiRowProps){
    return (
    <Stack direction='row' width={'fit-content'} maxWidth={'100%'}>
        {content.map((ct,i) =>  <AsciiSpan key={`color-row-color-span${i}`} value={ct} onMouseEnter={()=>onMouseEnter(ct, i)}/>)}
    </Stack>
    );
}