import React, { ReactNode } from "react";

import Link from "next/link";

interface Props {
  href: string;
  imageUrl: string;
  children: ReactNode;
}

function Card({ href, imageUrl, children }: Props) {
  return (
    <Link href={href}>
      <div className="card card-compact w-60 bg-base-100 shadow-xl hover:bg-neutral">
        {imageUrl && (
          <figure className="h-28">
            <img src={imageUrl} alt="" />
          </figure>
        )}
        <div className="card-body">{children}</div>
      </div>
    </Link>
  );
}

export default Card;
