import { Checkbox } from "@headlessui/react";
import clsx from "clsx";

interface LabelCheckBoxProps{
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    className?: string;
    disabled?: boolean;
}

export default function LabelCheckBox({label, checked, onChange, className, disabled} : LabelCheckBoxProps){
    return (
        <div className={clsx(className)}>       
            <Checkbox 
                checked={checked} 
                onChange={onChange} 
                as='div'
                className={clsx('flex flex-inline space-x-2 items-center cursor-pointer')}
            >
                <span className={clsx('block size-5 rounded border border-2 bg-primary-dark', disabled? 'border-text/80 cursor-not-allowed' : 'border-text')}>
                    <svg className={clsx(disabled? 'stroke-text/80':'stroke-text', !checked && 'hidden')} viewBox="0 0 14 14" fill="none">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                <p className={clsx(disabled? 'text-text/80' : 'text-text')}>{label}</p>
            </Checkbox>
        </div>

    );
}