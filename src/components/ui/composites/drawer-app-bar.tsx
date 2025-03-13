import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import {CustomTabPanel} from '../container';

interface DrawerAppBarProps{
    title: string;
    value: number;
    onChange: (value: number) => void;
    children: {name:string, content: React.ReactNode}[];
};

const drawerWidth = 240;
//const navItems = ['String Tool', 'ASCII Art Drawing Pad','Gradient Manager', 'Item Storage'];

export default function DrawerAppBar({title, children, value, onChange}: DrawerAppBarProps) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
  
    const handleChange = (newValue: number) => {
        onChange(newValue);
    };
  
    const handleDrawerToggle = () => {
      setDrawerOpen((prevState) => !prevState);
    };
  
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                {title}
            </Typography>
            <Divider />
            <List>
            {children.map((item, i) => (
                <ListItem key={item.name+'-drawer-entry'} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={()=>handleChange(i)}>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Box>
    );
  
    const container = window !== undefined ? () => window.document.body : undefined;
  
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}
                        >
                            {title}
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                            <ButtonGroup variant="text" aria-label="Basic button group" color='secondary'>
                                {children.map((item, i) => (
                                        <Button key={item.name+'-button'} sx={{ fontSize:'150%', color: 'text.primary', bgcolor: 'primary.main', '&:hover':{ bgcolor: 'secondary.main'} }} onClick={()=>handleChange(i)}>
                                            {item.name}
                                        </Button>
                                ))}
                            </ButtonGroup>
                        </Box>
                </Toolbar>
            </AppBar>
            <nav>
            <Drawer
                container={container}
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            </nav>
            <Box component='main' sx={{ p: 3 }} width={'100%'}>
                <Toolbar />
                {children.map((t,i) => <CustomTabPanel key={t.name+'-tab'} index={i} value={value}>{t.content}</CustomTabPanel>)}
            </Box>
        </Box>
    );
}