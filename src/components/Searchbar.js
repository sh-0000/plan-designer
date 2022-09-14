import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { useEffect, useState } from "react";

const Searchbar = ({ setQuery }) => {
  const [inputValue, setInputValue] = useState();
  useEffect(() => {
    setQuery(inputValue);
  }, [inputValue]);
  return (
    <FormControl sx={{ minWidth: "35ch", width: "33%" }} variant="filled">
      <InputLabel>Search</InputLabel>
      <FilledInput
        value={inputValue}
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end" onClick={() => setInputValue("")}>
            {inputValue && <Clear />}
          </InputAdornment>
        }
        onChange={(e) => setInputValue(e.target.value)}
      />
    </FormControl>
  );
};

export default Searchbar;
