import {getStyle} from "./color-text-style";

type ColorTextProps = {
    color: string;
    bgColor:string;
    children: JSX.Element | string;
}

export default function ColorText({color, bgColor, children} : ColorTextProps){
    return (
    <>
        <div style={getStyle(color, bgColor)}>{children}</div>
    </>
    );
}