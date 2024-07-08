"use client";

import { typeFolder } from "@/types";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";
import Row from "../ui/Row";

interface Props {
  folder: typeFolder;
  onSelect: (folderId: number) => void;
  onRename: () => void;
  onDelete: () => void;
  onMove: () => void;
}

function Folder({ folder, onSelect, onRename, onDelete, onMove }: Props) {
  return (
    <Row
      elements={[
        <FaFolder />,
        <>{folder.name}</>,
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
        </div>,
      ]}
      onClick={() => onSelect(folder.id)}
    />
  );
}

export default Folder;
