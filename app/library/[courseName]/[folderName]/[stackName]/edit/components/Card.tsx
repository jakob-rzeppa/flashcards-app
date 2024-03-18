import React from "react";

import { MdDelete } from "react-icons/md";

import Button from "@/components/Button";

interface Props {
  card: { word: string; definition: string };
}

function Card({ card }: Props) {
  return (
    <li className="flex flex-row py-3 px-4 rounded-md shadow-md justify-between items-center gap-4">
      <div className="flex flex-col w-full">
        <input
          type="text"
          defaultValue={card.word}
          className="text-lg font-semibold p-1 outline-none focus:bg-gray-200 rounded-md"
        />
        <input
          type="text"
          defaultValue={card.definition}
          className="text-lg text-gray-700 p-1 outline-none focus:bg-gray-200 rounded-md"
        />
      </div>
      <Button onClick={() => {}} shape="round" classes="">
        <MdDelete />
      </Button>
    </li>
  );
}

export default Card;
