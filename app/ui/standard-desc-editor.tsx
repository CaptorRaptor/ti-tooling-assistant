import { ColorDisplay, createToggle, ModalDialog, ResizeTextArea } from "@/components";
import { useStringToolContext } from "@/context/string-tool-context";
import { removeColor } from "@/lib/color";
import React from "react";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import { ItemDesc } from "@/lib/item";

export default function StandardDescEditor(){
    const {item, updateItem, setShortDesc, resetGradient} = useStringToolContext();
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const toggleDialog = createToggle(dialogRef);
    const [selectedFile, setSelectedFile] = React.useState<string>('');

    const handleShortChange = (value:string) => {
        setShortDesc(value);
    }

    const getShortDescLabel = ()=>{
        const short = removeColor(item.short);
        return (short.length === 0)? 'Short desc' : `Short desc (${short.length} chars)`;
    }
    
    const getLongDescLabel = ()=>{
        const long = removeColor(item.long);
        return (long.length === 0)? 'Long desc' : `Long desc (${long.length} chars)`;
    }

    const handleCapture = (triggerEvent : React.ChangeEvent<HTMLInputElement>) => {
        if(triggerEvent.target.files){
            const fileReader = new FileReader();
            fileReader.readAsText(triggerEvent.target.files![0], "UTF-8");
            fileReader.onload = (e) => {
                if(e && e.target){
                    console.log("e.target.result", e!.target.result);
                    setSelectedFile(e!.target!.result as string);
                }
            };
        }        
    };

    const handleCancel = () =>{
        toggleDialog();
        setSelectedFile('');
    }

    const handleSubmit = () =>{
        if(selectedFile.length > 0){
            const newItem = JSON.parse(selectedFile) as ItemDesc;
            if(newItem){
                resetGradient();
                updateItem(newItem);
            }        
        }
        toggleDialog();
        setSelectedFile('');
    }

    return (
        <div className="card">
            <div className="flex justify-between">
                <h2>Standard Descriptions</h2>
                <button className='text-icon-button w-fit p-2' onClick={() => toggleDialog()}>
                    <p className="md:hidden">Import Item</p>
                    <CloudArrowUpIcon className='color-text size-5 m-2'/>
                </button>
                <ModalDialog className="h-fit md:self-auto md:top-1/3" toggleDialog={toggleDialog} ref={dialogRef}>
                    <div className="card-container">
                        <div>
                            <h2>Import Item</h2>
                            <p>To import an item, please select your item json here.</p>
                        </div>
                        <input className="file-input h-fit content-center" id="file_input"  type="file" onChange={(e)=>handleCapture(e)} accept='json'/>
                        <div className="flex flex-row justify-between">
                            <button className="w-1/3" onClick={()=>handleCancel()}>Cancel</button>
                            <button className="w-1/3" onClick={()=>handleSubmit()}>Submit</button>
                        </div>
                    </div>                    
                </ModalDialog>
            </div>
            <div className='card-container'>
                <hr className="horizontal-divide" />
                <div>
                    <p>{getShortDescLabel()}</p>
                    <ResizeTextArea placeholder="<ffa>test {ritem" value={item.short} onChange={handleShortChange} />
                    <ColorDisplay value={item.cShort}/>
                </div>
                <div>
                    <p>Keywords</p>
                    <ResizeTextArea placeholder="test item" value={item.keywords} onChange={(v) => updateItem({...item, keywords:v})} />
                </div>
                <div>
                    <p>{getLongDescLabel()}</p>
                    <ResizeTextArea placeholder="<ffa>test {ritem{x is here." value={item.long} onChange={(v) => updateItem({...item, long:v})} />
                    <ColorDisplay value={item.long}/>
                </div>
            </div>
        </div>
    );
}