import { Box, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";

function Like({ id, likedByUser, position }) {
  const [isLiked, setIsLiked] = useState(likedByUser);
  const handleLikes = (e) => {
    e.stopPropagation();
    // send request to backend
    setIsLiked(!isLiked);
  };
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      borderRadius={"50%"}
      width={39}
      height={39}
      bgcolor="white"
      onClick={handleLikes}
      component="span"
      sx={{ position: "absolute", cursor: "pointer", ...position }}>
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </Stack>
  );
}

export default Like;
