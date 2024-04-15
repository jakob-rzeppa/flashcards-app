import React, { ReactNode } from "react";

import Link from "next/link";

interface Props {
  href: string;
  children: ReactNode;
}

function Card({ href, children }: Props) {
  return (
    <a href={href} className="flex-grow">
      <div className="card card-compact min-w-min bg-neutral shadow-xl text-neutral-content hover:brightness-90">
        <div className="card-body">{children}</div>
      </div>
    </a>
  );
}

export default Card;
