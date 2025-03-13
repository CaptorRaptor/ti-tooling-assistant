import { Box, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { ExtendedDesc, updateExtendedDesc } from "../../lib/item";
import { CustomIconButton, ResizeTextArea, ColorDisplay } from "../ui";

interface ExtendedInputProps {
    value: ExtendedDesc;
    onChange: (item: ExtendedDesc) => void;
    onClick: () =>void;
}

export default function ExtendedInput({value, onChange, onClick} :ExtendedInputProps){

    const handleKeywordChange = (key:string)=>{
        onChange(updateExtendedDesc(value, 'keywords', key));
    }

    const handleDescChange = (desc:string)=>{
        onChange(updateExtendedDesc(value, 'desc', desc));
    }

    return(    
        <Box maxWidth={'100%'}>
            <Box maxWidth={'100%'} display={'flex'} justifyContent={'flex-end'}>
                <CustomIconButton name={'delete-extended'} onClick={onClick} tooltip='Delete Extended'>
                    <DeleteIcon/>                    
                </CustomIconButton>
            </Box>
            <Box>
                <Typography variant='body1'>Keywords</Typography>
                <ResizeTextArea value={value.keywords} onChange={handleKeywordChange}/>
            </Box>
            <Typography variant='body1'>Description</Typography>
            <ResizeTextArea value={value.desc} onChange={handleDescChange}/>
            <ColorDisplay>{value.desc}</ColorDisplay>
            
        </Box>
    );
}