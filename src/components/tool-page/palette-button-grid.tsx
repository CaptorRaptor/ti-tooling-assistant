import { Stack, Typography } from '@mui/material';
import { defaultBg, defaultFg, toColorHex, ColoredText, ColorPalette  } from '../../lib/color';
import ColorRow from '../ui/color/color-row';
import { TerminalPaper,  ColorText, ColorTextSpace } from '../ui';

function convertColor(token: string): ColoredText{
    const color = toColorHex(`<${token.substring(1,4)}>`, true)?? defaultFg
    return {text: token, colors:{color: color, bgColor: defaultBg}}
}

const ColorShades = ColorPalette.ColorShades

interface ShadeSubsectionProps {
    label: string
    input: string[];
    onClick: (color:ColoredText) => void;
}

function ShadeSubsection({label, input, onClick}: ShadeSubsectionProps){
    const colorRows = ReduceToRows(input.map(token => convertColor(token)))
    return(
        <>
            <ColorText color={defaultFg} bgColor={defaultBg}>{label}</ColorText>
            {colorRows.map((row,i) => <ColorRow key={`shade-${label}-grid-row${i}`} content={row} onClick={onClick}/>)}
            <ColorTextSpace/>
        </>
    )
}



interface GradientButtonGridProps {
    onClick: (color:ColoredText) => void;

}

function ReduceToRows(colors:ColoredText[]): ColoredText[][]
{
    return colors.reduce((acc: ColoredText[][], n:ColoredText, i: number) => { 
        const chunkIndex = Math.floor(i/12)
      
        if(!acc[chunkIndex]) {
          acc[chunkIndex] = [] // start a new chunk
        }
      
        acc[chunkIndex].push(n)
      
        return acc
      }, [])
}

export default function PaletteButtonGrid({onClick}:GradientButtonGridProps)
{
    const gradientRows= ReduceToRows(ColorPalette.Gradient.map(convertColor));
    return(
        <TerminalPaper style={{justifyItems: 'center', padding:'10px'}}>
            <Stack width={'fit-content'}>
                {gradientRows.map((row, i) => <ColorRow key={`gradient-grid-row${i}`} content={row} onClick={onClick}/>)}
                <ColorTextSpace/>    
                <ColorText color={defaultFg} bgColor={defaultBg}>Color Shades:</ColorText>
                <ColorTextSpace/>
                {ColorShades.map(shade => <ShadeSubsection key={`shade-subsection-${shade.name}`} label={`Shades of ${shade.name}`} input={shade.colors} onClick={onClick}/>)}
            </Stack>
            <Typography></Typography>
        </TerminalPaper>
    );
}