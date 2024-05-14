"use client";

import React, { useState } from "react";

function TagPicker() {
  const suggestions = ["test", "atest2"].sort();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState("");

  const onRemove = (tagToRemove: string) => {
    const index = selectedTags.indexOf(tagToRemove);

    const newTags = [...selectedTags];
    if (index > -1) {
      // only splice array when item is found
      newTags.splice(index, 1);
    }
    setSelectedTags(newTags);
  };

  const onRemoveLast = () => {
    if (inputValue !== "") return;
    const newTags = [...selectedTags];
    newTags.pop();
    setSelectedTags(newTags);
  };

  const onAdd = (tag: string) => {
    if (suggestions.includes(tag) && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
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
        {selectedTags.map((tag, index) => (
          <button
            className="rounded-md bg-base-200 p-1 hover:bg-base-300"
            onClick={() => onRemove(tag)}
            key={index}
          >
            {tag}
          </button>
        ))}
        <input
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
            !selectedTags.includes(suggestion) &&
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
