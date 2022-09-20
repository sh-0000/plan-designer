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
  ListSubheader,
} from "@mui/material";
import { useFilterContext } from "../../context/filter_context";
import { getUniqueValues } from "../utils/helpers";

const CategoryList = ({ onFilter }) => {
  const {
    icon_filters: { text, category },
    all_icons: icons,
    updateIconFilter,
  } = useFilterContext();
  const categories = getUniqueValues(icons, "category");
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
        <List
          subheader={
            <ListSubheader
              sx={{ color: "#044474", fontSize: "18px" }}
              component="div"
            >
              Category
            </ListSubheader>
          }
        >
          <Divider />
          {categories.map((category, index) => (
            <div key={index}>
              <ListItem
                onClick={() => onFilter({ type: "category", value: category })}
                button
              >
                <ListItemText
                  primaryTypographyProps={{ noWrap: true }}
                  primary={category}
                ></ListItemText>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Drawer>
    </>
  );
};
export default CategoryList;
