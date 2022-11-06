import { Grid } from "@mui/material";
import Link from "next/link";
import React from "react";
import Photo from "./Photo";

const FeedItem = ({ data }) => {
  const { id } = data;
  return (
    <Link href={`/detail/${id}`} style={{ cursor: "pointer" }} passHref>
      <Grid item xs={4}>
        <Photo data={data} width={200} height={200} />
      </Grid>
    </Link>
  );
};

const Feed = ({ photos }) => {
  console.log(photos);
  return (
    <Grid
      container
      rowSpacing={{ xs: 0, sm: 1 }}
      columnSpacing={{ xs: 0.8, sm: 1.6 }}>
      {photos[0].map((data) => (
        <FeedItem key={data.id} data={data} />
      ))}
    </Grid>
  );
};

export default Feed;
