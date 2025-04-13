export type ToolOption = {
    key: string;
    all:boolean;
    format:boolean;
    addKeywords: boolean;
    isRestring: boolean;
    lineSeparator: string;
    reduceColor: boolean;
};

export function getDefaultToolOption(): ToolOption{
    return {
        key: '',
        all: false,
        format: true,
        addKeywords: true,
        isRestring: false,
        lineSeparator: '',
        reduceColor: true,
    }
}

export function getToolCommand(isRestring:boolean) {
    return isRestring? 'restring': 'tool';
}