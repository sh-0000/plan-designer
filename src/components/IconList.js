import {
  Box,
  Container,
  Grid,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import ConfirmDialog from "./forms/ConfirmDialog";
import { useState } from "react";

const IconList = ({ icons, onDelete }) => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });
  return (
    <Container>
      {icons.length > 0 ? (
        <Grid container spacing={1}>
          {icons.map((icon) => (
            <Grid
              sx={{
                position: "relative",
                "&:hover": { "#del-btn": { opacity: 1 } },
              }}
              item
              xs={6}
              sm={3}
              md={2}
              key={icon.id}
            >
              <ImageListItem key={icon.id}>
                <img
                  style={{
                    borderRadius: "5px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    padding: "10px",
                  }}
                  src={icon.img}
                  alt={icon.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={icon.name}
                  subtitle={icon.category}
                  position="below"
                />
              </ImageListItem>
              <IconButton
                id="del-btn"
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 0,
                  opacity: 0,
                  "&:hover": { bgcolor: "error.main", color: "white" },
                  transition: "0.2s ease",
                }}
                onClick={() =>
                  setConfirmDialog({
                    isOpen: true,
                    title:
                      'Are you sure you want to delete "' + icon.name + '"',
                    onConfirm: () => {
                      onDelete(icon.id);
                    },
                  })
                }
              >
                <Delete sx={{ fontSize: "1.2rem" }} />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">No matching results found...</Typography>
      )}
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Container>
  );
};
export default IconList;
