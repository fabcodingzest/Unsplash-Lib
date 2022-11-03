import { Grid } from "@mui/material";
import Image from "next/image";
import React from "react";

function Feed({ photos }) {
  return (
    <Grid
      container
      py={10}
      rowSpacing={{ xs: 1, sm: 2, md: 4 }}
      columnSpacing={{ xs: 1.4, sm: 2.4, md: 4.4 }}>
      {photos.map(({ urls, id, alt_description }) => (
        <Grid item xs={4} key={id}>
          <Image
            height={500}
            width={500}
            objectFit="cover"
            src={urls.small} // Add fallback image or some check for render
            alt={alt_description}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Feed;
