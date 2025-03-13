import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import { Box, MenuItem, Select, Stack } from '@mui/material';
import { ApplyMode, getAllApplyModes, PatternOptions } from '../../lib/color';
import { CheckboxWithLabel, theme } from '../ui';

interface PatternOptionBoxProps {
    option: PatternOptions;
    onOptionsChange: (opt:PatternOptions) => void;
    applyMode: ApplyMode;
    onModeChange: (mode:ApplyMode) => void;
}

export default function PatternOptionBox({option, onOptionsChange, applyMode, onModeChange}:PatternOptionBoxProps) {

  const handleReverseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({reverse: event.target.checked, random: option.random, symetrical:option.symetrical});
  };
  const handleRandomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({reverse: option.reverse, random: event.target.checked, symetrical:option.symetrical});
  };
  const handleSymmetricalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({reverse: option.reverse, random: option.random, symetrical:event.target.checked });
  };

  return (
    <Stack direction={'row'} justifyContent='space-between' width={'100%'} sx={{flexWrap: 'wrap'}}>        
        <FormGroup row>
            <CheckboxWithLabel label='Reverse Gradient' value={option.reverse} onChange={handleReverseChange}/>
            <CheckboxWithLabel label='Randomise Colours' value={option.random} onChange={handleRandomChange}/>
            <CheckboxWithLabel label='Symetrical Colours' value={option.symetrical} onChange={handleSymmetricalChange}/>
        </FormGroup>
        <Select
                value={applyMode}
                onChange={(e) => onModeChange(e.target.value as ApplyMode)}
                sx={{
                    '.MuiSelect-icon':{
                        fill: theme.palette.text.primary
                    },
                    outline: ' 1px solid #263447',
                    minWidth: '250px',
                }}
            >
            {getAllApplyModes().map((mode) => 
                <MenuItem key={`mode-select-menuitem-${mode}`} value={mode}>
                    <Box sx={{ width: '100%' }}>
                        {mode}                
                    </Box>
                </MenuItem>)}
        </Select>
    </Stack>
  );
}