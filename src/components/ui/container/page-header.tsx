
import { LoadedContent } from '..';
import { Typography } from '@mui/material';

interface PageHeaderProps {
    title:string;
    isLoading: boolean;
    children: React.ReactNode;
}

export default function PageHeader({title, isLoading, children} : PageHeaderProps){
    return (
        <LoadedContent isLoading={isLoading}>
            <Typography variant='h4'>{title}</Typography>
            {children}
        </LoadedContent>
    );
}