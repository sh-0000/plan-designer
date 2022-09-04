import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  Toolbar,
  Drawer,
  ListItem,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import AddCategory from "./AddCategory";
import { ConfirmDialog } from "../dialog/ConfirmDialog";
import Category from "./Category";

const CategoryList = ({ categories, onSubmit, onDelete }) => {
  const [visibility, setVisibility] = useState("hidden");

  const toggleVisibility = () => {
    visibility == "hidden" ? setVisibility("visible") : setVisibility("hidden");
  };
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          flexShrink: 0,
          ["& .MuiDrawer-paper"]: { width: "14%", boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          <Typography variant="h5">Category</Typography>
          <AddCategory onSubmit={onSubmit} />
        </Box>
        <Box sx={{ overflow: "auto" }}>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="All" />
              </ListItemButton>
            </ListItem>
            <Divider />
            {categories.map((category) => {
              return (
                <Category onDelete={onDelete} visibility={visibility} category={category} />
                /*  <div key={category.id}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={category.name} />
                      <IconButton
                        onClick={() =>
                          setConfirmDialog({
                            isOpen: true,
                            title:
                              'Are you sure you want to delete "' +
                              category.name +
                              '"',
                            onConfirm: () => {
                              onDeleteCategory(category.id);
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
                        <DeleteIcon />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </div> */
              );
            })}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            position: "sticky",
            top: "100%",
          }}
        >
          <IconButton onClick={toggleVisibility}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
};
export default CategoryList
