import Image from "next/image";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box } from "@mui/system";

function Photo({ data, width, height }) {
  const { urls, alt_description, id, liked_by_user } = data;
  const [isLiked, setIsLiked] = useState(liked_by_user);
  const handleLikes = (e) => {
    e.stopPropagation();
    // send request to backend
    setIsLiked(!isLiked);
  };
  return (
      <Box position="relative">
        <a style={{ position: "relative" }}>
          <Image
            height={width}
            width={height}
            objectFit="cover"
            placeholder="blur"
            blurDataURL={data.blur_hash}
            priority={true}
            src={urls.small}
            alt={alt_description}
          />
        </a>
        <Box
          onClick={handleLikes}
          component="span"
          sx={{ position: "absolute", right: 4, bottom: 4, cursor: "pointer" }}>
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Box>
      </Box>
  );
}

export default Photo;
