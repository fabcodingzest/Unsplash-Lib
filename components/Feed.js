import { Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import Photo from "./Photo";

function Feed({ photos }) {
  return (
    <Grid
      container
      rowSpacing={{ xs: 1, sm: 2, md: 4 }}
      columnSpacing={{ xs: 1.4, sm: 2.4, md: 4.4 }}>
      {photos.map((data) => (
        <Grid item xs={4} key={data.id}>
          <Photo data={data} width={200} height={200} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Feed;
