import { CustomIconButton, DividedList, ResizeTextArea, ColorSpanDivider } from "../ui";
import { Box, Popper, Stack, Typography } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';
import SaveIcon from '@mui/icons-material/Save';
import { getColorList, PatternOptions, ApplyMode, Gradient, ColoredText, applyPattern } from "../../lib/color";
import PatternInputBox from "./pattern-input-box";
import PatternOptionBox from "./pattern-option-box";
import { updateToolState, ToolState } from "../../lib/persistence";
import PaletteButtonGrid from "./palette-button-grid";
import { useRef } from "react";
import React from "react";
import { updateItemDesc } from "../../lib/item";

interface ColorOptionEditorProps {
    state: ToolState;
    onStateChange: (state:ToolState) => void;
    customGradientList: Gradient[]    
    onSaveGradient: ()=>void;
}
    
function updateColor(state: ToolState, colors: string[], applyMode: ApplyMode): ToolState{
    const colored = applyPattern(state.item.short, colors, applyMode);
    let newItem = updateItemDesc(state.item, 'cShort', colored);
    if(state.item.long === (state.item.cShort+'{x is here.'))
    {
        newItem.long = colored+'{x is here.';
    }
    return updateToolState(state, 'item', newItem);
}

export default function ColorOptionEditor({state, onStateChange, customGradientList, onSaveGradient }:ColorOptionEditorProps) {
    const anchor = useRef<HTMLUListElement>(null);
    const [isPaletteVisible, setIsPaletteVisible] = React.useState<boolean>(false);
    const [colorList, setColorList] = React.useState<string[]>(getColorList(state.pattern, state.patternOpt));

    const updateColorList= (newState: ToolState, pattern: string, patternOpt: PatternOptions): ToolState =>{        
        const newColorList = getColorList(pattern, patternOpt);
        setColorList(newColorList);
        return updateColor(newState, newColorList, newState.applyMode);
    }

    const handleColorPatternChange = (t:string) =>{
        let newState = updateToolState(state, 'pattern',t);
        newState = updateColorList(newState, t, state.patternOpt);
        onStateChange(newState);
    }

    const handleOptionsChange = (opt:PatternOptions) =>{
        let newState = updateToolState(state, 'patternOpt', opt);
        newState = updateColorList(newState, state.pattern, opt);
        onStateChange(newState);
    };
    
    const handleApplyModeChange = (mode : ApplyMode) =>{
        let newState = updateToolState(state, 'applyMode',mode);
        newState = updateColor(newState, colorList, mode);
        onStateChange(newState);
    }
    
    const handleGradientClick= (color: ColoredText) =>{
        const newPattern = (state.pattern+' '+ color.text.substring(1, 4)).trim();
        let newState = updateToolState(state, 'pattern', newPattern);
        newState = updateColorList(newState, newPattern, state.patternOpt);
        onStateChange(newState);   
    }

    const handlePresetChange = (value:ToolState) =>{
        let newState = updateColorList(value, value.pattern, value.patternOpt);
        onStateChange(newState);
    }

    const togglePalette = () =>{
        setIsPaletteVisible(!isPaletteVisible);
    }
    
    return (
        <Box width={'100%'} height={'fit-content'} ref={anchor}>
            <Popper 
                open={isPaletteVisible} 
                sx={{maxWidth:'sm', height:anchor.current?.clientHeight, overflow: 'auto', width:'fit-content', pl:2}} 
                anchorEl={anchor.current} 
                placement='right-start'
            >
                <PaletteButtonGrid onClick={handleGradientClick}/>
            </Popper>
            <DividedList>
                <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>                
                    <Typography variant='h5'>Color</Typography>
                    <CustomIconButton name={'open-palette'} onClick={togglePalette} tooltip='Open Palette'>
                        <PaletteIcon/>
                    </CustomIconButton>
                </Stack> 
                <PatternInputBox value={state} onChange={handlePresetChange} customGradientList={customGradientList}/>
                <PatternOptionBox 
                    option={state.patternOpt} 
                    onOptionsChange={handleOptionsChange}
                    applyMode={state.applyMode}
                    onModeChange={handleApplyModeChange}
                />
                <Stack>
                    <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>    
                        <Typography variant='body1'>Enter your xterm color codes using [] values:</Typography>
                        <CustomIconButton name={`save-gradient-button`} onClick={()=>onSaveGradient()} tooltip='Save'>
                            <SaveIcon />
                        </CustomIconButton>
                    </Stack>
                    <ResizeTextArea value={state.pattern} onChange={handleColorPatternChange}/>
                    <ColorSpanDivider>{colorList}</ColorSpanDivider>
                </Stack>
            </DividedList>
        </Box>
    );
}