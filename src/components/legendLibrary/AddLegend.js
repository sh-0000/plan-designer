import { Add, PhotoCamera } from "@mui/icons-material";
import {
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
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { BootstrapDialogTitle } from "../dialog/BootstrapDialogTitle";

const AddLegend = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    return setFormData({ name: "", selectedFile: null });
  };

  const previewRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
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
        PaperProps={{ sx: { position: "fixed", top: "10%", m: 0 } }}
        open={open}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Add Legend Icon
        </BootstrapDialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(formData);
            }}
          >
            <DialogContentText> Icon Details </DialogContentText>
            <Grid container spacing={2} alignItems="center" direction="column">
              <Grid item>
                <FormControl
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  sx={{ width: "50ch" }}
                  variant="filled"
                >
                  <InputLabel htmlFor="name-input">Icon Name</InputLabel>
                  <FilledInput id="name-input" />
                </FormControl>
              </Grid>
              <Grid item>
                {formData.selectedFile && (
                  <img height={250} width={250} ref={previewRef} src="" />
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

export default AddLegend;
