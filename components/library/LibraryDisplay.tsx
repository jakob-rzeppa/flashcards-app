"use client";

import React from "react";
import { typeFolder, typeStack } from "@/types";

interface Props {
  stacks: typeStack[];
  folders: typeFolder[];
}

/*<div className="grid grid-cols-3 gap-2 p-4">
        {stacks.map((stack, index) => (
          <a
            key={index}
            className="btn flex flex-col p-2 h-full"
            href={`/library/stack?id=${stack.id}`}
          >
            <div>{stack.name}</div>
          </a>
        ))}
      </div>*/

function LibraryDisplay({ stacks, folders }: Props) {
  const folderMap = new Map<number | null, typeFolder[]>();

  folders.forEach((folder) => {
    if (!folderMap.get(folder.parent_folder))
      folderMap.set(folder.parent_folder, [folder]);
    else folderMap.get(folder.parent_folder)?.push(folder);
  });

  return (
    <div className="w-full">
      {folderMap.get(null)?.map(
        (folder) =>
          folder.parent_folder === null && (
            <div tabIndex={0} className="collapse">
              <div className="collapse-title text-2xl font-medium">
                {folder.name}
              </div>
              <div className="collapse-content">{}</div>
            </div>
          )
      )}
    </div>
  );
}

export default LibraryDisplay;
