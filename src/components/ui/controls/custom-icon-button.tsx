import { IconButton, Tooltip } from "@mui/material";

interface CustomIconButtonProps{
    name: string;
    onClick: ()=>void;
    children: React.ReactNode;
    tooltip?: string;
}

export default function CustomIconButton({name, onClick, tooltip, children}: CustomIconButtonProps){
    return (        
        <Tooltip title={tooltip}>
            <IconButton 
                aria-label={`${name}-button`} 
                size='large' 
                onClick={()=>onClick()}
                sx={{
                    '&:hover': {
                        bgcolor: 'secondary.main'
                    }
                  }}
            >
                {children}
            </IconButton>
        </Tooltip>
    );
}