import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  useInfiniteQuery,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Feed from "../components/Feed";
import { Box } from "@mui/material";
import { fetchCollectionImages } from "../utilities/apiFuctions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getNextPageNum } from "../utilities/helper";
import useScroll from "../hooks/useScroll";
import { collectionId } from "../utilities/api";

export default function Home() {
  const {
    data,
    status,
    isLoading,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["collection", collectionId],
    queryFn: ({ pageParam = 1 }) => fetchCollectionImages(pageParam),
    getNextPageParam: getNextPageNum,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
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
      {data.pages.map(
        (page) =>
          page.data.length > 0 && (
            <Feed photos={page.data} collectionId={collectionId} key={page.data[0].id} />
          )
      )}
      <Box ref={ref} pb={8}>
        {(isFetching || isFetchingNextPage) && <Loader />}
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  // this affects the performance a bit
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["collection", collectionId],
    queryFn: ({ pageParam = 1 }) => fetchCollectionImages(pageParam),
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
