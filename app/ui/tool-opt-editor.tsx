import { useStringToolContext } from "@/context/string-tool-context";
import { ResizeTextArea } from "@/components";
import ResponsiveCheckBox from "@/components/responsive/responsive-checkbox";

export default function ToolOptEditor(){
    const {toolOpt, updateToolOpt} = useStringToolContext();
    
    return (
        <div className="card grid md:grid-cols-3 gap-4">
            <div className="card-container md:col-span-2">
                <div>
                    <p>Line separator</p>
                    <ResizeTextArea placeholder="\n" value={toolOpt.lineSeparator} onChange={(v) => updateToolOpt({...toolOpt, lineSeparator:v})} />
                </div>
                <div>
                    <p>Target object to tool</p>
                    <ResizeTextArea value={toolOpt.key} onChange={(v) => updateToolOpt({...toolOpt, key:v})} />
                </div>
            </div>
            <div className="grid gap-4">
                <ResponsiveCheckBox label={'tool all'} checked={toolOpt.all} onChange={(v:boolean) => updateToolOpt({...toolOpt, all:v})}/>
                <ResponsiveCheckBox label={'format descriptions'} checked={toolOpt.format} onChange={(v:boolean) => updateToolOpt({...toolOpt, format:v})}/>
                <ResponsiveCheckBox label={'add extended keywords'} checked={toolOpt.addKeywords} onChange={(v:boolean) => updateToolOpt({...toolOpt, addKeywords:v})}/>
                <ResponsiveCheckBox label={'use restring command'} checked={toolOpt.isRestring} onChange={(v:boolean) => updateToolOpt({...toolOpt, isRestring:v})}/>
                <ResponsiveCheckBox label={'remove extra color'} checked={toolOpt.reduceColor} onChange={(v:boolean) => updateToolOpt({...toolOpt, reduceColor:v})}/>
            </div>
        </div>
    );
}