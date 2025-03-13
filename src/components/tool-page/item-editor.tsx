import { ExtendedDesc, ItemDesc, SpecialExtendedList } from "../../lib/item";
import { LoadedContent } from "../ui";
import DescEditor from "./desc-editor";
import ExtendedEditor from "./extended-editor";
import SpecialExtendedEditor from "./special-extended-editor";

interface ItemEditorProps {
    value: ItemDesc;
    onChange: (item:ItemDesc) => void;
    loading:boolean;
    applyColors: (short: string) => string;
    onImport: () => void;
}

export default function ItemEditor({value, onChange, loading, applyColors, onImport}:ItemEditorProps){

    const handleSpecialEDChange = (specialED: SpecialExtendedList) =>{
        let newItem = {
            ...value
        }
        newItem.special = specialED;
        onChange(newItem);
    };

    const handleEDChange = (EDList: ExtendedDesc[]) =>{
        let newItem = {
            ...value
        }
        newItem.extendedDescList = EDList;
        onChange(newItem);
    };

    return (
    <>
        <LoadedContent isLoading={loading}>
            <DescEditor value={value} onChange={onChange} applyColors={applyColors} onImport={onImport}/>
        </LoadedContent>
        <LoadedContent isLoading={loading}>
            <ExtendedEditor value={value.extendedDescList} onChange={handleEDChange} keywords={value.keywords}/>
        </LoadedContent>
        <LoadedContent isLoading={loading}>
            <SpecialExtendedEditor value={value.special} onChange={handleSpecialEDChange}/>
        </LoadedContent>
    </>);
}