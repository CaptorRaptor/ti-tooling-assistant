import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        contrastThreshold: 4.5,
        primary: {
            light: '#263447',
            main: '#142030',
            dark: '#0e1621',
            contrastText: '#f5e5e6',
        },
        secondary: {
            light: '#702700',
            main: '#a13800',
            dark: '#702700'
        },
        text:{
            primary:'#f5e5e6'
        },
        background:{
            default: '#142030',
            paper: '#142030'
        },
    },
    typography:{
        fontFamily: '"Space Mono", Monaco, monospace',
        fontSize:14
    },
    components:{
        MuiSvgIcon:{
            defaultProps:{
                htmlColor: '#f5e5e6',
            }
        },
        MuiButton:{
            defaultProps:{
                color: 'secondary',
                variant: 'contained',
                sx: {
                    width:'fit-content',
                    fontSize:'inherit' 
                },      
            },
        },
        MuiTextField:{
            defaultProps:{
                sx:{
                    m:2,
                    width:'90%',
                    '& .MuiInputLabel-root': {
                        color: 'text.primary'
                    },
                    '& .MuiFormHelperText-root':{
                        color: 'text.primary',
                    },
                    '& .MuiInputBase-root':{
                        backgroundColor: 'primary.dark',
                    }
                }
            }
        }
    }
});