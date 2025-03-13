import { Box, Stack, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputColorDisplay from '../ui/color/input-color-display';
import { removeColor } from '../../lib/color';
import { DividedList, ResizeTextArea, CustomIconButton } from '../ui';
import { filterKeywords, ItemDesc, updateItemDesc } from '../../lib/item';
import React from 'react';

interface DescEditorProps {
    value: ItemDesc;
    onChange: (value: ItemDesc) => void;
    applyColors: (short: string) => string;
    onImport: () => void;
}

export default function DescEditor({value, onChange, applyColors, onImport} :DescEditorProps){    
    const getShortDescLabel = ()=>{
        return (value.short.length === 0)? 'Short desc' : `Short desc (${value.short.length} chars)`;
    }
    
    const getLongDescLabel = ()=>{
        const removed = removeColor(value.long);
        return (removed.length === 0)? 'Long desc' : `Long desc (${removed.length} chars)`;
    }

    const handleShortChange = (short: string) =>{
        let newItem = updateItemDesc(value, 'short', short);
        if(short.length > 0){
            const colored = applyColors(short);
            newItem.cShort = colored;
            newItem.long = colored+'{x is here.';
            newItem.keywords = short.split(' ').map((w)=>{return w.replace(/[^\w]/g, '')}).filter((w)=>{return filterKeywords(w)}).join(' ');
            onChange(newItem);
        }
        else{
            newItem.cShort = '';
            newItem.long = '';
            newItem.keywords = '';
        }
        onChange(newItem);
    }

    const setKeywords = (newKeys : string) =>{
        onChange(updateItemDesc(value, 'keywords',newKeys));
    }
    
    const setLongDesc = (desc: string) =>{
        onChange(updateItemDesc(value, 'long',desc));
    }

    return (
        <DividedList>
            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>          
                <Typography variant='h5'>Standard Descriptions</Typography>
                <CustomIconButton name={'upload-item'} onClick={onImport}>
                    <CloudUploadIcon />
                </CustomIconButton>
            </Stack> 
            <Stack spacing={2} maxWidth={'100%'}>
                <InputColorDisplay label={getShortDescLabel()} value={value.short} display={value.cShort} onChange={handleShortChange}/>
                <Box maxWidth={'100%'}>
                    <Typography variant='body1'>Keywords</Typography>
                    <ResizeTextArea value={value.keywords} onChange={setKeywords}/>
                </Box>
                <InputColorDisplay label={getLongDescLabel()} value={value.long} display={value.long} onChange={setLongDesc}/>
            </Stack>
        </DividedList>
    );
}