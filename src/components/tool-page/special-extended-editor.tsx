import { Button, Stack, Typography } from '@mui/material';
import { getSpecialExtendedHelpInfo, getSpecialExtendedKeyword, getSpecialExtendedLabel, SpecialExtendedKey, SpecialExtendedList } from '../../lib/item';
import { DividedList, InputColorDisplay } from '../ui';

interface SpecialExtendedEditorProps {
    value: SpecialExtendedList;
    onChange: (value: SpecialExtendedList) => void;
}

export default function SpecialExtendedEditor({value, onChange} :SpecialExtendedEditorProps){
    const SpecialEDButton = (key: SpecialExtendedKey) =>{
        return value[key] !== undefined? <Button color='secondary' variant='contained' sx={{width:'14%'}} onClick={()=>{toggleExtended(key)}}>{getSpecialExtendedKeyword(key)}</Button>
        : <Button sx={{bgcolor: 'primary.dark', width:'14%', '&:hover': 'primary.light'}} variant='contained' onClick={()=>{toggleExtended(key)}}>{getSpecialExtendedKeyword(key)}</Button>
    }

    const SpecialEDInput = (key: SpecialExtendedKey) =>{
        return (value[key] !== undefined? 
                <InputColorDisplay 
                    label={`${getSpecialExtendedKeyword(key)} (${getSpecialExtendedLabel(key)})`} 
                    value={value[key]??''} 
                    onChange={(s)=>handleChange(key,s)} 
                    display={value[key]}
                    helpInfo={getSpecialExtendedHelpInfo(key)??''}/>
                : undefined );
    }

    const toggleExtended = (key:SpecialExtendedKey)=>{
        let newItem = {
            ...value
        };
        
        if(newItem[key] !== undefined){
            newItem[key] = undefined;
        }
        else{
            newItem[key] = '';
        }
        onChange(newItem);
    }
    
    const handleChange = (key:SpecialExtendedKey ,desc:string)=>{
            let newItem = {
                ...value
            };
            newItem[key] = desc;
            onChange(newItem);
    }

    return (
        <DividedList>
            <Typography variant='h5'>Special Extended Descriptions</Typography>
            <Stack direction={'row'} spacing={2} useFlexGap sx={{ flexWrap: 'wrap', justifyContent: "space-evenly", alignItems: "center"}}>
                {SpecialEDButton ('self')}
                {SpecialEDButton ('others')}
                {SpecialEDButton ('use')}
                {SpecialEDButton ('eat')}
                {SpecialEDButton ('taste')}
                {SpecialEDButton ('smell')}
                {SpecialEDButton ('apply')}
                {SpecialEDButton ('cup')}
                {SpecialEDButton ('header')}
                {SpecialEDButton ('footer')}
                {SpecialEDButton ('wear')}
                {SpecialEDButton ('descCloak')}
                {SpecialEDButton ('shopInfo')}
            </Stack>
            {SpecialEDInput('self')}
            {SpecialEDInput('others')}
            {SpecialEDInput('use')}
            {SpecialEDInput('eat')}
            {SpecialEDInput('taste')}
            {SpecialEDInput('smell')}
            {SpecialEDInput('apply')}
            {SpecialEDInput('cup')}
            {SpecialEDInput('header')}
            {SpecialEDInput('footer')}
            {SpecialEDInput('wear')}
            {SpecialEDInput('descCloak')}
            {SpecialEDInput('shopInfo')}
        </DividedList>
    );
}