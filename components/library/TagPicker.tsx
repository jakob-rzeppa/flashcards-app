"use client";

import React, { useState } from "react";

interface Props {
  activeTags: string[];
  setActiveTags: React.Dispatch<React.SetStateAction<string[]>>;
}

function TagPicker({ activeTags, setActiveTags }: Props) {
  const suggestions = ["test", "atest2"].sort();

  const [inputValue, setInputValue] = useState("");

  const onRemove = (tagToRemove: string) => {
    const index = activeTags.indexOf(tagToRemove);

    const newTags = [...activeTags];
    if (index > -1) {
      // only splice array when item is found
      newTags.splice(index, 1);
    }
    setActiveTags(newTags);
  };

  const onRemoveLast = () => {
    if (inputValue !== "") return;
    const newTags = [...activeTags];
    newTags.pop();
    setActiveTags(newTags);
  };

  const onAdd = (tag: string) => {
    if (suggestions.includes(tag) && !activeTags.includes(tag)) {
      setActiveTags([...activeTags, tag]);
      setInputValue("");
      return;
    }
  };

  return (
    <div className="w-full dropdown text-base-content">
      <div
        className="w-full flex flex-row gap-2 items-center input"
        role="button"
      >
        {activeTags.map((tag, index) => (
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
        {suggestions.map(
          (suggestion, index) =>
            !activeTags.includes(suggestion) &&
            suggestion.startsWith(inputValue) && (
              <li key={index} className="">
                <button className="" onClick={() => onAdd(suggestion)}>
                  {suggestion}
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default TagPicker;
