"use client";

import { typeFolder, typeStack } from "@/types";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import Folder from "./Folder";
import NewStackModal, { NewStackModalData } from "./modals/NewStackModal";
import NewFolderModal, { NewFolderModalData } from "./modals/NewFolderModal";
import Stack from "./Stack";
import RenameModal, { RenameData } from "./modals/RenameModal";
import DeleteModal, { DeleteData } from "./modals/DeleteModal";
import MoveModal, { MoveData } from "./modals/MoveModal";

interface Props {
  stacks: typeStack[];
  folders: typeFolder[];
}

function LibraryDisplay({ stacks, folders }: Props) {
  const [parentFolderId, setParentFolderId] = useState<null | number>(null);

  // Modals
  const [newStackModal, setNewStackModal] = useState<NewStackModalData>(null);
  const [newFolderModal, setNewFolderModal] =
    useState<NewFolderModalData>(null);
  const [renameModal, setRenameModal] = useState<RenameData>(null);
  const [deleteModal, setDeleteModal] = useState<DeleteData>(null);
  const [moveModal, setMoveModal] = useState<MoveData>(null);

  const onBack = () => {
    const parentFolder = folders.find((folder) => folder.id === parentFolderId);

    setParentFolderId(parentFolder ? parentFolder.parent_folder : null);
  };

  return (
    <>
      <button className="btn btn-circle btn-primary" onClick={onBack}>
        <FaArrowLeft />
      </button>
      <table className="table table-zebra table-lg">
        <thead>
          <tr className="text-2xl">
            <th>type</th>
            <th>name</th>
            <th>num of cards</th>
            <th>
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-circle btn-ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <BsThreeDotsVertical className="text-2xl" />
                </div>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewFolderModal({ parentFolderId: parentFolderId });
                      }}
                    >
                      New Folder
                    </button>
                  </li>
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      setNewStackModal({ parentFolderId: parentFolderId });
                    }}
                  >
                    <button>New Stack</button>
                  </li>
                </ul>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {folders.map(
            (folder) =>
              folder.parent_folder === parentFolderId && (
                <Folder
                  key={folder.id}
                  folder={folder}
                  setParentFolderId={setParentFolderId}
                  onRename={() =>
                    setRenameModal({
                      id: folder.id,
                      prevName: folder.name,
                      type: "folder",
                    })
                  }
                  onDelete={() =>
                    setDeleteModal({ id: folder.id, type: "folder" })
                  }
                  onMove={() =>
                    setMoveModal({
                      id: folder.id,
                      type: "folder",
                      parentFolderId: folder.parent_folder,
                    })
                  }
                />
              )
          )}
          {stacks.map(
            (stack) =>
              stack.parent_folder === parentFolderId && (
                <Stack
                  key={stack.id}
                  stack={stack}
                  onRename={() =>
                    setRenameModal({
                      id: stack.id,
                      prevName: stack.name,
                      type: "stack",
                    })
                  }
                  onDelete={() =>
                    setDeleteModal({ id: stack.id, type: "stack" })
                  }
                  onMove={() =>
                    setMoveModal({
                      id: stack.id,
                      type: "stack",
                      parentFolderId: stack.parent_folder,
                    })
                  }
                />
              )
          )}
        </tbody>
      </table>
      <NewStackModal data={newStackModal} setData={setNewStackModal} />
      <NewFolderModal data={newFolderModal} setData={setNewFolderModal} />
      <RenameModal data={renameModal} setData={setRenameModal} />
      <DeleteModal data={deleteModal} setData={setDeleteModal} />
      <MoveModal data={moveModal} setData={setMoveModal} folders={folders} />
    </>
  );
}

export default LibraryDisplay;
