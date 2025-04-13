import clsx from "clsx";
import LabelSwitch from "../base/label-switch";
import LabelCheckBox from "../base/label-checkbox";

interface ResponsiveCheckBoxProps{
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    className?: string;
    disabled?: boolean;
}

export default function ResponsiveCheckBox({label, checked, onChange, className, disabled} : ResponsiveCheckBoxProps){
    return (
        <div className={clsx(className, disabled && 'disabled')}>
            <div className='block md:hidden *:justify-between'><LabelSwitch label={label} checked={checked} onChange={onChange}/></div>
            <div className='hidden md:block'><LabelCheckBox label={label} checked={checked} onChange={onChange}/></div>
        </div>

    );
}