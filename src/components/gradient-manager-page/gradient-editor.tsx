import React from "react";
import { getColorList, getDefaultPatternOptions, getPatternLength, Gradient, smoothPattern } from "../../lib/color";
import { Box, Stack, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { CheckboxWithLabel, CopyToClipboardButton, CustomIconButton, DividedList, ResizeTextArea, ResultPaper, ColorSpanDivider, NumberTextField } from "../ui";
import { GradientState, updateGradientState } from "../../lib/persistence";



interface GradientEditorProps{
    value: GradientState;
    onChange: (pattern: GradientState) => void
    onSubmit: (gradient: Gradient) => void;
}

export default function GradientEditor({value, onChange, onSubmit}: GradientEditorProps){
    const handleSubmit = () =>{
        const p = renderResult()
        onSubmit({name: value.name, colors:p});
    }

    const handleSmooth = () =>{
        let newState = {
            ...value
        }
        if(!value.smooth && (value.length === 0 || isNaN(value.length))){
            newState.length = getPatternLength(value.pattern.trim());
        }
        newState.smooth = !newState.smooth;
        onChange(newState);
    }

    const handleNameChange = (name: string) =>{
        onChange(updateGradientState(value, 'name', name));
    }

    const handleLengthChange = (l: number) =>{
        onChange(updateGradientState(value, 'length', l));
    }

    const handlePatternChange = (pattern: string) =>{
        onChange(updateGradientState(value, 'pattern', pattern));
    }

    const renderResult = () =>{
        return (value.smooth? smoothPattern(value.pattern.trim(), value.length!) : value.pattern);
    }

    return(
        <>
            <DividedList>
            <Box>
                <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
                    <TextField
                        onChange={(e)=>handleNameChange(e.target.value)}
                        error={value.name.length === 0}
                        required
                        size='small'
                        sx={{
                            m:2,
                            width:'90%',
                            '& .MuiInputLabel-root': {
                                color: 'text.primary'
                            },
                            '& .MuiFormHelperText-root':{
                                color: 'text.primary',
                            },
                            '& .MuiInputBase-root':{
                                backgroundColor: 'primary.dark',
                            }
                        }}
                        label="Name"        
                    /> 
                    <CheckboxWithLabel label={'Smooth Pattern'} value={value.smooth} onChange={() => handleSmooth()}/>
                    <NumberTextField value={value.length} onChange={handleLengthChange} label={'Length'} disabled={!value.smooth}/>
                    <Box sx={{display:'inline-flex'}}>
                        <CustomIconButton name={`save-gradient-button`} onClick={()=>handleSubmit()} tooltip='Save'>
                            <SaveIcon />
                        </CustomIconButton>
                    </Box>
                </Stack>
                <ResizeTextArea value={value.pattern} onChange={handlePatternChange} placeholder='g20#15 ffa {k'/>
            </Box>
            <Box width={'100%'}>
                <Box display={'inline-flex'} width={'100%'}>
                    <Box width={'100%'}>
                        <ResultPaper variant="outlined">{renderResult()}</ResultPaper>
                    </Box>
                    <CopyToClipboardButton>{renderResult()}</CopyToClipboardButton>
                </Box>
                <ColorSpanDivider>{getColorList(renderResult(), getDefaultPatternOptions())}</ColorSpanDivider>
            </Box>
            </DividedList>
        </>
    );
}