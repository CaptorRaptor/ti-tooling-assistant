import { ColoredText } from "../../lib/color";
import { CSSProperties } from "react";
import {getStyle} from "../ui";

interface AsciiSpanProps {
    value: ColoredText;
    onMouseEnter: () => void;
}

export default function AsciiSpan({value, onMouseEnter} : AsciiSpanProps){
    let style : CSSProperties = getStyle(value.colors.color, value.colors.bgColor);
    style['cursor'] = 'pointer'
    return (
    <>
        <div className='not-selectable' onMouseEnter={()=> onMouseEnter()} style={style}>{value.text}</div>
    </>
    );
}