import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { defaultBg } from '../../../lib/color';

const TerminalPaper = styled(Paper)(({ theme }) => ({
    backgroundColor:defaultBg,
    fontFamily: 'monospace',
    width:'100%',
    fontSize:'20px',
    textAlign: 'left',
    lineHeight: '1.3em',
    minHeight:'1.3em',
    display: 'block',
    clear: 'both',
    whiteSpace:'pre-wrap'
}));
export default TerminalPaper;