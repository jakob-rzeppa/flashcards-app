"use client";

import React from "react";

import Button from "./Button";
import ListItem from "./ListItem";

interface Props {
  list: {
    title: string;
    href: string;
    descriptions: { [description: string]: number };
  }[];
  title: string;
}

function List({ list, title }: Props) {
  // Order => most used, alphabeticly, date created, date last used
  return (
    <div className="w-full max-w-xl bg-white p-8 rounded shadow-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <Button onClick={() => {}}>Create New Folder</Button>
      <ul className="mt-2">
        {list.map((folder) => (
          <ListItem
            title={folder.title}
            href={folder.href}
            descriptions={folder.descriptions}
          />
        ))}
      </ul>
    </div>
  );
}

export default List;
