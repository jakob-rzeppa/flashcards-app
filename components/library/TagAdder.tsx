"use client";

import { typeStack } from "@/types";
import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";

interface Props {
  data: typeStack;
  allTags: string[];
}

function TagAdder({ data, allTags }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [currentTags, setCurrentTags] = useState<string[]>([]);

  const onRemove = (tag: string) => {
    // TODO upload to supabase

    const index = currentTags.indexOf(tag);
    const newTags = [...currentTags];
    if (index > -1) {
      // only splice array when item is found
      newTags.splice(index, 1);
    }
    setCurrentTags(newTags);
  };

  const onRemoveLast = () => {
    // TODO upload to supabase

    if (inputValue !== "") return;
    const newTags = [...currentTags];
    newTags.pop();
    setCurrentTags(newTags);
  };

  const onAdd = (tag: string) => {
    // TODO upload to supabase

    setCurrentTags([...currentTags, tag]);
    setInputValue("");
  };

  return (
    <div className="w-full dropdown text-base-content">
      <div
        className="w-full flex flex-row gap-2 items-center input"
        role="button"
      >
        {currentTags.map((tag, index) => (
          <button
            className="rounded-md bg-base-200 p-1 hover:bg-base-300"
            onClick={() => onRemove(tag)}
            key={index}
          >
            {tag}
          </button>
        ))}
        <input
          placeholder="Input tags"
          autoCapitalize="false"
          autoComplete="false"
          autoCorrect="false"
          type="text"
          name="tagInput"
          className="flex-1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onAdd(inputValue);
            else if (e.key === "Backspace") onRemoveLast();
          }}
        />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-max min-w-64 flex-col justify-start gap-1 p-4"
      >
        {allTags.map(
          (tag, index) =>
            !currentTags.includes(tag) &&
            tag.startsWith(inputValue) && (
              <li key={index} className="">
                <button className="" onClick={() => onAdd(tag)}>
                  {tag}
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default TagAdder;
