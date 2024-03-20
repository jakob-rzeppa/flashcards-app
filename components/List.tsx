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
}

function List({ list }: Props) {
  // Order => most used, alphabeticly, date created, date last used
  return (
    <ul className="mt-2">
      {list.map((folder) => (
        <ListItem
          title={folder.title}
          href={folder.href}
          key={folder.title}
          descriptions={folder.descriptions}
        />
      ))}
    </ul>
  );
}

export default List;
