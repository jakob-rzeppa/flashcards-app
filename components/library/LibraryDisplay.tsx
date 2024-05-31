"use client";

import React from "react";
import { typeFolder, typeStack } from "@/types";
import LibararyNode from "./LibararyNode";

interface Props {
  stacks: typeStack[];
  folders: typeFolder[];
}

interface LibraryNode {
  type: "folder" | "stack" | null;
  data: typeFolder | typeStack | null;
  children: LibraryNode[];
}

function createTree(stacks: typeStack[], folders: typeFolder[]) {
  const folderMap = new Map<number | null, typeFolder[]>();

  folders.forEach((folder) => {
    if (!folderMap.get(folder.parent_folder))
      folderMap.set(folder.parent_folder, [folder]);
    else folderMap.get(folder.parent_folder)?.push(folder);
  });

  console.log(folderMap);

  const stackMap = new Map<number | null, typeStack[]>();

  stacks.forEach((stack) => {
    if (!stackMap.get(stack.parent_folder))
      stackMap.set(stack.parent_folder, [stack]);
    else stackMap.get(stack.parent_folder)?.push(stack);
  });

  const root: LibraryNode = { type: null, data: null, children: [] };

  addToTree(folderMap, stackMap, root);

  return root;
}

function addToTree(
  folders: Map<number | null, typeFolder[]>,
  stacks: Map<number | null, typeStack[]>,
  parentNode: LibraryNode
) {
  const nextFolders = folders.get(parentNode.data ? parentNode.data.id : null);
  const nextStacks = stacks.get(parentNode.data ? parentNode.data.id : null);

  if (nextFolders) {
    nextFolders.forEach((folder) => {
      parentNode.children.push({ type: "folder", data: folder, children: [] });
    });
    parentNode.children.forEach((child) => {
      addToTree(folders, stacks, child);
    });
  }

  if (nextStacks) {
    nextStacks.forEach((stack) => {
      parentNode.children.push({ type: "stack", data: stack, children: [] });
    });
  }
}

function LibraryDisplay({ stacks, folders }: Props) {
  const tree = createTree(stacks, folders);

  return (
    <div className="w-full">
      {tree.children.map((node) => (
        <LibararyNode node={node} />
      ))}
    </div>
  );
}

export default LibraryDisplay;
