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
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useState } from "react";

export const LeftPanel = ({ categories, icons }) => {
  const [active, setActive] = useState("");
  const handleActive = (id) => {
    if (active === id) {
      return setActive("");
    }
    return setActive(id);
  };

  const handleDragStart = (e) => {
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
        {categories &&
          categories.map((category) => {
            return (
              <div key={category.id}>
                <ListItem
                  onClick={() => handleActive(category.id)}
                  selected={category.id === active}
                  button
                >
                  <ListItemText
                    primaryTypographyProps={{ noWrap: true }}
                    primary={category.name}
                  />
                  {active === category.id ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse
                  in={category.id === active}
                  unmountOnExit
                  timeout="auto"
                >
                  <ImageList cols={4} sx={{ width: "100%", height: "100%" }}>
                    {icons &&
                      icons.map((icon) => {
                        if (icon.categoryid === category.id)
                          return (
                            <ImageListItem
                              sx={{ width: 60, height: 60 }}
                              key={icon.id}
                            >
                              <img
                                onDragStart={(e) => handleDragStart(e)}
                                id={icon.id}
                                src={icon.img}
                                alt={icon.name}
                                loading="lazy"
                                draggable
                              />
                            </ImageListItem>
                          );
                      })}
                  </ImageList>
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
