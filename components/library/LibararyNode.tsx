import { typeFolder, typeStack } from "@/types";
import React from "react";

interface LibraryNode {
  type: "folder" | "stack" | null;
  data: typeFolder | typeStack | null;
  children: LibraryNode[];
}

interface Props {
  node: LibraryNode;
}

function LibararyNode({ node }: Props) {
  if (!node.data) return;

  return node.type === "folder" ? (
    <div tabIndex={0} className="collapse collapse-arrow">
      <input type="checkbox" />
      <div className="collapse-title text-2xl font-medium">
        {node.data?.name}
      </div>
      <div className="collapse-content">
        {node.children.map((child) => (
          <LibararyNode node={child} />
        ))}
      </div>
    </div>
  ) : (
    <div className="text-xl outline-offset-2 ml-4 m-2">
      <a
        href={`/library/stack?id=${node.data.id}`}
        className="text-xl font-normal"
      >
        {node.data.name}
      </a>
    </div>
  );
}

export default LibararyNode;
