import React from "react";

import Link from "next/link";

interface Props {
  href: string;
  imageUrl: string;
  title: string;
  description: string | null;
}

function Card({ href, imageUrl, title, description }: Props) {
  return (
    <Link href={href}>
      <div className="card card-compact w-60 bg-base-100 shadow-xl hover:bg-neutral">
        <figure className="h-28">
          <img src={imageUrl} alt="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
