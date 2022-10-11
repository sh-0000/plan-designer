import { InputAdornment, TextField } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { useEffect, useState } from "react";

const Searchbar = ({ onFilter }) => {
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    onFilter({ type: "text", value: inputValue });
  }, [inputValue]); //dependency of inputValue ensures that useEffect will run everytime inputValue is changed
  return (
    <TextField
      sx={{ width: "min(474px, 100%)" }}
      value={inputValue}
      onChange={(e) =>
        setInputValue(e.target.value)
      } /* onChange updates the inputValue which passes 
      data to the onFilter prop using the useEffect hook*/
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
            onClick={
              () => setInputValue("") /* a button to clear the search bar */
            }
          >
            {
              inputValue && (
                <Clear />
              ) /* Condtional rendering for the search bar*/
            }
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Searchbar;
