import { useItemContext } from "@/context/item-context";
import { useStringToolContext } from "@/context/string-tool-context";
import { createToggle, ModalDialog } from "@/components";
import { getToolResult } from "@/lib/item";
import { ArchiveBoxIcon, ClipboardDocumentIcon, CloudArrowDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";

export default function ResultBox(){
    const {item, toolOpt} = useStringToolContext();
    const { storage, add } = useItemContext();
    const [name, setName] = React.useState<string>('');
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const toggleDialog = createToggle(dialogRef);

    const hasError = (name:string) =>{
        return name.length === 0? 'Name cannot be empty' : (storage.map(e => e.name).includes(name))? 'Name is already taken' : null;
    }

    const error = hasError(name);
    const result = getToolResult(item, toolOpt);
    const handleCopy = () => {
        navigator.clipboard.writeText(result);
    };
    
    const handleSave = () => {
        add({name: name, item:{...item, short: item.cShort}});
        setName('');
        toggleDialog();
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const json=JSON.stringify({...item, short: item.cShort});
        const file=new Blob([json],{type:'application/json'});
        element.href = URL.createObjectURL(file);
        element.download = 'Item.json';
        document.body.appendChild(element);
        element.click();
    };

    const handleCancel = () =>{
        setName('');
        toggleDialog();
    }
    
    return (
        <div className="card">
            <div className="grid gap-4 md:grid-cols-4 md:justify-between">
                <p className="md:col-span-3">Copy the text below into The Inquisition: Legacy</p>
                <div className="grid gap-4 md:grid-cols-3">
                    <button className='text-icon-button' onClick={() => handleCopy()}>
                        <p className="md:hidden">Copy to Clipboard</p>
                        <ClipboardDocumentIcon className='color-text size-5 m-2'/>
                    </button>
                    <button className='text-icon-button' onClick={() => toggleDialog()}>
                        <p className="md:hidden">Save in Browser</p>
                        <ArchiveBoxIcon className='color-text size-5 m-2'/>
                    </button>
                    <button className='text-icon-button' onClick={() => handleDownload()}>
                        <p className="md:hidden">Download Json</p>
                        <CloudArrowDownIcon className='color-text size-5 m-2'/>
                    </button>
                </div>
                <ModalDialog className="h-fit md:self-auto md:top-1/3" toggleDialog={toggleDialog} ref={dialogRef}>
                    <div className="card-container">
                        <div>
                            <h2>Save Item</h2>
                            <p>Saving an item or gradient writes data to your browsers localstorage.</p>
                            <p>To save an item, please select a name for the new item.</p>
                        </div>
                        <div className="relative w-full grid gap-1">
                            <p className={clsx(error !== null && 'text-red-500')}>Name</p>
                            <textarea
                                className={clsx("w-full resize-none rounded-[7px] border border-primary-light px-3 py-2 text-text bg-primary-dark", error !== null && 'border-red-500')}
                                rows={1}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <p className={clsx('text-red-500', error === null && 'hidden')}>{error}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <button className="w-1/3" onClick={()=>handleCancel()}>Cancel</button>
                            <button className="w-1/3" onClick={()=>handleSave()}>Save</button>
                        </div>
                    </div>                    
                </ModalDialog>
                <div className="rounded-lg p-4 bg-primary-dark md:col-span-4">
                    {result.split(toolOpt.lineSeparator.length > 0? toolOpt.lineSeparator : '\n').map((l, i) => <p key={`result-line-${i}`}>{l+toolOpt.lineSeparator}</p>)}
                </div>
            </div>
        </div>
    );
}