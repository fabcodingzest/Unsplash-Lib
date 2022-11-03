import Image from "next/image";
import Link from "next/link";
import React from "react";

function Photo({ data }) {
  const { urls, alt_description, id } = data;
  return (
    <Link href={`/detail/${id}`} style={{ cursor: "pointer" }}>
      <a>
        <Image
          height={500}
          width={500}
          objectFit="cover"
          src={urls.small} // Add fallback image or some check for render
          alt={alt_description}
        />
      </a>
    </Link>
  );
}

export default Photo;
