import { Add, PhotoCamera } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  FilledInput,
  FormControl,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getUniqueValues } from "../../utils/helpers";
import { useFilterContext } from "../../context/filter_context";
import { useProjectsContext } from "../../context/projects_context";
import BootstrapDialogTitle from "./BootstrapDialogTitle";
import { useLibraryContext } from "../../context/library_context";

const AddIconForm = () => {
  const { all_icons: icons } = useFilterContext();
  const { addIcon, toggleModal, isModalOpen } = useLibraryContext();

  const allCategories = getUniqueValues(icons, "category");
  const categories = allCategories.filter((c) => c !== "All");

  const handleOpen = () => toggleModal(true);
  const handleClose = () => {
    toggleModal(false);
    setFormData({ name: "", selectedFile: null });
  };

  const previewRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
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
        onClick={handleOpen}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        color="primary"
      >
        <Add />
      </Fab>
      <Dialog
        PaperProps={{
          sx: { position: "fixed", top: "10%", m: 0, width: "min(50ch, 100%)" },
        }}
        open={isModalOpen}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Add Legend Icon
        </BootstrapDialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addIcon(formData);
            }}
          >
            <DialogContentText> Icon Details </DialogContentText>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <FormControl
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  sx={{ width: "100%" }}
                  variant="filled"
                >
                  <InputLabel htmlFor="name-input">Icon Name</InputLabel>
                  <FilledInput id="name-input" />
                </FormControl>
              </Grid>
              <Grid item alignSelf="center">
                {formData.selectedFile && (
                  <img width="100%" ref={previewRef} src="" />
                )}
              </Grid>
              <Grid item>
                <FormControl sx={{ width: "100%" }}>
                  <Autocomplete
                    freeSolo
                    options={categories}
                    onChange={(e, value) => {
                      setFormData({ ...formData, category: value });
                    }}
                    onInputChange={(e, value) => {
                      setFormData({ ...formData, category: value });
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="filled"
                        {...params}
                        label="Category"
                        placeholder="Select or enter new a category..."
                      />
                    )}
                  />
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

export default AddIconForm;
