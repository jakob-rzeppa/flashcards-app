"use client";

import React, { useCallback, useState } from "react";

import BackgroundBox from "@/components/BackgroundBox";
import { ReactTags } from "react-tag-autocomplete";
import "./tagsStyles.css";

async function LibraryPage() {
  const suggestions: string[] = ["test", "test2"];

  const [selected, setSelected] = useState<string[]>([]);

  const onAdd = useCallback(
    (newTag: { label: string; value: string | number | symbol | null }) => {
      setSelected([...selected, newTag.label]);
    },
    [selected]
  );

  const onDelete = useCallback(
    (tagIndex: number) => {
      setSelected(selected.filter((_, i) => i !== tagIndex));
    },
    [selected]
  );

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <h2 className="text-3xl">Courses</h2>
      <BackgroundBox>
        <ReactTags
          labelText="Select tags"
          selected={selected.map((label, value) => {
            return { label, value };
          })}
          suggestions={suggestions.map((label, value) => {
            return { label, value };
          })}
          onAdd={onAdd}
          onDelete={onDelete}
          noOptionsText="No matching tags"
          collapseOnSelect={true}
        />
      </BackgroundBox>
    </div>
  );
}

export default LibraryPage;
