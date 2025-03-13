import { Box, Stack, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Center, CustomIconButton, CustomList, DividedList, LoadedContent, PageHeader, ImportDialog } from "../components/ui";
import { ItemSave } from "../lib/persistence";
import React from "react";


interface ItemStoragePageProps{
    isLoading: boolean;
    value: ItemSave[];
    onChange: (list: ItemSave[]) => void;
    onLoad: (item:ItemSave) => void;
}

export default function ItemStoragePage({isLoading, value, onChange, onLoad} : ItemStoragePageProps){
    const [isImportOpen, setIsImportOpen] = React.useState(false);    

    const handleItemDelete = (index:number)=>{
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
        element.download = 'ItemStorage.json';
        document.body.appendChild(element);
        element.click();
    };
    
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
            <Stack spacing={2} width='100%' sx={{maxWidth:'md'}}>
                <PageHeader isLoading={isLoading} title={'Item Storage'}>
                    <Typography variant='body1'>
                        This is a visualization of items saved in your browsers local storage. By the power of cookies! Please do not input any sensitive data into these items.
                    </Typography>
                </PageHeader>
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
                        <CustomList items={value.map((i)=> i.name)} onDelete={handleItemDelete} onLoad={handleLoad}/>
                    </DividedList>
                </LoadedContent>
            </Stack>
            <ImportDialog title={'Import Item Storage'} text={'To import an item storage, please select your item storage json here.'}  open={isImportOpen} onClose={handleImportClose} onSubmit={handleImport}/>
        </Center> 
    );
}