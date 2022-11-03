import { useEffect, useState } from "react";
import Head from "next/head";
import { Container } from "@mui/material";
import Feed from "../components/Feed";
import throttle from "lodash.throttle";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [canFetch, setCanFetch] = useState(true);

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchImages = async () => {
    setLoading(true);
    const urlPage = `&page=${page}`;
    const url = `${process.env.NEXT_PUBLIC_UNSPLASH_URL}/collections/${process.env.NEXT_PUBLIC_UNSPLASH_COLLECTION_ID}/photos/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID}${urlPage}`;
    try {
      if (canFetch) {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length === 0) {
          setCanFetch(false);
          return;
        } else if (data.length > 0) {
          setCanFetch(true);
        }
        setPhotos((oldData) => {
          if (page === 1) {
            return data;
          } else {
            return [...oldData, ...data];
          }
          setLoading(false);
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleScroll = () => {
    if (
      !loading &&
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 17
    ) {
      setPage((oldPage) => {
        return oldPage + 1;
      });
    }
  };

  useEffect(() => {
    const event = window.addEventListener(
      "scroll",
      throttle(handleScroll, 500)
    );
    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Head>
        <title>Unsplash</title>
        <meta name="description" content="Unplash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feed photos={photos} />
    </Container>
  );
};

export default Home;
