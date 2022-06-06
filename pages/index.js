import { useEffect, useState } from "react";
import Head from "next/head";

const Home = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.unsplash.com/collections/1020971/photos/?client_id=cHzzaJY0gf0Ov0CZ0qR_II4g74CCNjsIVVYviiqrB8I"
    )
      .then((response) => {
        response.json().then((data) => setPhotos(data));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Head>
        <title>Unsplash</title>
        <meta name="description" content="Unplash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {photos.map(({ urls }) => (
        <img src={urls["regular"]} />
      ))}
    </>
  );
};

export default Home;
