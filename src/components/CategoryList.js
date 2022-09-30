import {
  List,
  ListItemText,
  Divider,
  Toolbar,
  Drawer,
  ListItem,
  ListSubheader,
} from "@mui/material";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues } from "../utils/helpers";

const CategoryList = ({ onFilter }) => {
  const {
    all_icons: icons,
    icon_filters: { category: selected },
  } = useFilterContext();

  const categories = getUniqueValues(
    icons,
    "category"
  ); /* get all unique category values from icons */
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
                selected={category === selected}
                /* onClick passes object {type: 'category' and value: string}
                to the filter_context using the onFilter prop */
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
