import { useState } from "react";
import { BootstrapDialogTitle } from "../dialog/BootstrapDialogTitle";
import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  FilledInput,
  DialogActions,
} from "@mui/material";

const AddCategory = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(categoryName);
    return handleClose();
  };

  const [categoryName, setCategoryName] = useState();

  return (
    <>
      <Button onClick={handleOpen} startIcon={<Add />} variant="contained">
        Add Category
      </Button>
      <Dialog
        PaperProps={{ sx: { position: "fixed", top: "10%", m: 0 } }}
        open={open}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Add Project
        </BootstrapDialogTitle>
        <DialogContent>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormControl
              required
              onChange={(e) => setCategoryName(e.target.value)}
              sx={{ width: "30ch" }}
              variant="filled"
            >
              <InputLabel htmlFor="category-input">Category Name</InputLabel>
              <FilledInput id="category-input" />
            </FormControl>
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{
                  bgcolor: "#616161",
                  "&:hover": { bgcolor: "#494949" },
                }}
                variant="contained"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddCategory;
