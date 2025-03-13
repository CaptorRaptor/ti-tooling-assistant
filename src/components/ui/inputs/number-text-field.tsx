import { SxProps, TextField, TextFieldPropsSizeOverrides, Theme } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

interface NumberTextFieldProps{
    disabled?: boolean;
    value?:number;
    onChange: (newValue: number) => void;
    label: string;
    sx?: SxProps<Theme>;
    size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
}

export default function NumberTextField({value, onChange, label, disabled, sx, size}:NumberTextFieldProps){

    const style = sx? sx : {};

    return (
        <TextField 
            type='number' 
            disabled={disabled ?? false} 
            value={value ?? 0} 
            size={size ?? 'small'}
            label={label} 
            onChange={(e) => onChange(Number.parseInt(e.target.value))}
            sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                    display: 'none'
                },
                '& input[type=number]': {
                    MozAppearance: 'textfield'
                },
                '& .MuiInputLabel-root': {
                    color: 'text.primary'
                },
                '& .MuiFormHelperText-root':{
                    color: 'text.primary',
                },
                '& .MuiInputBase-input':{
                    backgroundColor: ((disabled ?? false)? 'primary.main' : 'primary.dark'),
                },
                ...style
            }}
        />    
    )
}