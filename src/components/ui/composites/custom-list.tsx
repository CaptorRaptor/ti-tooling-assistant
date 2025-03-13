import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { List } from '@mui/material';
import {CustomIconButton} from '../controls';
import DeleteIcon from '@mui/icons-material/Delete';
import InputIcon from '@mui/icons-material/Input';

interface RowProps{
    index: number;
    display: string;
    onDelete?: (index:number)=>void;
    onLoad?: (index:number)=>void;
}


function renderRow(props: RowProps) {
  const { index, display, onDelete, onLoad } = props;

  return (
    <ListItem
        secondaryAction={
            <Box sx={{display:'inline-flex'}}>
               {onDelete !== undefined &&
                <CustomIconButton name={`delete-${index}`} onClick={()=>onDelete(index)} tooltip='Delete'>
                    <DeleteIcon />
                </CustomIconButton>}
               {onLoad !== undefined &&
                <CustomIconButton name={`load-${index}`} onClick={()=>onLoad(index)} tooltip='Load'>
                    <InputIcon />
                </CustomIconButton>}
            </Box>
        }
    >
        <ListItemText primary={display} />
    </ListItem>
  );
}

interface CustomListProps{
    items: string[]
    onDelete?: (index:number)=>void;
    onLoad?: (index:number)=>void;
};

export default function CustomList({items, onDelete, onLoad}:CustomListProps) {
  return (
    <Box sx={{ width: '100%', bgcolor: 'primary.dark'}}
    >
        <List>
            {items.map((display, index) =>renderRow({index, display, onDelete, onLoad }))}
        </List>
    </Box>
  );
}