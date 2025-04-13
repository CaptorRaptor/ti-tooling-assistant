import clsx from "clsx";

export default function CircleCheckMark(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {checked: boolean}){
    return (
        <div {...props}>
            <div className="rounded-full items-center justify-center border border-2 border-text h-full aspect-square p-0.5">
                <div className={clsx("rounded-full bg-text h-full aspect-square", !props.checked && "hidden")}/>
            </div>  
        </div>
    );    
} 
