import React from "react";
import { useInView } from "react-intersection-observer";

import {
  useInfiniteQuery,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Feed from "../components/Feed";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { fetchCollectionImages } from "../utilities/apiFuctions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getNextPageNum } from "../utilities/helper";

export default function Home() {
  const { ref, inView } = useInView();

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
    queryKey: ["collection"],
    queryFn: fetchCollectionImages,
    getNextPageParam: getNextPageNum,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
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
      {data.pages.map(
        (page) =>
          page.data.length > 0 && (
            <Feed photos={page.data} key={page.data[0].id} />
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

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["collection"],
    queryFn: fetchCollectionImages,
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
