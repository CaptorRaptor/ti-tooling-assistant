import { Box, FormGroup, Stack, Typography } from "@mui/material";
import { CheckboxWithLabel, ResizeTextArea } from "../ui";
import { ToolOption, updateToolOption } from "../../lib/item";

interface ToolOptionEditorProps {
    value: ToolOption;
    onChange: (opt: ToolOption) => void;
    keyword: string;
}

export default function ToolOptionEditor({value, onChange, keyword} :ToolOptionEditorProps){

    const handleSeparatorChange = (ls:string)=>{
        onChange(updateToolOption(value, 'lineSeparator',ls));
    }

    const handleKeyChange = (key:string)=>{
        onChange(updateToolOption(value, 'key',key));
    }

    const toggleAll = ()=>{
        onChange(updateToolOption(value, 'all',!value.all));
    }

    const toggleFormat = ()=>{
        onChange(updateToolOption(value, 'format',!value.format));
    }

    const toggleAddKeywords = ()=>{
        onChange(updateToolOption(value, 'addKeywords',!value.addKeywords));
    }

    const toggleIsRestring = ()=>{
        onChange(updateToolOption(value, 'isRestring',!value.isRestring));
    }

    return(    
        <Stack maxWidth={'100%'} direction={'row'} spacing={2}>
            <Stack spacing={2}>
                <Box>
                    <Typography variant='body1'>Line separator</Typography>
                    <ResizeTextArea value={value.lineSeparator} onChange={handleSeparatorChange} placeholder={'\\n'}/>
                </Box>
                <Box>
                    <Typography variant='body1'>Target object to tool</Typography>
                    <ResizeTextArea value={value.key} onChange={handleKeyChange} placeholder={keyword}/>
                </Box>
            </Stack>
            <FormGroup sx={{minWidth: 'fit-content'}}>
                <CheckboxWithLabel label={'tool all'} value={value.all} onChange={()=>toggleAll()}/>
                <CheckboxWithLabel label={'format descriptions'} value={value.format} onChange={()=>toggleFormat()}/>
                <CheckboxWithLabel label={'add extended keywords'} value={value.addKeywords} onChange={()=> toggleAddKeywords()}/>
                <CheckboxWithLabel label={'use restring command'} value={value.isRestring} onChange={()=> toggleIsRestring()}/>
            </FormGroup>
            
        </Stack>
    );
}