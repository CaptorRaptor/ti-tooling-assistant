import { Box } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
export default function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index } = props;
  
    return (
        <>
            {value === index && <Box sx={{ p: 3, maxHeight:'fit-content', width:'100%'}}>{children}</Box>}
        </>
    );
}