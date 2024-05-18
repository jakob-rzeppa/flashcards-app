"use client";

import React, { useState } from "react";
import TagPicker from "./TagPicker";
import { typeStack } from "@/types";

interface Props {
  stacks: typeStack[];
  tags: Map<number, string[]>;
}

function StackDisplay({ stacks, tags }: Props) {
  const possibleTags: string[] = [];
  tags.forEach((value) => {
    value.forEach((e) => {
      possibleTags.push(e);
    });
  });

  const [activeTags, setActiveTags] = useState<string[]>([]);

  return (
    <div className="w-full">
      <TagPicker
        activeTags={activeTags}
        setActiveTags={setActiveTags}
        possibleTags={possibleTags}
      />
      <div className="grid grid-cols-3 gap-2">
        {stacks.map((stack, index) => {
          if (activeTags.length === 0) {
            return (
              <a
                key={index}
                className="btn"
                href={`/library/stack?id=${stack.id}`}
              >
                {stack.name}
              </a>
            );
          }

          const stackTags = tags.get(stack.id);
          if (!stackTags) {
            return;
          }

          if (stackTags.every((val) => activeTags.includes(val))) {
            return (
              <a
                key={index}
                className="btn"
                href={`/library/stack?id=${stack.id}`}
              >
                {stack.name}
              </a>
            );
          }
        })}
      </div>
    </div>
  );
}

export default StackDisplay;
