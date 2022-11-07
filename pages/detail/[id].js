import React from "react";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import {
  fetchCollectionImages,
  fetchImageDetails,
} from "../../utilities/apiFuctions";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import DetailImage from "../../components/DetailImage";
import { getRelatedCollectionData } from "../../utilities/helper";

const Detail = () => {
  const { id } = useRouter().query;
  const { data, status, error, isLoading } = useQuery({
    queryKey: ["detail", id],
    queryFn: () => fetchImageDetails(id),
    refetchOnWindowFocus: false,
  });

  console.log(isLoading);
  if (isLoading) {
    return <Loader />;
  }

  if (status === "error" || error) {
    return <Error error={error} />;
  }

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh" }}>
      {status === "success" && <DetailImage data={data} />}
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

  const imageDetails = await queryClient.fetchQuery({
    queryKey: ["detail", id],
    queryFn: () => fetchImageDetails(id),
  });

  const { haveRelatedCollections, firstCollectionId } =
    getRelatedCollectionData(imageDetails);

  if (haveRelatedCollections) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["collection", firstCollectionId],
      queryFn: fetchCollectionImages,
    });
  }
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default Detail;
