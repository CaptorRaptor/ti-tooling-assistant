import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const ResultPaper = styled(Paper)(({ theme }) => ({
    wordBreak:'break-all',
    fontFamily: 'monospace',
    backgroundColor: theme.palette.primary.dark,
    maxHeight: 'fit-content',
    clear: 'both',
    marginTop: '20px',
    padding: '1%',
    marginBottom: '10px',
    fontSize: '12px',
    textAlign: 'left',
    whiteSpace:'pre-wrap'
  }));


export default ResultPaper;