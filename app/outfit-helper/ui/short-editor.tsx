import { ResizeTextArea } from "@/components";
import { OutfitItem } from "@/lib/wear-slots"
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import clsx from "clsx"

interface ShortEditorProps {
    list: OutfitItem[]
    label: string;
    length?: number;
    onUpdate: (list: OutfitItem[]) => void;
}

export default function ShortEditor({list, label, length, onUpdate}: ShortEditorProps){
    const changeShort = (item: OutfitItem, v: string) : OutfitItem =>{
        const length = v.length;
        let color = item.color;
        if(color.length > length){
            color = color.slice(0, length);
        }
        else if (color.length < length){
            for(let i = 0; i < length; i++){
                color.push(null);
            }
        }
        return {key: item.key, color: color, short:v};
    }

    const handleAdd = () =>{
        onUpdate([...list, {key:'', color: [], short: ''}]);
    }

    const handleDelete = (index: number) =>{
        onUpdate([...list.slice(0, index), ...list.slice(index + 1)]);
    }
    
    const handleChange = (index: number, item: OutfitItem) =>{
        let newList = [...list];
        newList[index] = item;
        onUpdate(newList);
    }

    return (
        <>
            <div className="flex flex-row content-center justify-between">
                <h2>{label}</h2>                 
                <button className={clsx('icon-button', list.length >= (length ?? 0) && 'hidden')} onClick={() => handleAdd()}>
                    <PlusIcon className='color-text size-5 m-2'/>
                </button>
            </div>
            {list.map((item, i) =>
                <div key={`short-editor-${i}`} className="flex flex-row content-center justify-between gap-4">
                    <ResizeTextArea className="max-w-30" placeholder="keyword" 
                        value={item.key} 
                        onChange={v => handleChange(i, {...item, key:v})} />
                    <ResizeTextArea className='grow' placeholder="short desc" 
                        value={item!.short} 
                        onChange={v => handleChange(i, changeShort(item!, v))} />
                    <button className='icon-button' onClick={() => handleDelete(i)}>
                        <TrashIcon className='color-text size-5 m-2'/>
                    </button>
                </div>
            )}
        </>
    )
}