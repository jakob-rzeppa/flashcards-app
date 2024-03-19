"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";

import BackgroundBox from "@/components/BackgroundBox";

interface Props {
  params: { stackName: string };
}

function Folder({ params }: Props) {
  const pathname = usePathname();
  // TODO options like delete Stack, ...
  const [cards, setCards] = useState([
    {
      word: "test",
      definition: "Test",
    },
  ]);

  return (
    <BackgroundBox>
      <h1 className="text-2xl font-bold mb-4">{params.stackName}</h1>
      <div className="flex flex-col items-center justify-center w-full">
        <Link
          href={pathname + "/learn"}
          className="bg-blue-500 w-full text-white px-4 py-2 rounded-md mb-2"
        >
          Learn
        </Link>
        <Link
          href={pathname + "/edit"}
          className="bg-green-500 w-full text-white px-4 py-2 rounded-md"
        >
          Edit
        </Link>
      </div>
      <h2 className="text-xl font-semibold mt-2">Words:</h2>
      <ul className="mt-2">
        {cards.map((card) => (
          <li className="flex flex-col py-3 px-2 rounded-md shadow-md">
            <span className="text-2xl font-semibold">{card.word}</span>
            <span className="text-lg">{card.definition}</span>
          </li>
        ))}
      </ul>
    </BackgroundBox>
  );
}

export default Folder;
