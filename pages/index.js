import { useEffect, useState } from "react";
import Head from "next/head";
import { Container } from "@mui/material";
import Feed from "./components/Feed";
import throttle from "lodash.throttle";

// Refactor
const fetchImages = async (page) => {
  const url = `${process.env.NEXT_PUBLIC_UNSPLASH_URL}/collections/${process.env.NEXT_PUBLIC_UNSPLASH_COLLECTION_ID}/photos/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID}&page=${page}&per_page=13`;
  const response = await fetch(url);
  return response.json();
};

const Home = ({ initialPhotos }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState(initialPhotos);
  const [page, setPage] = useState(1);
  const [canFetch, setCanFetch] = useState(true);

  useEffect(() => {
    updateImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const updateImages = async () => {
    setLoading(true);
    try {
      if (canFetch && page > 1) {
        const data = await fetchImages(page);
        if (data.length === 0) {
          setCanFetch(false);
          return;
        } else if (data.length > 0) {
          setCanFetch(true);
        }
        setPhotos((oldData) => {
          return [...oldData, ...data];
        });
        setLoading(false);
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
    <Container maxWidth="sm">
      <Head>
        <title>Swanky Feed</title>
        <meta name="description" content="Swanky Feed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feed photos={photos} />
    </Container>
  );
};

export async function getStaticProps() {
  const data = await fetchImages(1);
  return {
    props: { initialPhotos: data },
  };
}

export default Home;
