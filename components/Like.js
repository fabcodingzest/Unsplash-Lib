import { Alert, Box, Snackbar, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeImg, unlikeImg } from "../utilities/apiFuctions";
import { collectionId } from "../utilities/api";
import { useRouter } from "next/router";

function Like({ id, likedByUser, position }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = router.pathname;

  const [isLiked, setIsLiked] = useState(likedByUser);
  const { error, mutate } = useMutation({
    mutationFn: (id) => {
      console.log(id);
      !isLiked ? likeImg(id) : unlikeImg(id);
    },
    onMutate: async () => {
      queryClient.cancelQueries(["detail", "collection", "search"]);
      setIsLiked(!isLiked);
    },
    onError: (error) => {
      setIsLiked(!isLiked);
      return error;
    },
    onSettled: () => {
      pathname === "/search/[query]" &&
        queryClient.refetchQueries({
          queryKey: ["search", router.query.query],
        });
      pathname === "/detail/[id]" &&
        queryClient.refetchQueries({
          queryKey: ["detail", router.query.id],
        });
      pathname === "/" &&
        queryClient.refetchQueries({
          queryKey: ["collection", collectionId],
        });
    },
  });
  const handleLikes = (e) => {
    e.stopPropagation();
    // send request to backend
    mutate(id, collectionId);
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
      {error && (
        <Snackbar open={error} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {error.message || error}
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
}

export default Like;
