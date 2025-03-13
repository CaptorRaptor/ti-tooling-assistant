import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";

interface ItemNameDialogProps{
    open: boolean;
    onClose: ()=> void;
    onSubmit: (name: string)=> void;
    isNameTaken: (name: string)=> boolean;
}

export default function ItemNameDialog({open, onClose, onSubmit, isNameTaken}:ItemNameDialogProps){
    const [name, setName] = React.useState<string>('');
    const [overwrite, setOverwrite] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
      
    const handleChange = (name: string) => {
        setName(name);
        if(name.length <= 0)
        {
            setError(true);
        }
        else if(isNameTaken(name))
        {
            setError(false);
            setOverwrite(true);
        }
        else{
            setError(false);
            setOverwrite(false);
        }      
    };

    const getHelpText = () =>{
        return error? 'The Name cannot be empty.' 
        : overwrite? 'This will overwrite the saved Item with this name' : '';
    }
    
    const handleSubmit= ()=>
    {
        onSubmit(name);
        onClose();
    }

    return (
        <Dialog
        open={open??false}
        onClose={onClose}
        >
            <DialogTitle>Save Item</DialogTitle>
            <DialogContent>
                <Alert variant="outlined" severity="info" sx={{color: 'text.primary', m:2}}>
                    Saving an item or gradient writes data to your browsers localstorage. 
                </Alert>
                <DialogContentText sx={{color:'text.primary'}}>
                    To save an item, please select a name for the new item.
                </DialogContentText>
                <TextField
                    helperText={getHelpText()}
                    onChange={(e)=>handleChange(e.target.value)}
                    error={name.length === 0}
                    required
                    sx={{
                        m:2,
                        width:'90%',
                        '& .MuiFormHelperText-root':{
                            color: (error? 'error.main':
                                overwrite? 'warning.light':
                                'text.primary'),
                        },
                        '& .MuiInputBase-root':{
                            backgroundColor: 'primary.dark',
                        }
                    }}
                    label="Name"        
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" onClick={()=>handleSubmit()}>{overwrite? 'OverWrite' : 'Save'}</Button>
            </DialogActions>
        </Dialog>
    );
}