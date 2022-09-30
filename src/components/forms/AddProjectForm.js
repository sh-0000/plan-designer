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
import BootstrapDialogTitle from "./BootstrapDialogTitle";
import { useProjectsContext } from "../../context/projects_context";

const AddProjectForm = () => {
  const { toggleModal, isModalOpen } = useProjectsContext();

  const handleOpen = () => toggleModal(true);
  const handleClose = () => {
    toggleModal(false);
    return setFormData({ title: "", address: "", selectedFile: null });
  };

  const previewRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    selectedFile: null,
  });

  useEffect(() => {
    if (!formData.selectedFile) return; //guard clause
    /* file reader to create a image preview when uploading images*/
    var reader = new FileReader();
    reader.onloadend = () => {
      previewRef.current.src = reader.result; //update the src of the img element using the useRef hook
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
        open={isModalOpen}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Add Project
        </BootstrapDialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(formData); //need to add functionality
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

export default AddProjectForm;
