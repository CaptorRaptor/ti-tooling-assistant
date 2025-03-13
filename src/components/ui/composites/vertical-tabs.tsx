import * as React from 'react';
import { Stack, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {CustomTabPanel} from '../container';

interface TabPanel {
    label: string;
    content?: React.ReactNode;
}
  
function tabProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface VerticalTabsProps {
    children: TabPanel[]
}

export default function VerticalTabs({children}:VerticalTabsProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'fit-content' }}>
                <Stack>
                    <Tabs 
                        orientation="vertical" 
                        indicatorColor='secondary' 
                        textColor='inherit' 
                        variant='fullWidth'
                        value={value} 
                        onChange={handleChange} 
                        aria-label='color pick tabs'>
                        {children.map((t,i) => <Tab key={`${t.label}-tab-button`} label={t.label} {...tabProps(i)} />)}
                    </Tabs>
                </Stack>
                {children.map((t,i) => <CustomTabPanel key={`${t.label}-tab`} index={i} value={value}>{t.content}</CustomTabPanel>)}
            </Box>            
        </>
    );
}