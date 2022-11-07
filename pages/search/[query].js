import React from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Feed from "../../components/Feed";
import { fetchSearchImages, getNextPageNum } from "../../utilities/helpers";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

function Search() {
  const { query } = useRouter().query;

  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam = 1 }) => fetchSearchImages(pageParam, query),
    getNextPageParam: getNextPageNum,
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (status === "loading" || isLoading) {
    return <Loader />;
  }

  if (status === "error" || error) {
    return <Error error={error} />;
  }

  return (
    <Box>
      {data.pages.map((page) => {
        console.log(page);
        return <Feed photos={page.data} key={page.data[0].id} />;
      })}
      <Box ref={ref} pb={8}>
        {(isFetching || isFetchingNextPage) && <Loader />}
      </Box>
    </Box>
  );
}

export default Search;
