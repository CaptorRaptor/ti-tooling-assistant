import clsx from "clsx";
import React from "react";

interface SwitchProps{
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
    className?: string;
}

export default function Switch({checked, onChange, disabled, className} : SwitchProps){
    return (        
        <div className={clsx("relative inline-block w-11 h-5", className)} onClick={onChange}>
            <input 
                checked={checked} 
                id="switch-component" 
                type="checkbox" 
                className="peer appearance-none w-11 h-5 bg-primary-dark rounded-full checked:bg-secondary cursor-pointer transition-colors duration-300"
                readOnly
                disabled={disabled}/>
            <span className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-primary shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-secondary cursor-pointer"/>
        </div>
    );
}