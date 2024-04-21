"use client";

import { useState } from "react";
import Card from "./Card";
import getCardLevel from "@/actions/cards/client/getCardLevel";
import { updateCardLevel } from "@/actions/cards/client/updateCardLevel";

interface Props {
  cards: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string;
    stack_id: number;
    word: string;
  }[];
  onFinished: () => void;
}

function Content({ cards, onFinished }: Props) {
  if (cards.length === 0) {
    return <div>No Cards</div>;
  }

  let currentIndex = 0;

  // Store the learned cards
  const [rightCards, setRightCards] = useState<number[]>([]);

  const [currentWord, setCurrentWord] = useState(cards[currentIndex].word);
  const [currentDefinition, setCurrentDefinition] = useState(
    cards[currentIndex].definition
  );

  const changeCardLevel = async (
    dir: "left" | "right" | "bottom",
    index: number
  ) => {
    if (index >= cards.length) return;

    const cardLevel = await getCardLevel(cards[index].id);

    if (cardLevel === -1) {
      return;
    }

    switch (dir) {
      case "left":
        updateCardLevel(cards[index].id, 0);
        break;
      case "right":
        updateCardLevel(cards[index].id, cardLevel + 1);
        break;
      case "bottom":
        updateCardLevel(cards[index].id, cardLevel - 1);
    }
  };

  const onSwipe = (dir: "left" | "right" | "bottom") => {
    // Saves every learned card
    if (dir === "right" && !rightCards.includes(currentIndex)) {
      rightCards.push(currentIndex);
    }

    changeCardLevel(dir, currentIndex);

    currentIndex += 1;

    if (currentIndex >= cards.length) {
      // Checks if all cards learned, else starts from beginning
      if (rightCards.length >= cards.length) {
        console.log(rightCards.length, cards.length);
        onFinished();
        return;
      }

      currentIndex = 0;
    }

    // Skips every learned card
    while (rightCards.includes(currentIndex)) currentIndex++;

    try {
      setCurrentWord(cards[currentIndex].word);
      setCurrentDefinition(cards[currentIndex].definition);
    } catch {}
  };

  return (
    <div>
      <progress
        className="progress w-2/3 absolute top-4 left-1/2 -translate-x-1/2"
        value={rightCards.length}
        max={cards.length}
      ></progress>

      <Card
        word={currentWord}
        definition={currentDefinition}
        onSwipe={onSwipe}
      />
    </div>
  );
}

export default Content;
