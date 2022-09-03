import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { BootstrapDialogTitle } from "./BootstrapDialogTitle";

export const ConfirmDialog = (props) => {
  const { confirmDialog, setConfirmDialog } = props;

  const handleClose = () =>
    setConfirmDialog({ ...confirmDialog, isOpen: false });

  return (
    <>
      <Dialog open={confirmDialog.isOpen} onClose={handleClose} maxWidth="lg">
        <BootstrapDialogTitle onClose={handleClose}>
          Confirm Action
        </BootstrapDialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.title}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>

          <Button
            onClick={confirmDialog.onConfirm}
            color="error"
            variant="contained"
          >
            Yes, Delete it
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
