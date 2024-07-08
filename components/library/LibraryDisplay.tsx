"use client";

import { typeFolder, typeStack } from "@/types";
import React, { useMemo, useState } from "react";
import Folder from "./Folder";
import NewStackModal, { NewStackModalData } from "./modals/NewStackModal";
import NewFolderModal, { NewFolderModalData } from "./modals/NewFolderModal";
import Stack from "./Stack";
import RenameModal, { RenameData } from "./modals/RenameModal";
import DeleteModal, { DeleteData } from "./modals/DeleteModal";
import MoveModal, { MoveData } from "./modals/MoveModal";
import Table from "../ui/Table";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  stacks: typeStack[];
  folders: typeFolder[];
  path: string[];
  userId: string | undefined;
}

function LibraryDisplay({ stacks, folders, path, userId }: Props) {
  const router = useRouter();

  const urlSearchParams = userId ? "?user=" + userId : "";

  // Modals
  const [newStackModal, setNewStackModal] = useState<NewStackModalData>(null);
  const [newFolderModal, setNewFolderModal] =
    useState<NewFolderModalData>(null);
  const [renameModal, setRenameModal] = useState<RenameData>(null);
  const [deleteModal, setDeleteModal] = useState<DeleteData>(null);
  const [moveModal, setMoveModal] = useState<MoveData>(null);

  const prevFolderIds = useMemo<number[]>(() => {
    if (!path) return [];
    return path.map((id) => Number(id));
  }, [path]);

  const onSelectFolder = (folderId: number) => {
    //TODO: make faster (use Link)
    let p = "/library/";
    if (path)
      path.map((e) => {
        p += e + "/";
      });
    p += folderId;

    p += urlSearchParams;

    router.push(p);
  };

  return (
    <>
      <div className="breadcrumbs text-sm w-4/5 mx-auto">
        <ul>
          <li>
            <Link href={"/library" + urlSearchParams}>/</Link>
          </li>
          {prevFolderIds.map((folderId, index) => {
            let folderPath = "/library/";
            for (let i = 0; i <= index; i++) {
              folderPath += "/" + prevFolderIds[i];
            }
            folderPath += urlSearchParams;
            return (
              <li key={folderId}>
                <Link href={folderPath}>
                  {folders.find((folder) => folder.id === folderId)?.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Table>
        <tbody>
          {folders.map(
            (folder) =>
              folder.parent_folder ===
                (prevFolderIds.length >= 1
                  ? prevFolderIds[prevFolderIds.length - 1]
                  : null) && (
                <Folder
                  key={folder.id}
                  folder={folder}
                  onSelect={onSelectFolder}
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
              stack.parent_folder ===
                (prevFolderIds.length >= 1
                  ? prevFolderIds[prevFolderIds.length - 1]
                  : null) && (
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
      </Table>

      <NewStackModal data={newStackModal} setData={setNewStackModal} />
      <NewFolderModal data={newFolderModal} setData={setNewFolderModal} />
      <RenameModal data={renameModal} setData={setRenameModal} />
      <DeleteModal data={deleteModal} setData={setDeleteModal} />
      <MoveModal data={moveModal} setData={setMoveModal} folders={folders} />
    </>
  );
}

export default LibraryDisplay;

/*
<thead>
            <tr className="text-2xl">
              <th>type</th>
              <th>name</th>
              {!isMobile && <th>num of cards</th>}
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
*/
