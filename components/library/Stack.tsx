"use client";

import { typeStack } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaStackOverflow } from "react-icons/fa";
import Row from "../ui/Row";

interface Props {
  stack: typeStack;
  onRename: () => void;
  onDelete: () => void;
  onMove: () => void;
  key?: any;
}

function Stack({ stack, onRename, onDelete, onMove, key }: Props) {
  const router = useRouter();

  return (
    <Row
      key={key}
      onClick={() => router.push("/library/stack?id=" + stack.id)}
      elements={[
        <FaStackOverflow />,
        <>{stack.name}</>,
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
    />
  );
}

export default Stack;
