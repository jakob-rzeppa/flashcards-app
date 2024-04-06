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
      <div className="w-4/5 mx-auto flex flex-wrap justify-between items-center gap-4">
        {data ? (
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
          <div>No Courses</div>
        )}
      </div>
    </div>
  );
}

export default LibraryList;
