import { Divider, List, ListItem } from '@mui/material';
import { Children } from "react";

const style = {
    py: 0,
    width: '100%',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
};

interface DividedListProps {
    children?: React.ReactNode;
    ref?: React.RefObject<HTMLUListElement>
}
export default function DividedList({children, ref}: DividedListProps) {
    const arrayChildren = Children.toArray(children);
    return (            
        <List sx={style} ref={ref}>
            {
                Children.map(arrayChildren, (child, index) => {
                const isLast = index === arrayChildren.length - 1;
                
                if(child === undefined) return <></>;

                return (
                        <>
                            <ListItem>
                                {child}
                            </ListItem> 
                            {!isLast && <Divider component="li" sx={{bgcolor:'secondary.main'}}/>}
                        </>
                    );
                })}
        </List>       
    );
}