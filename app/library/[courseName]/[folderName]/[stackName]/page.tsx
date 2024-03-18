"use client";

import { useState } from "react";

import BackgroundBox from "@/components/BackgroundBox";
import List from "@/components/List";

interface Props {
  params: { stackName: string };
}

function Folder({ params }: Props) {
  // TODO options like delete Stack, ...
  const [cards, setCards] = useState([
    {
      word: "test",
      definition: "Test",
      wordLang: "English",
      definitionLang: "German",
    },
  ]);

  // TODO edit / learn

  return (
    <BackgroundBox>
      <h1 className="text-2xl font-bold mb-4">{params.stackName}</h1>
      <ul className="mt-2">
        {cards.map((card) => (
          <li className="flex flex-col py-3 px-2 rounded-md shadow-md">
            <span className="text-lg font-semibold">{card.word}</span>
            <span className="text-lg text-gray-700">{card.definition}</span>
          </li>
        ))}
      </ul>
    </BackgroundBox>
  );
}

export default Folder;
