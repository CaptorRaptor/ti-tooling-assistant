import React, { useRef } from "react";

interface ResizeTextAreaProps {
    value: string;
    onChange: (value:string) => void;
    placeholder?: string;
}

export default function ResizeTextArea({value, onChange, placeholder} :ResizeTextAreaProps){

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
            cols={200}
            rows={1}
            value={value}
            style={{resize:'vertical'}}
            onChange={(e) =>onChange(e.target.value)}
            placeholder={placeholder ?? ''}/>
    );
}
