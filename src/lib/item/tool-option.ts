export type ToolOption = {
    key: string;
    all:boolean;
    format:boolean;
    addKeywords: boolean;
    isRestring: boolean;
    lineSeparator: string;
};

export function getDefaultToolOption(): ToolOption{
    return {
        key: '',
        all: false,
        format: true,
        addKeywords: true,
        isRestring: false,
        lineSeparator: ''
    }
}

export function getToolCommand(isRestring:boolean) {
    return isRestring? 'restring': 'tool';
}


export function updateToolOption<KeyType extends keyof ToolOption>(old: ToolOption, key: KeyType, value: ToolOption[KeyType]):ToolOption{
    let newObject ={
        ...old
    };
    newObject[key] = value;
    return newObject;
}