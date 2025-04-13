import { CircleCheckMark } from "../icons";

interface SelectListProps<T>{
    options: T[];
    value: T;
    onChange: (value:T) => void;
    render: (value:T) => React.JSX.Element;
}

export default function SelectList<T>({options, value, onChange, render}:SelectListProps<T>){
    return (
        <div className="flex flex-col divide-y-2 divide-primary-light md:divide-none w-full h-full">
            {options.map((o, i) => <div className="flex flew-row items-center p-2 hover:bg-primary-light" key={`select-list-option-${i}`} onClick={() => onChange(o)}> {render(o)} <CircleCheckMark className="h-5 ml-2" checked={o === value}/> </div>)}
        </div>
    );
}