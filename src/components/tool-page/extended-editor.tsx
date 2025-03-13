import { Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CustomIconButton, DividedList } from '../ui';
import { ExtendedDesc } from '../../lib/item';
import ExtendedInput from './extended-input';

interface ExtendedDescEditorProps{
    value: ExtendedDesc[];
    onChange: (item: ExtendedDesc[]) => void;
    keywords: string;
}

export default function ExtendedEditor({value, onChange, keywords} :ExtendedDescEditorProps){

    const addExtended = () =>{
        const k = value.length === 0? keywords :'';
        onChange([...value, {keywords:k, desc:''}]);        
    }

    const handleChange = (index: number, ext: ExtendedDesc) =>{
        if(index >= 0 && index < value.length){
            const newList = [...value];
            newList[index] = ext;
            onChange(newList);
        }        
    }

    const removeExtended = (index:number) =>{
        if(index > -1 && index < value.length && value.length > 1){
            let newList = [...value]
            newList.splice(index,1);
            onChange(newList); 
        }
        else if(index === 0 && value.length === 1)
            onChange([]);
    }

    return (
        <DividedList>
            <Stack direction={'row'} spacing={2} width={'100%'} justifyContent={'space-between'}>
                <Typography variant='h5'>Extended Descriptions</Typography>                
                <CustomIconButton name={'add-extended'} onClick={addExtended} tooltip='Add Extended'>
                    <AddIcon/>                   
                </CustomIconButton>
            </Stack>
            {value.map((ext, i) => <ExtendedInput key={`extended-input-${i}`} value={ext} onChange={(newExt)=>handleChange(i,newExt)} onClick={()=>removeExtended(i)}/>)}
        </DividedList>
    );
}