import getPath from "@/actions/library/server/getPath";
import React from "react";

interface Props {
  element: "stack" | "folder" | "course" | "library";
  id?: number;
}

async function LibraryPath({ element, id }: Props) {
  const path = await getPath(element, id);

  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {path.map((node, index) => (
          <li key={index}>
            {node.href ? <a href={node.href}>{node.name}</a> : node.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LibraryPath;
