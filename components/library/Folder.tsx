"use client";

import { typeFolder } from "@/types";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";

interface Props {
  folder: typeFolder;
  setParentFolderId: React.Dispatch<React.SetStateAction<number | null>>;
  onRename: () => void;
  onDelete: () => void;
  onMove: () => void;
}

function Folder({
  folder,
  setParentFolderId,
  onRename,
  onDelete,
  onMove,
}: Props) {
  return (
    <tr
      key={folder.id}
      className="hover cursor-pointer"
      onClick={() => setParentFolderId(folder.id)}
    >
      <td className="text-lg">
        <FaFolder />
      </td>
      <td className="text-lg">{folder.name}</td>
      <td className="text-lg">todo</td>
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
                  onMove();
                }}
              >
                Move
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRename();
                }}
              >
                Rename
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}

export default Folder;
