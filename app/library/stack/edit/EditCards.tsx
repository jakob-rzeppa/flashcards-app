"use client";

import React, { useEffect, useState } from "react";

import updateCards from "@/actions/updateCards";

interface Props {
  cards: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string | null;
    stack_id: number;
    word: string;
  }[];
  masteryLevel: {
    card_id: number;
    level: number;
    user_id: string;
  }[];
  stackId: number;
}

function EditCards({ cards, masteryLevel, stackId }: Props) {
  const [rows, setRows] = useState<
    { id: number; word: string; definition: string }[]
  >(
    cards.map((card) => ({
      id: card.id,
      word: card.word,
      definition: card.definition,
    }))
  );

  useEffect(() => {
    return () => {
      updateCards(rows, stackId);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-3/5 mx-auto">
      {rows.map((row, index) => (
        <button
          className="btn w-full btn-neutral text-start items-center justify-start"
          key={index}
        >
          <h3 className="text-xl w-1/2">{row.word}</h3>
          <h4 className="text-xl">{row.definition}</h4>
        </button>
      ))}
    </div>
  );
}

export default EditCards;
