import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Drawer,
  Toolbar,
  List,
  Divider,
  ListSubheader,
  ListItemText,
  ListItem,
  Collapse,
  ImageListItem,
  Box,
  imageListItemClasses,
} from "@mui/material";
import { useState } from "react";
import { getUniqueValues } from "../../utils/helpers";

export const LeftPanel = ({ icons }) => {
  const allCategories = getUniqueValues(icons, "category"); //get each unique category from the icons
  const categories = allCategories.filter((c) => c !== "All"); //exclude 'All' from the side panel

  const [active, setActive] = useState("");
  const handleActive = (index) => {
    if (active === index) {
      return setActive("");
    }
    return setActive(index);
  };

  const handleDragStart = (e) => {
    //for dragging and dropping images
    e.dataTransfer.setData("id", e.target.id);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        ["& .MuiDrawer-paper"]: { width: "14%", boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List
        subheader={
          <ListSubheader
            sx={{ color: "#044474", fontSize: "18px" }}
            component="div"
          >
            Icons
          </ListSubheader>
        }
      >
        <Divider />
        {categories.map((category, index) => {
          return (
            <div key={index}>
              <ListItem
                onClick={() => handleActive(index)}
                selected={index === active} //mui conditional styling prop
                button
              >
                <ListItemText
                  primaryTypographyProps={{ noWrap: true }}
                  primary={category}
                />
                {
                  active === index ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  ) /*Conditional rendering to check if active === index */
                }
              </ListItem>

              <Collapse in={index === active} unmountOnExit timeout="auto">
                <Box
                  sx={{
                    display: "grid",
                    gap: "1px",
                    py: "1px",
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                    },
                    [`& .${imageListItemClasses.root}`]: {
                      display: "flex",
                      flexDirection: "column",
                    },
                  }}
                >
                  {icons.map((icon) => {
                    if (icon.category === category)
                      return (
                        <ImageListItem key={icon.id}>
                          <img
                            onDragStart={(e) => handleDragStart(e)}
                            id={icon.id}
                            src={`${icon.img}?w=248&fit=crop&auto=format`}
                            alt={icon.name}
                            loading="lazy"
                            draggable
                          />
                        </ImageListItem>
                      );
                  })}
                </Box>
              </Collapse>
              <Divider />
            </div>
          );
        })}
      </List>
    </Drawer>
  );
};

export const RightPanel = () => {
  return (
    <Drawer
      anchor="right"
      variant="permanent"
      sx={{
        flexShrink: 0,
        ["& .MuiDrawer-paper"]: { width: "14%", boxSizing: "border-box" },
      }}
    >
      <Toolbar />
    </Drawer>
  );
};
