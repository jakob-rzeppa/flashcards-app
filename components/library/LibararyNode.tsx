import { typeFolder, typeStack } from "@/types";
import React from "react";
import { FaFolderPlus } from "react-icons/fa";

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
        <button className="outline-offset-2 ml-2 m-2 w-full rounded shadow-sm p-2 hover:bg-base-300">
          <FaFolderPlus size={25} />
        </button>
      </div>
    </div>
  ) : (
    <div className="text-xl outline-offset-2 mr-4 m-2 w-full rounded shadow-sm p-2 hover:bg-base-300">
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
