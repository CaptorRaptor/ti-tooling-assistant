'use client'

import clsx from 'clsx';
import React from 'react';

interface ModalDialogProps{    
    children?: React.ReactNode;
    className?: string;
    toggleDialog: ()=> void;
}

export const createToggle = (dialogRef: React.RefObject<HTMLDialogElement | null>) => () =>{
    if(!dialogRef.current){
        return;
    }
    
    if(dialogRef.current.hasAttribute('open'))
    {
        dialogRef.current.close();
        document.body.style.overflow = 'scroll';
    }
    else{
        dialogRef.current.showModal();
        document.body.style.overflow = 'hidden';
    }
}

const ModalDialog = React.forwardRef<HTMLDialogElement, ModalDialogProps>(({className, children, toggleDialog}, ref) => {
  return (
    <dialog 
        ref={ref} 
        className={clsx('card p-0 fade-in modal-content scrollbar', className)} 
        onClick={(e)=>{
            if(e.currentTarget === e.target){
                toggleDialog();
            }
        }}
    >
        <div className='p-4 pt-5 sm:p-6 sm:pb-4'>
            {children}
        </div>
    </dialog>
  )
});

ModalDialog.displayName = 'ModalDialog';

export default ModalDialog;
