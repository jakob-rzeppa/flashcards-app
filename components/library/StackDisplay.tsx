"use client";

import React, { useState } from "react";
import TagPicker from "./TagPicker";
import { typeStack } from "@/types";

interface Props {
  stacks: typeStack[];
  tags: { stack_id: number; tag: string }[];
}

function StackDisplay({ stacks, tags }: Props) {
  const possibleTags: string[] = [];
  tags.forEach((tag) => {
    if (!possibleTags.includes(tag.tag)) {
      possibleTags.push(tag.tag);
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
      {stacks.map((stack, index) => (
        <div key={index}>{stack.name}</div>
      ))}
    </div>
  );
}

export default StackDisplay;
