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
      if (!possibleTags.includes(e)) possibleTags.push(e);
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
      <div className="grid grid-cols-3 gap-2 p-4">
        {stacks.map((stack, index) => {
          if (activeTags.length === 0) {
            return (
              <a
                key={index}
                className="btn flex flex-col p-2 h-full"
                href={`/library/stack?id=${stack.id}`}
              >
                <div>{stack.name}</div>
                <div className="flex flex-wrap justify-center gap-1">
                  {tags.get(stack.id)?.map((tag) => (
                    <span className="badge badge-primary" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            );
          }

          const stackTags = tags.get(stack.id);
          if (!stackTags) {
            return null;
          }

          if (activeTags.every((tag) => stackTags.includes(tag))) {
            return (
              <a
                key={index}
                className="btn flex flex-col p-2 h-full"
                href={`/library/stack?id=${stack.id}`}
              >
                <div>{stack.name}</div>
                <div className="flex flex-wrap justify-center gap-1">
                  {tags.get(stack.id)?.map((tag) => (
                    <span className="badge badge-primary" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            );
          }
        })}
      </div>
    </div>
  );
}

export default StackDisplay;
