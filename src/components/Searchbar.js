import { InputAdornment, TextField } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { useEffect, useState } from "react";

const Searchbar = ({ onFilter }) => {
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    onFilter({ type: "text", value: inputValue });
  }, [inputValue]);
  return (
    <TextField
      sx={{ minWidth: "35ch", width: "33%" }}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      variant="filled"
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            sx={{
              cursor: "pointer",
            }}
            position="end"
            onClick={() => setInputValue("")}
          >
            {inputValue && <Clear />}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Searchbar;
