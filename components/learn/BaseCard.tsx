import React from "react";

interface Props {
  content: string;
}

function BaseCard({ content }: Props) {
  // TODO edit the card button

  return (
    <div className="card bg-neutral w-full h-full">
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
        {content}
      </p>
    </div>
  );
}

export default BaseCard;
