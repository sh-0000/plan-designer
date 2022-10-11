import { Typography, Box } from "@mui/material";
import { useFilterContext } from "../context/filter_context";
import { useLibraryContext } from "../context/library_context";
import {
  CategoryList,
  IconList,
  Searchbar,
  AddIconForm,
  Loading,
} from "../components";
const LibraryPage = () => {
  const { icons_loading: loading, icons_error: error, deleteIcon } = useLibraryContext();
  const { filtered_icons: icons, updateIconFilter } = useFilterContext();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Typography variant="h4">
        There was an error while retrieving data
      </Typography>
    );
  }

  return (
    <Box>
      <CategoryList onFilter={updateIconFilter} />
      <AddIconForm />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "14%",
          py: 4,
        }}
      >
        <Searchbar onFilter={updateIconFilter} />
      </Box>
      <Box sx={{ ml: "14%" }}>
        <IconList icons={icons} onDelete={deleteIcon}/>
      </Box>
    </Box>
  );
};
export default LibraryPage;
