import { Skeleton } from "@mui/material";
import ContentCard from "./content-card";

interface LoadingComponentProps {
    isLoading: boolean;
    children: React.ReactNode;
}


export default function LoadedContent({isLoading, children}:LoadingComponentProps){
    return (isLoading?
        <Skeleton variant="rectangular" sx={{maxWidth:'md'}}>{children}</Skeleton>
        : <ContentCard>{children}</ContentCard>
    );    
}