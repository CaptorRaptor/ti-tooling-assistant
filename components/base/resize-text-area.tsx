import clsx from "clsx";
import React, { useRef } from "react";

interface ResizeTextAreaProps {
    value: string;
    onChange: (value:string) => void;
    placeholder?: string;
    className?:string;
}

export default function ResizeTextArea({value, onChange, placeholder, className} :ResizeTextAreaProps){

    const ref = useRef<HTMLTextAreaElement>(null);

     React.useEffect(() => {
        if(ref.current){
            ref.current.style.height = '0px';
            ref.current.style.height = ref.current.scrollHeight + "px";
            ref.current.style.overflowY = "hidden";
        }
    }, [value]);

    return (
        <textarea
            ref={ref}
            value={value}
            className={clsx("bg-primary-dark p-1 text-text w-full min-h-8 placeholder-text/50 rounded break-all", className)}
            onChange={(e) =>onChange(e.target.value)}
            placeholder={placeholder ?? ''}/>
    );
}
