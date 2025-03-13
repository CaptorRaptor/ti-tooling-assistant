import { Box, Button } from "@mui/material";
import { CheckboxWithLabel, ResizeTextArea } from "../ui";
import React from "react";
import { extractColorCodes } from "../../lib/color";

interface ExtractColorEditorProps{
    onSubmit: (pattern: string) => void
}

export default function ExtractColorEditor({onSubmit}:ExtractColorEditorProps){
    const [short, setShort] = React.useState<string>('');
    const [counting, setCounting] = React.useState<boolean>(false);

    const handleChange = (text: string) =>{
        setShort(text);
    }

    const handleSubmit = ()=>{
        let result:string  = short;
        onSubmit(extractColorCodes(result, counting));
    }

    const toggleCounting = ()=>{
        setCounting(!counting);
    }

    return(
        <>
            <ResizeTextArea value={short} onChange={handleChange}/>
            <Box sx={{display: 'inline-flex'}}>
                <CheckboxWithLabel label={'Count Color Length'} value={counting} onChange={()=> toggleCounting()}/>
                <Button type="submit" onClick={()=>handleSubmit()}>Extract</Button>
            </Box>
        </>
    );
}