import Image from "next/image";
import Link from "next/link";
import React from "react";
const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};
function Photo({ data }) {
  const { urls, alt_description, id } = data;
  return (
    <Link href={`/detail/${id}`} style={{ cursor: "pointer" }}>
      <a>
        <Image
          height={500}
          width={500}
          objectFit="cover"
          placeholder="blur"
          blurDataURL="https://via.placeholder.com/150"
          src={urls.small} // Add fallback image or some check for render
          alt={alt_description}
        />
      </a>
    </Link>
  );
}

export default Photo;
