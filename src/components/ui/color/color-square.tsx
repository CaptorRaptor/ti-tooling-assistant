import { Property } from "csstype";

interface ColorSquareProps{
    width: Property.Width<string|number>;
    color:string;
}

export default function ColorSquare({width, color}: ColorSquareProps){
    return(
        <span style={{backgroundColor:color, width:width}}/>
    );
}