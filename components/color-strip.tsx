import clsx from "clsx";

interface ColorStripProps{
    className?: string;
    value: string[];
}

export default function ColorStrip({className, value} : ColorStripProps){
    const percent = +(100/value.length).toFixed(2);
    const gradient = value.map((c,i) => `${c} ${i*percent}% ${i < value.length-1? `${(i+1)*percent}%`:'100%'}`);
    return (
        <>
            <div className={clsx('flex w-full h-[10px]', className)}>
                <div className={clsx('h-full w-full', value.length === 0 && 'hidden')} style={{backgroundImage:`linear-gradient(to right, ${gradient})`}}/>
                <div key='color-strip-default-box' className={clsx('h-full w-full bg-terminal-fg', value.length !== 0 && 'hidden')}/>                
            </div>
        </>
    );
}