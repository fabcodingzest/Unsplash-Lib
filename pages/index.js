import { useEffect, useState } from "react";
import Head from "next/head";

const Home = () => {
  const [phot, setPhot] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.unsplash.com/collections/1020971/photos/?client_id=cHzzaJY0gf0Ov0CZ0qR_II4g74CCNjsIVVYviiqrB8I"
    )
      .then((r) => {
        r.json().then((d) => setPhot(d));
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
      {phot.map(({ urls }) => (
        <img src={urls["regular"]} />
      ))}
    </>
  );
};

export default Home;
