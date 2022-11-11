import Image from "next/image";
import React, { useState } from "react";
import { Box } from "@mui/system";
import Like from "./Like";

const FeedImage = ({ data, width, height }) => {
  const { urls, alt_description, id, liked_by_user, blur_hash } = data;

  return (
    <Box position="relative" sx={{ cursor: "pointer" }}>
      <Image
        height={height}
        width={width}
        objectFit="cover"
        priority={true}
        src={urls.small}
        alt={alt_description}
        // Blur hash improves the performance but learn how to convert strings to base64 and then use them.
        placeholder="blur"
        blurDataURL={blur_hash}
      />
      <Like
        id={id}
        likedByUser={liked_by_user}
        position={{ right: 8, bottom: 16 }}
      />
    </Box>
  );
};

export default FeedImage;
