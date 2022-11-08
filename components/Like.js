import { Alert, Box, Snackbar, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeImg, unlikeImg } from "../utilities/apiFuctions";
import { Router } from "@mui/icons-material";
import { collectionId } from "../utilities/api";
import { useRouter } from "next/router";

const changeCollectionData = (oldData, id) => {
  console.log(oldData);
  const newData = oldData.pages.map((page) => {
    return page.data.map((info) => {
      console.log(info.id === id && info.id + " " + id);
      if (info.id === id) {
        console.log(info);
        return { ...info, liked_by_user: !info.liked_by_user };
      }
      return info;
    });
  });
  console.log(newData);
  return { ...oldData, pages: newData };
};

const changeDetailData = (oldData) => ({
  ...oldData,
  liked_by_user: !oldData.liked_by_user,
});

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
    onMutate: async (id) => {
      queryClient.cancelQueries(["detail", "collection", "search"]);
      setIsLiked(!isLiked);
      if (pathname === "/") {
        const key = ["collection", collectionId || null];
        const prevHomeCollection = queryClient.getQueryData(key);
        await queryClient.setQueryData(key, (oldData) => {
          console.log(oldData);
          changeCollectionData(oldData, id);
        });
        return { prevHomeCollection, key };
      } else if (pathname === "/detail/[id]") {
        const detailKey = ["detail", router.query.id];
        const prevDetails = queryClient.getQueryData({ queryKey: detailKey });
        if (id === router.query.id) {
          console.log(prevDetails);
          await queryClient.setQueryData(detailKey, changeDetailData);
          return { prevDetails, key: detailKey };
        } else {
          const collId = prevDetails?.related_collections.results[0].id;
          const collKey = ["collection", collId];
          const prevCollData = queryClient.getQueryData({ queryKey: collKey });
          await queryClient.setQueryData(collKey, (oldData) => {
            changeCollectionData(oldData, id);
          });
          return { prevCollData, key: collKey };
        }
      } else if (pathname === "/search/[query]") {
        const key = ["search", router.query.query];
        const prevSearchedData = queryClient.getQueryData(key);
        await queryClient.setQuerieData(key, (oldData) =>
          changeCollectionData(oldData, id)
        );
        return { prevSearchedData, key };
      }
    },
    onError: (error, _s, context) => {
      const {
        prevDetails,
        prevCollData,
        prevHomeCollection,
        prevSearchedData,
        key,
      } = context;
      prevDetails && queryClient.setQueryData(key, prevDetails);
      prevCollData && queryClient.setQueryData(key, prevCollData);
      prevHomeCollection && queryClient.setQueryData(key, prevHomeCollection);
      prevSearchedData && queryClient.setQueryData(key, prevSearchedData);
      setIsLiked(!isLiked);
      return error;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["collection"],
      });
    },
  });
  const handleLikes = (e) => {
    e.stopPropagation();
    // send request to backend
    mutate(id, collectionId);
  };
  if (error) {
    <Snackbar autoHideDuration={5000}>
      <Alert severity="error" sx={{ width: "100%" }}>
        This is a success message!
      </Alert>
    </Snackbar>;
  }
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
