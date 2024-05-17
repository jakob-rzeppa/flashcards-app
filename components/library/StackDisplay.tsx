"use client";

import React, { useState } from "react";
import TagPicker from "./TagPicker";
import { typeStack, typeStackTag } from "@/types";

interface Props {
  stacks: typeStack[];
  tags: string[];
}

function StackDisplay({ stacks, tags }: Props) {
  const possibleTags: string[] = [];
  tags.forEach((tag) => {
    if (!possibleTags.includes(tag)) {
      possibleTags.push(tag);
    }
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
        {stacks.map((stack, index) => (
          <a key={index} className="btn" href={`/library/stack?id=${stack.id}`}>
            {stack.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default StackDisplay;
