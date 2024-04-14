import React from "react";

import Card from "../Card";

interface Props {
  href: string;
  title: string;
  description: string | null;
  badgeText?: string;
}

function LibraryElement({ href, title, description, badgeText }: Props) {
  return (
    <Card href={href}>
      <h1 className="text-bold text-2xl">{title}</h1>
      {description && <p>{description}</p>}
      {badgeText && <div className="badge badge-primary">{badgeText}</div>}
    </Card>
  );
}

export default LibraryElement;
