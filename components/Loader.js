import { CircularProgress, Stack } from "@mui/material";

function Loader() {
  return (
    <Stack py={8} alignItems="center">
      <CircularProgress />
    </Stack>
  );
}

export default Loader;
