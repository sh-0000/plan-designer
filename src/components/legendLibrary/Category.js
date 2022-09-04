import {
  ListItem,
  ListItemButton,
  IconButton,
  ListItemText,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { ConfirmDialog } from "../dialog/ConfirmDialog";
import { useState } from "react";
const Category = ({ category, visibility, onDelete }) => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={category.name} />
          <IconButton
            onClick={() =>
              setConfirmDialog({
                isOpen: true,
                title:
                  'Are you sure you want to delete "' + category.name + '"',
                onConfirm: () => {
                  onDelete(category.id);
                },
              })
            }
            sx={{
              visibility,
              "&:hover": {
                bgcolor: "error.main",
                color: "white",
              },
            }}
          >
            <Delete />
          </IconButton>
        </ListItemButton>
      </ListItem>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};
export default Category;
