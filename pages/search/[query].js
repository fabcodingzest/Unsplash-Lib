import React from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Feed from "../../components/Feed";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { getNextPageNum } from "../../utilities/helper";
import { fetchSearchImages } from "../../utilities/apiFuctions";
import useScroll from "../../hooks/useScroll";

function Search() {
  const { query } = useRouter().query;

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

  const ref = useScroll(fetchNextPage, hasNextPage);

  if (status === "loading" || isLoading) {
    return <Loader />;
  }

  if (status === "error" || error) {
    return <Error error={error} />;
  }

  return (
    <Box>
      {data.pages.map((page) => {
        return <Feed photos={page?.data} key={page?.data?.id} />;
      })}
      <Box ref={ref} pb={8}>
        {(isFetching || isFetchingNextPage) && <Loader />}
      </Box>
    </Box>
  );
}

export default Search;
