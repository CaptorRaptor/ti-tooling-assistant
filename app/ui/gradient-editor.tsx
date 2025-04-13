import ResponsiveCheckBox from "@/components/responsive/responsive-checkbox";
import ResponsiveSelect from "@/components/responsive/responsive-select";
import { GradientStrip, LabelSwitch, ResizeTextArea } from "@/components";
import { useGradientContext } from "@/context/gradient-context";
import { useStringToolContext } from "@/context/string-tool-context";
import { getColorList, getPresets, Gradient } from "@/lib/color";
import { GradientState } from "@/lib/gradient-state";
import { ArchiveBoxIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import PaletteGrid from "@/components/palette-grid";
import clsx from "clsx";
import { useRouter } from 'next/navigation';

export default function GradientEditor(){
    const { gradientState, updateGradient } = useStringToolContext();
    const { updateCreatorState } = useGradientContext();
    const { storage } = useGradientContext();
    const presets = [...getPresets(), ...storage];        
    const router = useRouter();
    
    const handleChange = (value:GradientState) => {
        updateGradient(value);
    }

    const handleApplyMode = (mode:string) => {
        if(mode === 'normal' || mode === 'stretch')
            handleChange({...gradientState, applyMode:mode});
    }

    const handlePresetChange = (value: Gradient) =>{
        handleChange({...gradientState, gradient:value, pattern: value.colors});
    }

    const handlePaletteClick = (input: string) =>{
        const newPattern = gradientState.pattern +' '+input;
        handleChange({...gradientState, pattern: newPattern});
    }

    const handleSaveGradient = () =>{
        updateCreatorState({
            id: undefined, 
            name: 'New Gradient',
            pattern: gradientState.pattern,
            smoothPattern:false,
            length: null,
        });
        router.push('/gradient-creator');
    }

    return (
        <div className="card">
            <div className="flex justify-between">
                <h2>Gradient</h2>
                <div className="flex flex-inline space-x-4 items-center">
                    <LabelSwitch label={'use Gradient'} checked={gradientState.useGradient} onChange={(v) => handleChange({...gradientState, useGradient:v})}/>
                    <PaletteGrid onClick={gradientState.useGradient? handlePaletteClick :undefined}/>
                </div>
            </div>
            <div className={clsx('w-full card-container md:grid-cols-3 md:items-center', !gradientState.useGradient && 'hidden')}>
                <hr className="horizontal-divide mb-2 md:col-span-3"/>
                <div className="md:col-span-2">
                    <ResponsiveSelect options={presets} value={gradientState.gradient} onChange={handlePresetChange} render={(value: Gradient)=> 
                        <div className="w-full">
                            <p>{value.name}</p>
                            <GradientStrip value={getColorList(value.colors)}/>
                        </div>
                    }/>
                </div>
                <button className="min-w-fit">Extract gradient</button>
                <ResponsiveCheckBox label={'reverse pattern'} checked={gradientState.reverse} onChange={(v) => handleChange({...gradientState, reverse:v})}/>
                <ResponsiveCheckBox label={'randomize pattern'} checked={gradientState.random} onChange={(v) => handleChange({...gradientState, random:v})}/>
                <ResponsiveCheckBox label={'mirror pattern'} checked={gradientState.mirror} onChange={(v) => handleChange({...gradientState, mirror:v})}/>
                <div className="relative">
                        <select
                            value={gradientState.applyMode}
                            onChange={(e) => handleApplyMode(e.target.value)}>
                            <option value='normal'>normal</option>
                            <option value='stretch'>stretch</option>
                        </select>
                        <ChevronDownIcon
                            className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-text"
                            aria-hidden="true"
                        />
                </div>
                {gradientState.applyMode === 'normal'?
                        <ResponsiveCheckBox label={'skip spaces'} checked={gradientState.skipSpace} onChange={(v) => handleChange({...gradientState, skipSpace:v})}/>
                    :   <ResponsiveCheckBox label={'keep length'} checked={gradientState.keepLength} onChange={(v) => handleChange({...gradientState, keepLength:v})}/>}
                <hr className="horizontal-divide md:col-span-3 mb-0 mt-2"/>
                <div  className="flex justify-between md:col-span-3">
                    <p>Enter your xterm color codes seperated by a space:</p>
                    <button className='icon-button' onClick={() => handleSaveGradient()}>
                        <ArchiveBoxIcon className='color-text size-5 m-2'/>
                    </button>
                </div>
                <div className="md:col-span-3">
                    <ResizeTextArea placeholder="ffa {r aaf#5 {w#2" value={gradientState.pattern} onChange={(v) => handleChange({...gradientState, pattern:v})} />
                    <GradientStrip value={gradientState.colorList}/>
                </div>
            </div>
        </div>
    );
}