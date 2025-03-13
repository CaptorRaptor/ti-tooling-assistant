import { ColoredText } from "../../../lib/color";
import { CSSProperties } from "react";
import {getStyle} from "./color-text-style";

type ColorSpanProps = {
    value: ColoredText;
    onClick?: (ct:ColoredText) => void;
}

export default function ColorSpan({value, onClick} : ColorSpanProps){
    let style : CSSProperties = getStyle(value.colors.color, value.colors.bgColor);
    if(onClick !== undefined)
        style['cursor'] = 'pointer';

    return (
    <>
        {onClick === undefined?
                <div style={style}>{value.text}</div>
            :   <div onClick={()=> {onClick(value)}} style={style}>{value.text}</div>
        }
    </>
    );
}