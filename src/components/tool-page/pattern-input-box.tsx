import * as React from 'react';
import { getDefaultPreset, getGradient, Gradient } from '../../lib/color';
import { updateToolState, ToolState } from '../../lib/persistence';
import ExtractColorEditor from './extract-color-editor';
import { VerticalTabs, GradientSelection } from '../ui';

interface PatternInputBoxProps {
    value: ToolState;
    onChange: (p:ToolState) => void;
    customGradientList: Gradient[];
}


export default function PatternInputBox({value, onChange, customGradientList}:PatternInputBoxProps) {
    const handleGradientChange = (gradient:string) =>{
        let newState = updateToolState(value, 'gradient', gradient);
        const p = getGradient(gradient, customGradientList) ?? getDefaultPreset();
        newState = updateToolState(newState, 'pattern',p.colors);
        onChange(newState);
    };

    const handleExtractColor = (color:string) =>{
        let newState = updateToolState(value, 'pattern', color);
        onChange(newState);
    }

    return (
        <VerticalTabs>
            {[
                {
                    label: 'Pick Gradient',
                    content: <GradientSelection 
                        value={value.gradient} 
                        onChange={handleGradientChange}
                        gradientList={customGradientList}
                    />
                },
                {
                    label: 'Extract Color',
                    content: <ExtractColorEditor 
                        onSubmit={handleExtractColor}
                    />
                },
            ]}
        </VerticalTabs>
    );
}