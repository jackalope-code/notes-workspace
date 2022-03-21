import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { MouseEventHandler, useState } from "react";

interface ConfirmDialogProps {
    open: boolean;
    handleChoiceYes: MouseEventHandler;
    handleChoiceNo: MouseEventHandler;
    handleClose?: MouseEventHandler;
}

const ConfirmDialog = ({open, handleClose, handleChoiceYes, handleChoiceNo}: ConfirmDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose ? handleClose : handleChoiceNo}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete note?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure that you want to delete this note?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleChoiceYes}>Delete</Button>
                <Button onClick={handleChoiceNo} autoFocus>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export function useConfirmDialog(): [boolean, string, (id: string) => void, () => void] {
    const [showDialog, setConfirmDelete] = useState(false);
    const [currentId, setCurrentId] = useState("");

    function setDialogOpen(id: string) {
        setConfirmDelete(true);
        setCurrentId(id);
    }

    function closeDialog() {
        setConfirmDelete(false);
        setCurrentId("");
    }
    return [showDialog, currentId, setDialogOpen, closeDialog];
}

export default ConfirmDialog;