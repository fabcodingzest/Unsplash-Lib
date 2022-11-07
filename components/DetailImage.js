import { Box, Stack, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";
import Image from "next/image";
import React from "react";
import Like from "./Like";

function DetailImage({ data }) {
  const { urls, alt_description, user, id, liked_by_user } = data;
  return (
    <Stack>
      <Typography fontSize="small" fontWeight="bold">
        Author: @{`${user.first_name} ${user.last_name}`}
      </Typography>
      <Stack
        justifyContent="center"
        sx={{
          backgroundColor: indigo[200],
          borderRadius: 5,
          position: "relative",
        }}>
        <Image
          src={urls.regular}
          alt={alt_description}
          width="500"
          height="500"
          objectFit="contain"
        />
        <Like
          id={id}
          likedByUser={liked_by_user}
          position={{ right: 12, bottom: 8 }}
        />
      </Stack>
    </Stack>
  );
}

export default DetailImage;
