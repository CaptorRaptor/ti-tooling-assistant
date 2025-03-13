import { Grid, Stack, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import {ResultPaper, ContentCard} from "../container";
import {CopyToClipboardButton, CustomIconButton} from "../controls";

interface ResultBoxProps {
    value: string;
    onSave: ()=>void;
    onExport: ()=>void;
}

export default function ResultBox({value, onSave, onExport}:ResultBoxProps){
    return(
    <Grid item xs={12}>
        <ContentCard>
            <Stack direction="row" spacing={2} alignItems={'center'} justifyContent={'flex-start'}>
                <Typography variant='body1'>Copy the text below into The Inquisition: Legacy</Typography>
                <CopyToClipboardButton>{value}</CopyToClipboardButton>
                <CustomIconButton name={'save-item'} onClick={onSave} tooltip='Save Item'>
                    <SaveIcon />
                </CustomIconButton>
                <CustomIconButton name={'export-item'} onClick={onExport} tooltip='Download Item'>
                    <DownloadIcon />
                </CustomIconButton>
            </Stack>            
            <ResultPaper variant="outlined">{value}</ResultPaper>
        </ContentCard>
    </Grid>
    );
}