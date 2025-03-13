import { Box, Typography } from "@mui/material";
import ColorDisplay from "./color-display";
import { ResizeTextArea } from "..";

interface TextInputProps {
    label: string;
    value: string;
    onChange: (value:string) => void;
    display?: string;
    helpInfo?: string;
}

export default function InputColorDisplay({label, value, onChange, display, helpInfo} :TextInputProps){
    return (
        <Box maxWidth={'100%'}>
            <Typography variant='body1'>{label}</Typography>
            {helpInfo && <Typography variant='body1' sx={{fontSize:'10px'}}>{helpInfo}</Typography>}
            <ResizeTextArea value={value} onChange={onChange}/>
            <ColorDisplay>{display ?? value}</ColorDisplay>
        </Box>
    )
}