"use client";

import { useState } from "react";
import Card from "./Card";

interface Props {
  cards: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string;
    stack_id: number;
    word: string;
  }[];
}

function Content({ cards }: Props) {
  let currentIndex = 0;

  // Store the learned cards
  const right: number[] = [];

  const [currentWord, setCurrentWord] = useState(cards[currentIndex].word);
  const [currentDefinition, setCurrentDefinition] = useState(
    cards[currentIndex].definition
  );

  const onSwipe = (dir: "left" | "right" | "bottom") => {
    // Saves every learned card
    if (dir === "right" && !right.includes(currentIndex)) {
      right.push(currentIndex);
    }

    currentIndex++;

    // Checks if all cards learned, else starts from beginning
    if (currentIndex >= cards.length) {
      if (right.length === cards.length) {
        console.log("done");
        setCurrentWord("done");
        setCurrentDefinition("done");
        // TODO
        return;
      }

      currentIndex = 0;
    }

    // Skips every learned card
    while (right.includes(currentIndex)) currentIndex++;

    setCurrentWord(cards[currentIndex].word);
    setCurrentDefinition(cards[currentIndex].definition);
  };

  return (
    <div>
      <Card
        word={currentWord}
        definition={currentDefinition}
        onSwipe={onSwipe}
      />
    </div>
  );
}

export default Content;
