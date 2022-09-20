import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FilledInput,
  InputLabel,
  DialogContentText,
  Grid,
  DialogActions,
  Fab,
} from "@mui/material";
import { Add, PhotoCamera } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { BootstrapDialogTitle } from "../dialog/BootstrapDialogTitle";

const AddProjectButton = ({ onAdd }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    return setFormData({ title: "", address: "", selectedFile: null });
  };

  const previewRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    selectedFile: null,
  });

  useEffect(() => {
    if (!formData.selectedFile) return;
    var reader = new FileReader();
    reader.onloadend = () => {
      previewRef.current.src = reader.result;
    };
    reader.readAsDataURL(formData.selectedFile);
  }, [formData.selectedFile]);

  return (
    <>
      <Fab
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        color="primary"
        onClick={handleOpen}
      >
        <Add />
      </Fab>
      <Dialog
        PaperProps={{
          sx: { position: "fixed", top: "10%", m: 0, width: "auto" },
        }}
        open={open}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Add Project
        </BootstrapDialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAdd(formData);
            }}
          >
            <DialogContentText> Project Details </DialogContentText>
            <Grid container spacing={2} alignItems="center" direction="column">
              <Grid item>
                <FormControl
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  sx={{ width: "50ch" }}
                  variant="filled"
                >
                  <InputLabel htmlFor="title-input">Title</InputLabel>
                  <FilledInput id="title-input" />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  sx={{ width: "50ch" }}
                  variant="filled"
                >
                  <InputLabel htmlFor="address-input">Address</InputLabel>
                  <FilledInput id="address-input" />
                </FormControl>
              </Grid>
              <Grid item>
                {formData.selectedFile && (
                  <img height={425} width={425} ref={previewRef} src="" />
                )}
              </Grid>
              <Grid item>
                <FormControl>
                  <Button
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        selectedFile: e.target.files[0],
                      });
                    }}
                    variant="contained"
                    component="label"
                    endIcon={<PhotoCamera />}
                  >
                    Upload
                    <input hidden accept="image/*" type="file" />
                  </Button>
                </FormControl>
              </Grid>
              <Grid item alignSelf="flex-end">
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
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProjectButton;
