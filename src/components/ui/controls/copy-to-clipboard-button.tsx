import React from "react";
import { Snackbar } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import CustomIconButton from "./custom-icon-button";

interface CopyToClipboardButtonProps {
    children: string
}

export default function CopyToClipboardButton({children}: CopyToClipboardButtonProps){
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(children);
  };

  return (
    <>
        <CustomIconButton name={'copy-to-clipboard'} onClick={handleClick} tooltip='Copy to Clipboard'>
            <ContentCopy />
        </CustomIconButton>
        <Snackbar
            message="Copied to clibboard"
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            open={open}
        />
        </>
  );
};
