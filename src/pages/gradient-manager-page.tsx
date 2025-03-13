import { Box, Stack, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Center, CustomIconButton, DividedList, LoadedContent, PageHeader,ImportDialog } from "../components/ui";
import { GradientList, GradientEditor } from "../components/gradient-manager-page";
import { Gradient } from "../lib/color";
import React from "react";
import { GradientState } from "../lib/persistence";

interface GradientManagerPageProps{
    isLoading: boolean;
    value: Gradient[];
    onChange: (list: Gradient[]) => void;
    onLoad: (gradient: Gradient) => void;
    editorState: GradientState;
    onStateChange: (state: GradientState) => void
}

export default function GradientManagerPage({isLoading, value, onChange, onLoad, editorState, onStateChange}:GradientManagerPageProps){
    const [isImportOpen, setIsImportOpen] = React.useState(false);    
    
    const handleGradientDelete = (index:number)=>{
        if(index === 0 && value.length === 1){
            onChange([]);
        }
        else if(index >= 0 && index < value.length){
            let newList =[...value];
            newList.splice(index,1);
            onChange(newList);
        }
    };

    const handleFileDownload = () => {
        const element = document.createElement("a");
        const json=JSON.stringify(value);
        const file=new Blob([json],{type:'application/json'});
        element.href = URL.createObjectURL(file);
        element.download = 'GradientList.json';
        document.body.appendChild(element);
        element.click();
    };
    
    const handleSaveGradient = (newGradent: Gradient)=>{
        let newList =[...value, newGradent];
        onChange(newList);
    }

    const handleImport = (file: string) => {
        const newState = JSON.parse(file);
        onChange(newState);
    };
    
    const handleImportOpen = () => {
        setIsImportOpen(true);
    };
    
    const handleImportClose = () => {
        setIsImportOpen(false);
    };

    const handleLoad = (index: number) =>{
        if(index >= 0 && index < value.length){
            onLoad(value[index]);
        }        
    }

    return (
        <Center>
            <Stack spacing={2}  width='100%' sx={{maxWidth:'md'}}>
                <PageHeader isLoading={isLoading} title={'Gradient Manager'}>
                    <Typography variant='body1'>
                        This is a visualization of gradients saved in your browsers local storage. By the power of cookies! Please do not input any sensitive data into these items.
                    </Typography>
                </PageHeader>
                <LoadedContent isLoading={isLoading}>
                    <GradientEditor onSubmit={handleSaveGradient} value={editorState} onChange={onStateChange}/>
                </LoadedContent>
                <LoadedContent isLoading={isLoading}>
                    <DividedList>
                        <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>          
                            <Typography variant='body1'> {`There are currently ${value.length} number of items stored:`}</Typography>                        
                            <Box sx={{display:'inline-flex'}}>
                                <CustomIconButton name={`upload-item-storage-button`} onClick={()=>handleImportOpen()} tooltip='Load'>
                                    <CloudUploadIcon />
                                </CustomIconButton>
                                <CustomIconButton name={`download-item-storage-button`} onClick={()=>handleFileDownload()} tooltip='Download'>
                                    <DownloadIcon/>
                                </CustomIconButton>
                            </Box>
                        </Stack> 
                        <GradientList items={value.map((i)=> i.name)} onDelete={handleGradientDelete} onLoad={handleLoad} onEdit={()=>{}}/>
                    </DividedList>
                </LoadedContent>
            </Stack>
            <ImportDialog title={'Import Gradient Storage'} text={'To import a gradient storage, please select your gradient storage json here.'}  open={isImportOpen} onClose={handleImportClose} onSubmit={handleImport}/>
        </Center>
    );
}