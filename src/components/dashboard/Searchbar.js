import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = ({ setQuery }) => {
  return (
    <FormControl sx={{ m: 1, width: "40ch" }} variant="filled">
      <InputLabel htmlFor="search-bar">Search</InputLabel>
      <FilledInput
        id="search-bar"
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        onChange={(e) => setQuery(e.target.value)}
      />
    </FormControl>
  );
};

export default Searchbar;
