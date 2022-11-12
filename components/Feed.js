import { Grid } from "@mui/material";
import Link from "next/link";
import React from "react";
import FeedImage from "./FeedImage";

const FeedItem = ({ data }) => {
  const { id } = data;
  return (
    <Link href={`/detail/${id}`} style={{ cursor: "pointer" }} passHref>
      <Grid item xs={4}>
        <FeedImage data={data} width={200} height={200} />
      </Grid>
    </Link>
  );
};

const Feed = ({ photos, collectionId }) => {
  return (
    <Grid
      container
      pt={0.8}
      rowSpacing={{ xs: 0, sm: 1 }}
      columnSpacing={{ xs: 0.8, sm: 1.6 }}>
      {photos?.map((data) => (
        <FeedItem key={data.id} data={{ ...data, collectionId }} />
      ))}
    </Grid>
  );
};

export default Feed;
