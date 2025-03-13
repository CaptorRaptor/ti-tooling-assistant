import { Box, Link, Popper, Stack, Typography } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';
import { Center, ColorSquare, CustomIconButton, DividedList, LoadedContent, NumberTextField, PageHeader, ResizeTextArea } from "../components/ui";
import { AsciiArtState, updateAsciiArtState } from "../lib/persistence/ascii-art-state";
import React, { useRef } from "react";
import { PaletteButtonGrid } from "../components/tool-page";
import { ColoredText, defaultBg, defaultFg } from "../lib/color";
import { AsciiDrawingPad } from "../components/ascii-art";

interface ASCIIArtPageProps{
    isLoading: boolean;
    value: AsciiArtState;
    onChange: (state:AsciiArtState) => void;
}

export default function ASCIIArtPage({isLoading, value, onChange}:ASCIIArtPageProps){
    const [isPaletteVisible, setIsPaletteVisible] = React.useState<boolean>(false);
    const [brushColor, setBrushColor] = React.useState<ColoredText>({text: '{x', colors: {color: defaultFg, bgColor: defaultBg}});
    const anchor = useRef<HTMLDivElement>(null);

    const handleToggleIsPaletteVisible= () =>{
        setIsPaletteVisible(!isPaletteVisible);
    }

    const handleDescChange = (desc: string) =>{
        onChange(updateAsciiArtState(value, 'desc', desc));
    }

    const handleWidthChange = (width: number) =>{
        let newWidth = width;
        if(newWidth > 100) newWidth = 100;
        let newState = updateAsciiArtState(value, 'width', newWidth);
        const colorList = Array.from({length: value.height}, () => Array.from({length:newWidth}, () =>'{x'));
        onChange(updateAsciiArtState(newState, 'colorList', colorList));
    }

    const handleHeightChange = (height: number) =>{
        let newHeight = height;
        if(height > 100) newHeight = 100;
        let newState = updateAsciiArtState(value, 'height', newHeight);
        const colorList = Array.from({length: newHeight}, () => Array.from({length:value.width}, () =>'{x'));
        onChange(updateAsciiArtState(newState, 'colorList', colorList));
    }
    
    const handlePatternChange = (pattern: string) =>{
        const newPattern = pattern.split('\n')
            .map((line) => line.substring(0,value.width))
            .slice(0,value.height)
            .join('\n');
        
        onChange(updateAsciiArtState(value, 'pattern', newPattern));
    }
    
    const handleGradientClick= (color: ColoredText) =>{
        setBrushColor({text: `<${color.text.substring(1,4)}>`, colors:color.colors});
    }

    const handleColorListChange= (colors: string[][]) =>{
        onChange(updateAsciiArtState(value, 'colorList', colors));
    }
    
    return (  
        <Center>
            <Stack spacing={2}  width='100%' sx={{maxWidth:'md'}}>
                <PageHeader isLoading={isLoading} title={'ASCII Art Drawing Pad'}>
                    <Typography variant='body1'>
                        This tool assist in creating and coloring ascii art for <Link href='https://ti-legacy.com' color='inherit'>The Inquisition: Legacy</Link>.
                    </Typography>
                </PageHeader>
                <LoadedContent isLoading={isLoading}>
                    <DividedList>
                        <Stack spacing={2}>
                            <Typography variant='body1'>Ascii Art Description</Typography>
                            <Typography variant='body1' sx={{fontSize:'10px'}}>(This is for blind players to see your art.)</Typography>
                            <ResizeTextArea value={value.desc} onChange={handleDescChange}/>
                            <Stack direction={'row'} spacing={2}>
                                <NumberTextField value={value.width} onChange={handleWidthChange} label={'width'}/>
                                <NumberTextField value={value.height} onChange={handleHeightChange} label={'height'}/>
                            </Stack>
                            <ResizeTextArea value={value.pattern} onChange={handlePatternChange}/>             
                        </Stack>                            
                        <Stack spacing={2} width={'100%'} ref={anchor}>
                            <Popper 
                                open={isPaletteVisible} 
                                sx={{maxWidth:'sm', height:anchor.current?.clientHeight, overflow: 'auto', width:'fit-content', pl:2}} 
                                anchorEl={anchor.current} 
                                placement='right-start'
                            >
                                <PaletteButtonGrid onClick={handleGradientClick}/>
                            </Popper>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="stretch"
                                spacing={2}
                                width={'100%'}
                                height={20}
                                >
                                <Box display={'inline-flex'}>
                                    <Typography mr={1}>Color:</Typography>
                                    <ColorSquare width={20} color={brushColor.colors.color}/>
                                </Box>
                                <CustomIconButton name={'open-palette'} onClick={handleToggleIsPaletteVisible} tooltip='Open Palette'>
                                    <PaletteIcon/>
                                </CustomIconButton>
                            </Stack>
                            <AsciiDrawingPad brush={brushColor} pattern={value.pattern} value={value.colorList} onChange={handleColorListChange} width={value.width} height={value.height}/>
                        </Stack>
                    </DividedList>                               
                </LoadedContent>
            </Stack>        
        </Center>
    );
}