import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CheckBoxOutlineBlank, CheckBoxOutlined } from '@mui/icons-material';
import { theme } from '../theme';

interface CheckboxWithLabelProps {
    label: string;
    value: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void
}

export default function CheckboxWithLabel({label, value, onChange}: CheckboxWithLabelProps) {
  return (
    <FormControlLabel
        label={label}
        control={
        <Checkbox
            checked={value}
            onChange={onChange}
            inputProps={{ 'aria-label': 'controlled' }}
            color='primary'
            icon={<CheckBoxOutlineBlank style={{fill: theme.palette.text.primary}}/>}
            checkedIcon={<CheckBoxOutlined style={{fill: theme.palette.text.primary}}/>}
          />
        }
      />
  );
}