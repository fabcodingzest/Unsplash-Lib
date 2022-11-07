import { Box, Stack, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (value !== "") {
      router.push(`/search/${encodeURI(value)}`);
    }
  };
  return (
    <Stack width={{ xs: "60%", md: "70%" }} maxWidth="16rem">
      <form onSubmit={handleSearch}>
        <TextField
          margin="none"
          placeholder="Search for pics..."
          size="small"
          fontSize="2px"
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          inputProps={{ sx: { p: { xs: 0.6, sm: 1 } } }}
          InputLabelProps={{
            sx: { fontSize: { xs: "0.8rem", sm: "1rem" } },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ mr: { xs: -1.5, sm: -1 } }}>
                <IconButton type="submit" size="small">
                  <SearchIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Stack>
  );
}

export default SearchBar;
