import { toColoredText } from "@/lib/color";
import clsx from "clsx";

interface ColorDisplayProps{
    className?: string;
    value: string;
}

export default function ColorDisplay({value, className} : ColorDisplayProps){
    const lines = value.split(/(.*\n)/g);
    const coloredList = lines.map(l => toColoredText(l, true));

    return (
        <div className={clsx("terminal m-0 p-1 justify-start min-h-8", className)}>
            {coloredList.map((l, i) => <div key={`color-display-row-${i}`} className="flex flex-row flex-wrap">
                {l.map((c, j) => <div key={`color-part-${j}`} style={{color: c.colors.color, backgroundColor: c.colors.bgColor, whiteSpace:"pre-wrap"}}>{c.text}</div>)}
            </div>)}
        </div>
    );
}