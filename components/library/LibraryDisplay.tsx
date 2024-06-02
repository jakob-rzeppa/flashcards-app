"use client";

import React, { useRef, useState } from "react";
import { typeFolder, typeStack } from "@/types";
import LibararyNode from "./LibararyNode";
import { FaFolderPlus, FaPlus } from "react-icons/fa";
import createFolder from "@/actions/library/client/createFolder";
import createStack from "@/actions/library/client/createStack";

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

  const newElementModal = useRef<HTMLDialogElement>(null);
  const [elementToChange, setElementToChange] = useState<"folder" | "stack">(
    "folder"
  );
  const [newElementName, setNewElementName] = useState("");

  const onNewElement = (type: "folder" | "stack") => {
    setElementToChange(type);

    newElementModal.current!.showModal();
  };

  const createNewElement = () => {
    if (elementToChange === "folder") createFolder(newElementName);
    else if (elementToChange === "stack") createStack(newElementName, "");

    setElementToChange("folder");
    setNewElementName("");
  };

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        {tree.children.map((node, index) => (
          <LibararyNode node={node} key={index} onNewElement={onNewElement} />
        ))}
        <div className="outline-offset-2 ml-2 w-full flex flex-row flex-wrap gap-2">
          <button
            className="flex-1 rounded shadow-sm p-2 hover:bg-base-300"
            onClick={() => onNewElement("folder")}
          >
            <FaFolderPlus size={23} />
          </button>
          <button
            className="flex-1 rounded shadow-sm p-2 hover:bg-base-300"
            onClick={() => onNewElement("stack")}
          >
            <FaPlus size={23} />
          </button>
        </div>
      </div>
      <dialog className="modal" id="newElementModal" ref={newElementModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">create new {elementToChange}</h3>
          <input
            type="text"
            className="input input-primary w-full my-4"
            value={newElementName}
            onChange={(e) => setNewElementName(e.target.value)}
          />
          <form method="dialog" className="w-full">
            <button
              className="btn btn-primary w-full"
              onClick={createNewElement}
            >
              save
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default LibraryDisplay;
