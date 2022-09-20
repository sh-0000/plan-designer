import { Box } from "@mui/material";
import Searchbar from "../Searchbar";
import CategoryList from "./CategoryList";
import AddLegend from "./AddLegend";
import IconList from "./IconList";
import { useFilterContext } from "../../context/filter_context";

const LegendLibrary = () => {

  const { filtered_icons: icons, updateIconFilter } = useFilterContext();

  return (
    <>
      <CategoryList onFilter={updateIconFilter} />
      <AddLegend />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "14%",
        }}
      >
        <h1>Legend Library</h1>
        <Searchbar onFilter={updateIconFilter} />
      </Box>
      <Box sx={{ ml: "14%" }}>
        <IconList icons={icons} />
      </Box>
    </>
  );
};

export default LegendLibrary;
