import React, { ReactNode } from "react";

import Link from "next/link";

interface Props {
  href: string;
  children: ReactNode;
}

function Card({ href, children }: Props) {
  return (
    <Link href={href} className="flex-grow">
      <div className="card card-compact min-w-min bg-base-100 shadow-xl hover:bg-neutral">
        <div className="card-body">{children}</div>
      </div>
    </Link>
  );
}

export default Card;
