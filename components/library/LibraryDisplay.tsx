"use client";

import React, { useState } from "react";
import { typeFolder, typeStack } from "@/types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowLeft, FaFolder, FaStackOverflow } from "react-icons/fa";
import { useRouter } from "next/navigation";
import NewLibraryElements from "./NewLibraryElements";

interface Props {
  stacks: typeStack[];
  folders: typeFolder[];
}

function LibraryDisplay({ stacks, folders }: Props) {
  const router = useRouter();

  const [parentFolderId, setParentFolderId] = useState<null | number>(null);

  const onClick = (type: "folder" | "stack", id: number) => {
    if (type === "folder") {
      setParentFolderId(id);
    } else if (type === "stack") {
      router.push("/library/stack?id=" + id);
    }
  };

  const onBack = () => {
    const parentFolder = folders.find((folder) => folder.id === parentFolderId);

    setParentFolderId(parentFolder ? parentFolder.parent_folder : null);
  };

  return (
    <>
      <div>
        <button className="btn btn-circle btn-primary" onClick={onBack}>
          <FaArrowLeft />
        </button>
        <button className="btn btn-outline">Type</button>
        <button className="btn btn-outline">Order</button>
      </div>
      <table className="table table-zebra table-lg">
        <thead>
          <tr className="text-2xl">
            <th>type</th>
            <th>name</th>
            <th>created at</th>
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
                <NewLibraryElements parentFolderId={parentFolderId} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {folders.map(
            (folder) =>
              folder.parent_folder === parentFolderId && (
                <tr
                  key={folder.id}
                  className="hover cursor-pointer"
                  onClick={() => onClick("folder", folder.id)}
                >
                  <td className="text-lg">
                    <FaFolder />
                  </td>
                  <td className="text-lg">{folder.name}</td>
                  <td className="text-lg">{folder.created_at}</td>
                  <td>
                    <div className="dropdown">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-circle btn-ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <BsThreeDotsVertical className="text-lg" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            rename
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              )
          )}

          {stacks.map(
            (stack) =>
              stack.parent_folder === parentFolderId && (
                <tr
                  key={stack.id}
                  className="hover cursor-pointer"
                  onClick={() => onClick("stack", stack.id)}
                >
                  <td className="text-lg">
                    <FaStackOverflow />
                  </td>
                  <td className="text-lg">{stack.name}</td>
                  <td className="text-lg w-full">{stack.created_at}</td>
                  <td>
                    <div className="dropdown">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-circle btn-ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <BsThreeDotsVertical className="text-lg" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            rename
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </>
  );
}

export default LibraryDisplay;
