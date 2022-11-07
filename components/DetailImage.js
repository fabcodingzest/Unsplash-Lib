import { Box, Stack, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";
import Image from "next/image";
import React from "react";
import Like from "./Like";

function DetailImage({ data }) {
  const { urls, alt_description, user, id, liked_by_user } = data;
  return (
    <Stack p={2} my={2} bgcolor={indigo[200]} borderRadius={2}>
      <Stack justifyContent="center" bgcolor="black">
        <Image
          src={urls.regular}
          alt={alt_description}
          width="500"
          height="500"
          objectFit="contain"
        />
      </Stack>
      <Stack direction="row" alignItems="center" position="relative" pt={2}>
        <Typography fontSize="small" fontWeight="bold">
          Author: @{`${user.first_name} ${user.last_name}`}
        </Typography>
        <Like id={id} likedByUser={liked_by_user} position={{ right: 4 }} />
      </Stack>
    </Stack>
  );
}

export default DetailImage;
