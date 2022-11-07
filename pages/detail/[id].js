import React from "react";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchImageDetails } from "../../utilities/apiFuctions";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import DetailImage from "../../components/DetailImage";

function Detail() {
  const { id } = useRouter().query;
  const { data, status, error, isLoading } = useQuery({
    queryKey: ["detail", id],
    queryFn: () => fetchImageDetails(id),
  });
  console.log(data);

  if (status === "loading" || isLoading) {
    return <Loader />;
  }

  if (status === "error" || error) {
    return <Error error={error} />;
  }
  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh" }}>
      <DetailImage data={data} />
    </Container>
  );
}

export default Detail;
