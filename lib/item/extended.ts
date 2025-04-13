import { getToolCommand, ToolOption } from "./tool-option";

export type ExtendedDesc = {
    keywords: string;
    desc : string;
}
  
export function formatExtendedDesc(e:ExtendedDesc,  target: string, opt: ToolOption){
    const command = getToolCommand(opt.isRestring);
    const eol = opt.lineSeparator.length === 0? '\n' : opt.lineSeparator;
    if(opt.all) return [
        'clipboard clear',
        'clipboard edit',
        e.desc,
        (opt.format? '@f' : ''),
        '@x',
        `${command} all.${target} ed add ${e.keywords}`
    ].filter(t => t.length > 0).join(eol);
    else return [
        `${command} ${target} ed add ${e.keywords}`,
        e.desc,
        (opt.format? '@f' : ''),
        '@x'
    ].filter(t => t.length > 0).join(eol);
}