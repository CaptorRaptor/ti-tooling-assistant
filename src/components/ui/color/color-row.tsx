import { Box } from "@mui/material";
import { ColoredText } from "../../../lib/color";
import { ColorSpan } from "..";

interface ColorRowProps {
    content: ColoredText[];
    onClick?: (ct:ColoredText) => void;
}

export default function ColorRow({content, onClick} : ColorRowProps){
    return (
    <Box display='inline-flex' flexWrap={'wrap'} maxWidth={'100%'}>
        {content.map((ct,i) =>  <ColorSpan key={`color-row-color-span${i}`} value={ct} onClick={onClick}/>)}
    </Box>
    );
}