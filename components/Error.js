import { Stack, Typography } from "@mui/material";

function Error({ error, searchResult }) {
  return (
    <Stack py={2} alignItems="center">
      <Typography fontSize="large">
        {error.message}
        {searchResult && (
          <Typography fontSize="large" component={"span"} fontWeight="bold">
            {`for ${decodeURI(query)}`}
          </Typography>
        )}
      </Typography>
    </Stack>
  );
}

export default Error;
