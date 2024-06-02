import { typeFolder, typeStack } from "@/types";
import React from "react";
import { FaPlus } from "react-icons/fa";

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
      <div className="collapse-content flex flex-col gap-2">
        {node.children.map((child, index) => (
          <LibararyNode node={child} key={index} />
        ))}
        <button className="outline-offset-2 w-full ml-2 rounded shadow-sm p-2 hover:bg-base-300">
          <FaPlus size={23} />
        </button>
      </div>
    </div>
  ) : (
    <a
      href={`/library/stack?id=${node.data.id}`}
      className="text-xl outline-offset-2 w-full ml-2 rounded shadow-sm p-2 hover:bg-base-300"
    >
      {node.data.name}
    </a>
  );
}

export default LibararyNode;
