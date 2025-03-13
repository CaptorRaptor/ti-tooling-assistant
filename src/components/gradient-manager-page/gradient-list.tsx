import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { List } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InputIcon from '@mui/icons-material/Input';
import EditIcon from '@mui/icons-material/Edit';
import { CustomIconButton, ColorSpanDivider } from '../ui';
import { getColorList, getDefaultPatternOptions } from '../../lib/color';

interface RowProps{
    index: number;
    display: string;
    onDelete: (index:number)=>void;
    onEdit: (index:number)=>void;
    onLoad: (index:number)=>void;
}


function renderRow(props: RowProps) {
  const { index, display, onDelete, onEdit, onLoad } = props;

  return (
    <ListItem
        secondaryAction={
            <Box sx={{display:'inline-flex'}}>
                <CustomIconButton name={`edit-${index}`} onClick={()=>onEdit(index)} tooltip='Edit'>
                    <EditIcon />
                </CustomIconButton>
                <CustomIconButton name={`delete-${index}`} onClick={()=>onDelete(index)} tooltip='Delete'>
                    <DeleteIcon />
                </CustomIconButton>
                <CustomIconButton name={`load-${index}`} onClick={()=>onLoad(index)} tooltip='Load'>
                    <InputIcon />
                </CustomIconButton>
            </Box>
        }
    >
        <ListItemText primary={display} />
        <ColorSpanDivider>{getColorList(display, getDefaultPatternOptions())}</ColorSpanDivider>
    </ListItem>
  );
}

interface CustomListProps{
    items: string[]    
    onDelete: (index:number)=>void;
    onEdit: (index:number)=>void;
    onLoad: (index:number)=>void;
};

export default function GradientList({items, onDelete, onEdit, onLoad}:CustomListProps) {
  return (
    <Box sx={{ width: '100%', bgcolor: 'primary.dark'}}
    >
        <List>
            {items.map((display, index) =>renderRow({index, display, onDelete, onLoad , onEdit }))}
        </List>
    </Box>
  );
}