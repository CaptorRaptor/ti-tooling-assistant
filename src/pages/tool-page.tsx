import * as React from 'react';
import { applyPattern, getColorList, Gradient } from '../lib/color';
import { Link, Stack, Typography } from '@mui/material';
import { LoadedContent, ResultBox, PageHeader, Center, ImportDialog } from '../components/ui';
import { ColorOptionEditor, ItemEditor, ToolOptionEditor, ItemNameDialog} from '../components/tool-page';
import { getToolResult, ItemDesc, ToolOption } from '../lib/item';
import { updateToolState, ToolState, ItemSave } from '../lib/persistence';

interface ToolPageProps{
    state: ToolState;
    onChange: (state:ToolState) => void;
    customGradientList: Gradient[];
    isLoading: boolean;
    onSaveItem: (name: string, state:ToolState) => void;
    savedItems: ItemSave[];
    onSaveGradient: () => void;
}

export default function ToolPage({state, onChange, customGradientList, isLoading, onSaveItem, savedItems, onSaveGradient}:ToolPageProps){
    const [isImportOpen, setIsImportOpen] = React.useState(false);    
    const [isItemNameOpen, setIsItemNameOpen] = React.useState(false);
    const [toolResult, setToolResult] = React.useState<string>(getToolResult(state.item, state.toolOpt));
    const [toolOptKeyword, setToolOptKeyword] = React.useState<string>(state.item.keywords.split(' ')[0]);
        
    React.useEffect(() => {
        setToolResult(getToolResult(state.item, state.toolOpt));
    }, [state.item, state.toolOpt]);

    React.useEffect(() => {
        setToolOptKeyword(state.item.keywords.split(' ')[0]);
    }, [state.item.keywords]);

    const isNameTaken = (newName: string) =>{
        const namesTaken = savedItems.map((g)=> g.name);
        return namesTaken.indexOf(newName) !== -1
    }
    
    const applyColors = (short: string) =>{
        const colorList = getColorList(state.pattern, state.patternOpt);
        const colored = applyPattern(short, colorList, state.applyMode);
        return colored;
    }

    const handleStateChange = (state:ToolState) =>{
        onChange(state);
    }
     
    const handleItemChange = (i:ItemDesc) =>{
        handleStateChange(updateToolState(state, 'item',i));
    }
    
    const handleToolOptChange = (opt:ToolOption) =>{
        handleStateChange(updateToolState(state, 'toolOpt',opt));
    }

    const handleSaveItem = (name: string)=>{
        onSaveItem(name, state);
    }

    const handleSaveItemOpen = () => {
        setIsItemNameOpen(true);
    };
    
    const handleSaveItemClose = () => {
        setIsItemNameOpen(false);
    };

    const handleFileDownload = () => {
        const element = document.createElement("a");
        const json=JSON.stringify(state);
        const file=new Blob([json],{type:'application/json'});
        element.href = URL.createObjectURL(file);
        element.download = 'Item.json';
        document.body.appendChild(element);
        element.click();
    };
    
    const handleImport = (file: string) => {
        const newState = JSON.parse(file);
        handleStateChange(newState);
    };
    
    const handleImportOpen = () => {
        setIsImportOpen(true);
    };
    
    const handleImportClose = () => {
        setIsImportOpen(false);
    };

    return (   
        <Center>       
            <Stack spacing={2} sx={{maxWidth:'md'}} id='inner stack'>
                <PageHeader isLoading={isLoading} title={'String Tool'}>
                    <Typography variant='body1'>
                        This tool assist in coloring and tooling items of <Link href='https://ti-legacy.com' color='inherit'>The Inquisition: Legacy</Link>.
                    </Typography>
                </PageHeader>
                <LoadedContent isLoading={isLoading}>
                    <ColorOptionEditor 
                        onSaveGradient={onSaveGradient}
                        state={state}
                        onStateChange={handleStateChange}
                        customGradientList={customGradientList}/>
                </LoadedContent>
                <ItemEditor 
                    value={state.item} 
                    onChange={handleItemChange} 
                    loading={isLoading} 
                    applyColors={applyColors}
                    onImport={handleImportOpen}
                />
                <LoadedContent isLoading={isLoading}>
                    <ToolOptionEditor value={state.toolOpt} onChange={handleToolOptChange} keyword={toolOptKeyword}/>
                </LoadedContent>
                <LoadedContent isLoading={isLoading}>
                    <ResultBox value={toolResult} onSave={handleSaveItemOpen} onExport={handleFileDownload}/>
                </LoadedContent>
                <ImportDialog title={'Import Item'} text={'To import an item, please select your item json here.'} open={isImportOpen} onClose={handleImportClose} onSubmit={handleImport}/>
                <ItemNameDialog open={isItemNameOpen} onClose={handleSaveItemClose} onSubmit={handleSaveItem} isNameTaken={isNameTaken}/>
            </Stack>
        </Center>    
    );
}