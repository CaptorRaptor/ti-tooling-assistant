import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ImportDialogProps{
    title: string;
    text: string;
    open?: boolean
    onClose: ()=> void;
    onSubmit: (path: string)=> void;

}

export default function ImportDialog({title, text, open, onClose, onSubmit}:ImportDialogProps) {
    const [selectedFile, setSelectedFile] = React.useState<string>('');
  
    const handleCapture = (triggerEvent : React.ChangeEvent<HTMLInputElement>) => {
        if(triggerEvent.target.files){
            const fileReader = new FileReader();
            fileReader.readAsText(triggerEvent.target.files![0], "UTF-8");
            fileReader.onload = (e) => {
                if(e && e.target){
                    console.log("e.target.result", e!.target.result);
                    setSelectedFile(e!.target!.result as string);
                }
            };
        }        
    };

    const handleSubmit= ()=>
    {
        onSubmit(selectedFile);
        onClose();
    }
  
    return (
        <Dialog
            open={open??false}
            onClose={onClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{color:'text.primary'}}>
                    {text}
                </DialogContentText>
                <input type="file" onChange={(e)=>handleCapture(e)} accept='json'/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" onClick={()=>handleSubmit()}>Import</Button>
            </DialogActions>
        </Dialog>
    );
}