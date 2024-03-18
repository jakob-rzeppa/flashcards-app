import React from "react";

import { MdDelete } from "react-icons/md";

import Button from "@/components/Button";

interface Props {
  card: { word: string; definition: string };
}

function Card({ card }: Props) {
  return (
    <li className="flex flex-col py-3 px-2 rounded-md shadow-md relative">
      <span className="text-lg font-semibold">{card.word}</span>
      <span className="text-lg text-gray-700">{card.definition}</span>
      <Button
        onClick={() => {}}
        shape="round"
        classes="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <MdDelete />
      </Button>
    </li>
  );
}

export default Card;
