import { Box, MenuItem, Select } from "@mui/material";
import { theme, ColorSpanDivider } from "..";
import { getColorList, getDefaultPatternOptions, getDefaultPreset, getGradient, getGradientNames, Gradient } from "../../../lib/color";

interface GradientSelectionProps {
    value: string;
    onChange: (p:string) => void;
    gradientList: Gradient[];
}


export default function GradientSelection({value, onChange, gradientList}:GradientSelectionProps){

    const handleGradientChange = (value: string) => {
        onChange(value);
    };

    return ( 
        <Select
            value={value}
            onChange={(event)=>handleGradientChange(event.target.value)}
            sx={{
                '.MuiSelect-icon':{
                    fill: theme.palette.text.primary
                },
                outline: ' 1px solid #263447',
                width:'100%'
            }}
        >
                {getGradientNames(gradientList).map(p =>
                    <MenuItem key={`gradient-select-menuitem-${p}`} value={p}>
                        <Box sx={{ width: '100%' }}>
                            {p}
                            <ColorSpanDivider>{getColorList((getGradient(p, gradientList)??getDefaultPreset()).colors, getDefaultPatternOptions())}</ColorSpanDivider>
                        </Box>
                    </MenuItem>)
                }
        </Select>
    );

}