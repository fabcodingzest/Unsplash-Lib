import React from "react";
import { useRouter } from "next/router";

function Search() {
  const { query } = useRouter().query;

  return <div>{query}</div>;
}

export default Search;
