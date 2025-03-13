import { Stack } from "@mui/material";
import { ColoredText, interpretToken } from "../../lib/color";
import { TerminalPaper } from "../ui";
import AsciiRow from "./ascii-row";
import React from "react";

interface AsciiDrawingPadProps{
    brush: ColoredText;
    pattern:string;
    value: string[][];
    onChange: (colorMatrix: string[][]) => void;
    width: number;
    height: number;
}

export default function AsciiDrawingPad({brush, pattern, value, onChange, width, height}:AsciiDrawingPadProps){
    const [drawing, setDrawing] = React.useState<boolean>(false);

    const renderList = ()=>{
        if(value.length === 0)
            return [];
        console.log(value);
        const splitText = pattern.split('\n').map((row)=> row.split(''));
        let colorList:ColoredText[][] = value.map((list) => list.map((code, i) => {
            const c = interpretToken(code, true);
            return {text: '', colors:c} as ColoredText;
        }));
        for(let row = 0; row < splitText.length && row < colorList.length; row++){
            for(let i = 0; i < splitText[row].length && i < colorList[row].length; i++){
                colorList[row][i] = {
                    text: splitText[row][i], 
                    colors: colorList[row][i]?.colors ?? interpretToken('{x', true)
                };
            }
        }

        return colorList;
    }

    React.useEffect(()=>{
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        return () =>{
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    })

    const handleMouseDown = (event:MouseEvent)=>{
        setDrawing(true);
    }

    const handleMouseUp = (event:MouseEvent) =>{
        setDrawing(false);
    }

    const handleDrawing = (ct: ColoredText, row: number, element:number) =>{
        if(!drawing) return;
        let copy = [...value];
        copy[row][element] = brush.text;
        onChange(copy);
    }

    return (
        <>
            <TerminalPaper style={{ padding:'20px'}}>
                <Stack width={'fit-content'} justifyContent={'flex-start'}>
                    {renderList().map((row, i) => <AsciiRow key={`gradient-grid-row${i}`} content={row} onMouseEnter={(ct:ColoredText, elementIndex:number) => handleDrawing(ct,i,elementIndex)}/>)}
                </Stack>
            </TerminalPaper>
        </>
    );
}