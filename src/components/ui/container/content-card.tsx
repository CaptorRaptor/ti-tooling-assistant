import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const ContentCard = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
}));

export default ContentCard;