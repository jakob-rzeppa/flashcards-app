"use client";

import React from "react";
import { typeStack } from "@/types";

interface Props {
  stacks: typeStack[];
}

function LibraryDisplay({ stacks }: Props) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2 p-4">
        {stacks.map((stack, index) => (
          <a
            key={index}
            className="btn flex flex-col p-2 h-full"
            href={`/library/stack?id=${stack.id}`}
          >
            <div>{stack.name}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default LibraryDisplay;
