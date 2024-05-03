import React from "react";

interface Props {
  href: string;
  title: string;
  description: string | null;
  badgeText?: string;
}

function LibraryElement({ href, title, description, badgeText }: Props) {
  return (
    <a href={href} className="flex-grow h-full min-w-max flex-1">
      <div className="card card-compact min-w-min bg-neutral shadow-xl text-neutral-content hover:brightness-90 h-full">
        <div className="card-body">
          <h1 className="text-bold text-2xl">{title}</h1>
          {description && <p>{description}</p>}
          {badgeText && <div className="badge badge-primary">{badgeText}</div>}
        </div>
      </div>
    </a>
  );
}

export default LibraryElement;
