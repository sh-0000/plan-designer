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
  Box,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import AddCategory from "./AddCategory";
import Category from "./Category";

const CategoryList = ({ categories, onSubmit, onDelete, onFilter }) => {
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
              <ListItemButton onClick={() => onFilter()}>
                <ListItemText primary="All" />
              </ListItemButton>
            </ListItem>
            <Divider />
            {categories.map((category) => {
              return (
                <Category
                  key={category.id}
                  onDelete={onDelete}
                  onFilter={onFilter}
                  visibility={visibility}
                  category={category}
                />
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
export default CategoryList;
