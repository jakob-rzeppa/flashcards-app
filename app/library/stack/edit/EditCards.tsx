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
    <div>
      <ul>
        {rows.map((row, index) => (
          <li key={row.id}>
            <input
              type="text"
              name="word"
              placeholder="word"
              value={rows[index].word}
              onChange={(e) => {
                const newRows = rows.map((row) => row);
                newRows[index].word = e.target.value;
                setRows(newRows);
              }}
            />
            <input
              type="text"
              name="definition"
              placeholder="definition"
              value={rows[index].definition}
              onChange={(e) => {
                const newRows = rows.map((row) => row);
                newRows[index].definition = e.target.value;
                setRows(newRows);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditCards;
