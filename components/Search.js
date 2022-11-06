import { Box, Stack, TextField } from "@mui/material";
import React from "react";

function Search() {
  return (
    <Stack width={{ xs: "60%", md: "70%" }} maxWidth="16rem">
      <TextField
        label="Search for pics..."
        margin="none"
        size="small"
        fontSize="2px"
        inputProps={{ sx: { p: { xs: 0.6, sm: 1 } } }}
        InputLabelProps={{ sx: { fontSize: { xs: "0.8rem", sm: "1rem" } } }}
      />
    </Stack>
  );
}

export default Search;
