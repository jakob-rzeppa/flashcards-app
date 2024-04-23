import React from "react";

import LibraryElement from "./LibraryElement";

interface Props {
  data?: {
    href: string;
    name: string;
    description: string | null;
    badgeText: string;
  }[];
}

function LibraryList({ data }: Props) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between items-center gap-4">
        {data && data?.length >= 1 ? (
          data.map((element, index) => (
            <div className="min-w-max flex-1" key={index}>
              <LibraryElement
                href={element.href}
                title={element.name}
                description={element.description}
                badgeText={element.badgeText}
              />
            </div>
          ))
        ) : (
          <div className="text-center w-full text-3xl">No Elements</div>
        )}
      </div>
    </div>
  );
}

export default LibraryList;
