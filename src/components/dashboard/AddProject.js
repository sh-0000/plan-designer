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
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Add, PhotoCamera } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { BootstrapDialogTitle } from "../dialog/BootstrapDialogTitle";

export const AddProject = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({ title: "", address: "", selectedFile: null });
    setOpen(false);
  };

  const previewRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    selectedFile: null,
  });

  useEffect(() => {
    if (!formData.selectedFile) return;

    const objectUrl = URL.createObjectURL(formData.selectedFile); //create blob
    previewRef.current.src = objectUrl;

    return () => URL.revokeObjectURL(objectUrl); //clear blob
  }, [formData.selectedFile]);

  return (
    <>
      <Button onClick={handleOpen} startIcon={<Add />} variant="contained">
        Add Project
      </Button>

      <Dialog
        PaperProps={{ sx: { position: "fixed", top: "10%", m: 0 } }}
        open={open}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Add Project
        </BootstrapDialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(formData);
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
              <Grid item>
                {formData.selectedFile ? (
                  <img height={425} width={425} ref={previewRef} src="" />
                ) : null}
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
