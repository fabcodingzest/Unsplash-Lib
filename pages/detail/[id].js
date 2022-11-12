import React from "react";
import { useRouter } from "next/router";
import { Box, Container } from "@mui/material";
import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import {
  fetchCollectionImages,
  fetchImageDetails,
} from "../../utilities/apiFuctions";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import DetailImage from "../../components/DetailImage";
import {
  getNextPageNum,
  getRelatedCollectionData,
} from "../../utilities/helper";
import useScroll from "../../hooks/useScroll";

const Detail = () => {
  const { id } = useRouter().query;
  const {
    data: detailData,
    status: detailStatus,
    error: detailError,
    isLoading: detailIsLoading,
  } = useQuery({
    queryKey: ["detail", id],
    queryFn: () => fetchImageDetails(id),
    refetchOnWindowFocus: false,
  });

  const { haveRelatedCollections, firstCollectionId } =
    getRelatedCollectionData(detailData);

  const {
    data: collectionData,
    error: collectionError,
    isLoading: collectionIsLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["collection", firstCollectionId],
    queryFn: ({ pageParam = 1 }) =>
      fetchCollectionImages(pageParam, firstCollectionId),
    getNextPageParam: getNextPageNum,
    enabled: !!haveRelatedCollections,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const ref = useScroll(fetchNextPage, hasNextPage);

  if (detailIsLoading) {
    return <Loader />;
  }
  if (collectionError || detailError) {
    return <Error error={detailError || collectionError} />;
  }

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh" }}>
      <DetailImage data={detailData} type="detail" />
      {collectionData.pages.map((page) => {
        return page.data
          .filter((img) => {
            const firstImgId = page.data[0].id;
            const sameCollection = firstImgId === img.id;
            return !sameCollection;
          })
          .map((img) => {
            return (
              <DetailImage
                data={img}
                key={img.id}
                type="collection"
                collectionId={firstCollectionId}
              />
            );
          });
      })}
      <Box ref={ref} pb={8}>
        {(collectionIsLoading || isFetching || isFetchingNextPage) && (
          <Loader />
        )}
      </Box>
    </Container>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(context) {
  const id = context.params?.id;
  const queryClient = new QueryClient();

  try {
    const imageDetails = await queryClient.fetchQuery({
      queryKey: ["detail", id],
      queryFn: () => fetchImageDetails(id),
    });
    const { haveRelatedCollections, firstCollectionId } =
      getRelatedCollectionData(imageDetails);

    if (haveRelatedCollections) {
      await queryClient.prefetchInfiniteQuery({
        queryKey: ["collection", firstCollectionId],
        queryFn: ({ pageParam }) =>
          fetchCollectionImages(pageParam, firstCollectionId),
      });
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default Detail;
