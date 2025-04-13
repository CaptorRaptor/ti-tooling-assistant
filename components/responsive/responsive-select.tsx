import React from "react";
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { createToggle, ModalDialog, SelectList } from "..";

interface ResponsiveSelectProps<T>{
    options: T[];
    value: T;
    onChange: (value:T) => void;
    render: (value:T) => React.JSX.Element;
}

export default function ResponsiveSelect<T>({options, value, onChange, render}:ResponsiveSelectProps<T>){
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const toggleDialog = createToggle(dialogRef);

    return (
        <>
            <button 
                className="select-button grid grid-cols-1"
                onClick={() => toggleDialog()}
            >
                <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                    {render(value)}
                </span>
                <ChevronUpDownIcon
                    aria-hidden="true"
                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-text sm:size-4"
                />
            </button>
            <ModalDialog toggleDialog={toggleDialog} ref={dialogRef}>
                <SelectList options={options} value={value} onChange={(v) =>{
                    onChange(v);
                    toggleDialog();
                }} render={render}/>
            </ModalDialog>
        </>
    );
}