import React from "react";
import { useRouter } from "next/router";
import { Container } from "@mui/material";

function Detail() {
  const { id } = useRouter().query;
  return <Container maxWidth="sm">detail -{id}</Container>;
}

// export

export default Detail;
