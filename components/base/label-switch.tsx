import Switch from "./switch";

interface LabelSwitchProps{
    label: string;
    checked: boolean;
    onChange: (value:boolean) => void;
}

export default function LabelSwitch({label, checked, onChange}: LabelSwitchProps){
    const handleChange = () =>{
        onChange(!checked);
    }

    return (      
        <div className="group flex flex-inline space-x-2 items-center cursor-pointer"  onClick={() => handleChange()}>
            <p className="text-text">{label}</p>
            <Switch checked={checked} onChange={() => handleChange()}/>
        </div>

    );
}