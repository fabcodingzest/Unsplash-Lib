import React from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Feed from "../../components/Feed";

const PER_PAGE = 15;

const fetchImages = async (pageParam, query) => {
  try {
    console.log(pageParam);
    const url = `${process.env.NEXT_PUBLIC_UNSPLASH_URL}/search/photos/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID}&query=${query}&page=${pageParam}&per_page=${PER_PAGE}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.results.length === 0) {
      throw new Error("No Images Found");
    }
    return { data: data.results, total_pages: data.total_pages };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

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
    queryFn: ({ pageParam = 1 }) => fetchImages(pageParam, query),
    getNextPageParam: (lastPage, pages) => {
      const totalPages = lastPage.total_pages;
      const nextPage = pages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (inView && hasNextPage) {
      // setTimeout(() => , 3000);
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Box>
      {status === "loading" ? (
        <Stack py={8} alignItems="center">
          <CircularProgress />
        </Stack>
      ) : status === "error" ? (
        <Stack py={2} alignItems="center">
          <Typography fontSize="large">
            {error.message} for{" "}
            <Typography fontSize="large" component={"span"} fontWeight="bold">
              `{decodeURI(query)}`
            </Typography>
          </Typography>
        </Stack>
      ) : (
        <Box>
          {data.pages.map((page) => {
            console.log(page);
            return <Feed photos={page.data} key={page.data[0].id} />;
          })}
          <Box ref={ref} pb={8}>
            {(isFetching || isFetchingNextPage) && (
              <Stack py={8} alignItems="center">
                <CircularProgress />
              </Stack>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Search;
